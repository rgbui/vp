
import { Sln } from "./solution/sln";
export function renderLayout(vm) {
    var sln = new Sln(vm.refs.tree as HTMLElement);
}