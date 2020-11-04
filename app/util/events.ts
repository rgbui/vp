export type F = (...args: any[]) => any;
export class Events {
    private __events: { name: string, fn?: F }[] = [];
    on(name: string | Record<string, F>, fn?: F) {
        if (typeof name == 'string' && typeof fn == 'function')
            this.__events.push({ name, fn });
        else if (typeof name == 'object')
            for (var n in name) this.on(n, name[n]);
        return this;
    }
    /***
     * 
     * 这个并不是一次执行完后，删除事件，
     * 这个表示绑定的事件name会替换同名的name，确保绑定的事件的唯一性
     * 不用传统的once执行一次就删除事件，
     * 原因如下
     * 1.绑定的事件内部有异步事件，那么在执行后，删除事件，会导致里面的异步不执行，这很蛋疼
     * 2.绑定的事件不一定会触发（就是被消耗掉），这意味着如果多次绑定同名事件，会导致多次触发
     * 
     */
    once(name: string | Record<string, F>, fn?: F) {
        if (typeof name == 'object') { for (var n in name) this.once(n, name[n]) }
        else {
            this.__events.removeAll(x => x.name == name);
            this.__events.push({ name, fn });
        }
        return this;
    }
    off(name: string | F, fn?: F) {
        if (typeof name == 'function') this.__events.removeAll(x => x.fn == name);
        else if (typeof fn == 'function' && typeof name == 'string') this.__events.removeAll(x => x.name == name && x.fn == fn);
    }
    emit(name: string, ...args: any[]) {
        var rs = this.__events.findAll(x => x.name == name);
        if (rs.length == 0) return undefined;
        var gs = rs.toArray(r => {
            if(typeof r.fn=='function')
            return r.fn.apply(this, args);
            else return undefined;
        });
        if (gs.length == 1) return gs[0]
        else return gs;
    }
    in(name: string | F): boolean {
        if (typeof name == 'string') return this.__events.exists(x => x.name == name);
        else if (typeof name == 'function') return this.__events.exists(x => x.fn == name);
        else return false;
    }
    private __data: Record<string, any>={};
    /****
     * 
     * 如果value为null，表示清理key
     */
    store(key: string | Record<string, any>, value?: any) {
        if (typeof key == 'string' && value === null) delete this.__data[key];
        else if (typeof key == 'string' && typeof value != 'undefined') this.__data[key] = value;
        else if (typeof key == 'string' && typeof value == 'undefined') return this.__data[key];
        else if (typeof key == 'object') for (var n in key) this.store(n, key[n]);
    }
}