import Axios from "axios";
import { Events } from "./util/events";

const INNER_GETUSER = '__inner_get_user_info';
const LOCAL_USER_KEY = 'user_info';
class User extends Events {
    private user: {
        id: string,
        name: string,
        face: string,
        vip: string,
        vip_due: number
    }
    private isTryLogined: boolean = false;
    get userInfo() {
        if (this.user) return Object.assign({}, this.user)
        else return undefined;
    }
    tryLogin(callback?) {
        var data = window.localStorage.getItem(LOCAL_USER_KEY);
        if (data) {
            var dj = JSON.parse(data);
            this.user = dj.user;
            if ((new Date().getTime() - dj.date) < 1000 * 60 * 60 * 2) {
                this.emit('getUserInfo', this.userInfo);
                this.emit(INNER_GETUSER, this.userInfo);
                this.off(INNER_GETUSER);
                if (typeof callback == 'function') callback(this.user);
                return;
            }
        }
        Axios.post('/get/user/loginfo').then(res => {
            this.isTryLogined = true;
            if (res && res.data && res.data.success == true) {
                if (res.data.session == true) {
                    //从当前的缓存取
                    this.user = JSON.parse(window.localStorage.getItem(LOCAL_USER_KEY)).user;
                    this.emit('getUserInfo', this.userInfo);
                    this.emit(INNER_GETUSER, this.userInfo);
                    this.off(INNER_GETUSER);
                }
                else if (res.data.user) {
                    this.user = res.data.user;
                    window.localStorage.setItem(LOCAL_USER_KEY, JSON.stringify({ date: new Date().getTime(), user: this.user }));
                    this.emit('getUserInfo', this.userInfo);
                    this.emit(INNER_GETUSER, this.userInfo);
                    this.off(INNER_GETUSER);
                }
            }
            else {
                this.emit('nologin');
                this.emit(INNER_GETUSER, this.userInfo);
                this.off(INNER_GETUSER);
            }
            if (typeof callback == 'function')
                callback(this.userInfo)
        }).catch(err => {
            this.isTryLogined = true;
            this.emit('nologin');
            this.emit(INNER_GETUSER, this.userInfo);
            this.off(INNER_GETUSER);
            if (typeof callback == 'function')
                callback(this.userInfo)
        });
    }
    getUserInfo(callback: (user?: User['user']) => void) {
        if (this.isTryLogined == true) callback(this.userInfo)
        else {
            this.on(INNER_GETUSER, callback);
        }
    }
    saveCache(userinfo) {
        this.user = userinfo;
        window.localStorage.setItem(LOCAL_USER_KEY, JSON.stringify({ date: new Date().getTime(), user: userinfo }));
    }
}
export var user = new User();