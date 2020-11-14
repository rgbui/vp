import Axios from "axios";
import { Events } from "../../util/events";
import { workspaceDialoug } from "./dialoug.workspace";

const WORK_SPACE_NAME = 'works';
export class WorkSpace extends Events {
    loadWorkSpace() {
        return new Promise((resolve: (data: { content: Record<string, any> }) => void, reject) => {
            var data = window.localStorage.getItem(WORK_SPACE_NAME) as any;
            if (typeof data == 'string') data = JSON.stringify(data);
            var where: Record<string, any> = {};
            if (data) {
                where = {
                    workspaceId: data.workspaceId,
                    versionId: data.versionId,
                    versionIds: data.versionIds
                };
            }
            Axios.post('/get/user/workspace', where).then(r => {
                if (r.data.success == true) {
                    if (r.data.local == true) {
                        resolve(data);
                    }
                    else if (r.data.content) {
                        resolve(r.data.content);
                    }
                    else resolve(undefined);
                }
            }).catch(err => {
                reject(err);
            })
        })
    }
    openCreateWorkSpace() {
        return new Promise((resolve, reject) => {
            workspaceDialoug().then(dialoug => {
                dialoug.open();
                dialoug.$once('create', function (name) {
                    Axios.post('/create/user/workspace', { name }).then(r => {
                        if (r.data.success == true) {
                            resolve(r.data.content);
                        }
                        else reject('create workspace fail');
                    }).catch(err => {
                        reject(err);
                    })
                })
            })
        })
    }
    private static _workSpace: WorkSpace;
    static get workspace() {
        if (!this._workSpace) this._workSpace = new WorkSpace();
        return this._workSpace;
    }
}


