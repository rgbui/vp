import Axios from "axios";
import { logger } from "../../logger";
import { Events } from "../../util/events";
import { remote } from "../../util/remote";
const LOCAL_USER_KEY = 'user_info';
class User extends Events {
    private user: {
        id: string,
        name: string,
        face: string,
        vip: string,
        vip_due: number,
        settings?: {
            workspace_id?: string,
            page_id?: string,
            theme?: string,
            mode?: 'dark' | 'light'
        }
    }
    get userInfo(): User['user'] {
        if (this.user) return Object.assign({}, this.user)
        else return undefined;
    }
    tryLogin() {
        return new Promise((resolve: (user: User['user']) => void, reject) => {
            var data = window.localStorage.getItem(LOCAL_USER_KEY);
            if (!data) return resolve(this.userInfo);
            remote.post('/get/user/loginfo').then(res => {
                if (res && res.success == true) {
                    if (res.session == true) {
                        //从当前的缓存取
                        this.user = JSON.parse(window.localStorage.getItem(LOCAL_USER_KEY)).user;
                    }
                    else if (res.user) {
                        this.user = res.user;
                        window.localStorage.setItem(LOCAL_USER_KEY, JSON.stringify({ date: new Date().getTime(), user: this.user }));
                    }
                    resolve(this.userInfo);
                }
                else resolve(undefined);
            }).catch(err => {
                logger.error(err, '/get/user/loginfo')
                resolve(undefined);
            });
        })
    }
    saveCache(user: Partial<User['user']>) {
        if (typeof this.user == 'undefined') this.user = {} as any;
        for (var n in user) {
            if (typeof user[n] == 'undefined') continue;
            if (n == 'settings') {
                if (typeof this.user.settings == 'undefined') this.user.settings = {} as any;
                Object.assign(this.user.settings, user.settings || {});
            }
            else this.user[n] = user[n]
        }
        window.localStorage.setItem(LOCAL_USER_KEY, JSON.stringify({ user: this.user, date: new Date().getTime() }))
    }
}
export var user = new User();