
import { Sln } from "./workspace/sln";
import { WorkSpace } from "./workspace/workspace";
export function renderLayout(vm) {
    var sln = new Sln(vm.$refs.tree as HTMLElement);
    WorkSpace.workspace.loadWorkSpace().then(data => {
        if (data) {
            sln.load(data.content);
        }
    })
}