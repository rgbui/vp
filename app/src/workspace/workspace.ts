

import { logger } from "../../logger";
import { user } from "../../user";
import { Events } from "../../util/events";
import { remote } from "../../util/remote";
import { util } from "../../util/util";

const WORK_SPACE_NAME = 'works';
const WORK_SPACE_SNAPSHOOT_ID = 'snapshoot_id';

export class WorkSpace extends Events {
    id: string = '';
    get snapshoot_id() {
        return window.localStorage.getItem(WORK_SPACE_SNAPSHOOT_ID) as string;
    }
    set snapshoot_id(value: string) {
        window.localStorage.setItem(WORK_SPACE_SNAPSHOOT_ID, value);
    }
    load() {
        return new Promise((resolve: (data: Record<string, any>) => void, reject) => {
            var data = window.localStorage.getItem(WORK_SPACE_NAME) as any;
            if (typeof data == 'string') data = JSON.stringify(data);
            var where: Record<string, any> = {};
            if (user.userInfo && user.userInfo.settings)
                where = {
                    workspace_id: user.userInfo.settings.workspace_id,
                    snapshoot_id: this.snapshoot_id
                }
            if (where.workspace_id) {
                if (data && data.id != where.workspace_id) delete where.snapshoot_id;
                remote.post('/get/workspace', where).then(r => {
                    if (r.success == true) {
                        this.id = r.workspace.id;
                        // if (r.local_usable == true) {
                        resolve({ content: data, workspace: r.workspace });
                        // }
                        // else {
                        //     resolve({ content: r.content ? JSON.parse(r.content) : undefined, workspace: r.workspace })
                        // }
                    }
                    else {
                        logger.error('not found workspace', '/get/workspace');
                        resolve(undefined);
                    }
                }).catch(err => {
                    logger.error(err, '/get/workspace')
                    resolve(undefined);
                })
            }
            else {
                resolve(undefined);
            }
        })
    }
    save(content) {
        window.localStorage.setItem(WORK_SPACE_NAME, JSON.stringify({
            id: this.id,
            pages: content
        }));
    }
    private historyList: Record<string, any>[] = [];
    saveChanges(history) {
        history.userid = user.userInfo.id;
        history.created_date = new Date().getTime();
        this.historyList.push(history);
    }
    saveToServer(snapshoot_id: string) {
        return new Promise((resolve, reject) => {
            remote.post('/workspace/save/content',
                {
                    snapshoot_id,
                    workspace_id: this.id,
                    content: window.localStorage.getItem(WORK_SPACE_NAME)
                }).then(r => {
                    resolve(r);
                }).catch(err => {
                    reject(err);
                })
        })
    }
    private static _workSpace: WorkSpace;
    static get workspace() {
        if (!this._workSpace) this._workSpace = new WorkSpace();
        return this._workSpace;
    }
}


