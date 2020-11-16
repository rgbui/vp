
import { logger } from "../../logger";
import { user } from "../../user";
import { Events } from "../../util/events";
import { remote } from "../../util/remote";

const WORK_SPACE_NAME = 'works';
export class WorkSpace extends Events {
    load() {
        return new Promise((resolve: (data: Record<string, any>) => void, reject) => {
            var data = window.localStorage.getItem(WORK_SPACE_NAME) as any;
            if (typeof data == 'string') data = JSON.stringify(data);
            var where: Record<string, any> = {};
            if (data) {
                where = {
                    workspace_id: data.id,
                    snapshoot_id: data.snapshoot_id
                };
            }
            else {
                if (user.userInfo && user.userInfo.settings)
                    where = {
                        workspace_id: user.userInfo.settings.workspace_id
                    }
            }
            if (where.workspace_id) {
                console.log(JSON.stringify(where), 'where');
                remote.post('/get/workspace', where).then(r => {
                    console.log('getworks', JSON.stringify(r));
                    if (r.success == true) {
                        if (r.local_usable == true) {
                            resolve({ content: data, workspace: r.workspace });
                        }
                        else {
                            resolve({ content: r.content ? JSON.parse(r.content) : undefined, workspace: r.workspace })
                        }
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
    private static _workSpace: WorkSpace;
    static get workspace() {
        if (!this._workSpace) this._workSpace = new WorkSpace();
        return this._workSpace;
    }
}


