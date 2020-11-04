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
        Axios.post('/get/user/loginfo').then(res => {
            this.isTryLogined = true;
            if (res && res.data && res.data.success == true) {
                if (res.data.session == true) {
                    //从当前的缓存取
                    this.user = JSON.parse(window.localStorage.getItem(LOCAL_USER_KEY));
                    this.emit('getUserInfo', this.userInfo);
                    this.emit(INNER_GETUSER, this.userInfo);
                    this.off(INNER_GETUSER);
                }
                else if (res.data.user) {
                    this.user = res.data.user;
                    window.localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(this.user));
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
}
export var user = new User();