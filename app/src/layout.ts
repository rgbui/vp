
import { util } from "../util/util";
import { WorkSpace } from "./workspace/workspace";
export function renderLayout(vm) {
    WorkSpace.workspace.load().then(data => {
        //如果有值，则载入，如果没有，说明用户没有创建workspace,那么跳转至创建
        if (data) {
            vm.workspaceBar.load(data.workspace);
            vm.tree.load(data.content && Array.isArray(data.content.pages) ? data.content.pages : [{ id: util.guid(), text: "新页面" }]);
        }
        else {
            vm.$router.push({ name: 'createWorkspace' })
        }
    }).catch(err => {
        //网络有问题
        vm.$router.push({ name: "500" })
    })
}