
import { logger } from "../logger";
import { util } from "../util/util";
import { Contextmenu } from "./components/present/contextmenu.single";
import { WorkSpace } from "./workspace/workspace";
export function renderLayout(vm) {
    vm.tree.noChildsTip = '没有页面';
    vm.tree.getItemOperators = function (item) {
        return [
            {
                icon: "ellipsis-h:font",
                name: "poperty",
                tip: "操作",
            },
            {
                icon: "plus:font",
                name: "plus",
                tip: "快速添加子页面",
            }
        ];
    };
    vm.tree.$on('operatorClick', function (data) {
        console.log(data);
        switch (data.operator.name) {
            case 'property':
                vm.tree.$emit('contextmenu', { ...data });
                break;
            case 'plus':
                vm.tree.create({ id: util.guid(), text: "新页面" }, data.item, 'append');
                break;
        }
    });
    vm.tree.$on('contextmenu', function (data) {
        Contextmenu.contextmenu.open([
            { text: "添加子页面", name: 'addSubPage' },
            { text: "添加页面", name: 'addPage' },
            { type: 'devide' },
            { text: "复制引用链接", name: 'copy-link' },
            { text: "复制引用目录", name: 'copy-note' },
            { text: "复制引用模板", name: 'copy-template' },
            { type: 'devide' },
            { text: "复制", name: 'copy' },
            { text: "重命名", name: 'rename' },
            { type: 'devide' },
            { text: "删除", name: 'delete' },
        ], { x: data.event.pageX, y: data.event.pageY });
        Contextmenu.contextmenu.once('mousedown', function (item, event) {
            switch (item.name) {
                case 'addSubPage':
                    vm.tree.create({ id: util.guid(), text: "新页面" }, data.item, 'append');
                    break;
                case 'addPage':
                    vm.tree.create({ id: util.guid(), text: "新页面" }, data.item, 'next');
                    break;
                case 'rename':
                    vm.tree.onEdit(data.item);
                    break;
                case 'delete':
                    vm.tree.remove(data.item.id);
                    break;
                case 'copy-link':
                    break;
                case 'copy-note':
                    break;
                case 'copy-template':
                    break;
            }
        });
    });
    vm.tree.$on('click', function (data) {

    });
    vm.tree.$on('history', function (history) {
        console.log(history);
        WorkSpace.workspace.save(vm.tree.get());
    });
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
        logger.error(err);
        //网络有问题
        vm.$router.push({ name: "500" })
    });
}