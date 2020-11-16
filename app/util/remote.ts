import Axios, { AxiosInstance } from "axios";
const TOKEN = '__token';
class Remote {
    axios: AxiosInstance
    constructor() {
        this.axios = Axios.create({
            baseURL: HOST
        })
    }
    get(url: string) {
        return new Promise((resolve: (data: Record<string, any>) => void, reject: (err: Error) => void) => {
            this.axios.get(url, {
                headers: {
                    'token': this.token||undefined
                }
            }).then(r => {
                resolve(r.data);
            }).catch(err => {
                reject(err);
            })
        })
    }
    post(url: string, data?: Record<string, any>) {
        return new Promise((resolve: (data: Record<string, any>) => void, reject: (err: Error) => void) => {
            this.axios.post(url, data || {}, {
                headers: {
                    'token': this.token||undefined
                }
            }).then(r => {
                resolve(r.data);
            }).catch(err => {
                reject(err);
            })
        })
    }
    get token() {
        return window.localStorage.getItem(TOKEN);
    }
    set token(value) {
        window.localStorage.setItem(TOKEN, value)
    }
}
export var remote = new Remote();