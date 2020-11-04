
export var util = {
    inherit(Mix, ...mixins) {
        function copyProperties(target, source) {
            for (let key of Reflect.ownKeys(source)) {
                if (key !== "constructor"
                    && key !== "prototype"
                    && key !== "name"
                ) {
                    let desc = Object.getOwnPropertyDescriptor(source, key);
                    Object.defineProperty(target, key, desc);
                }
            }
        }
        for (let mixin of mixins) {
            copyProperties(Mix, mixin);
            copyProperties(Mix.prototype, mixin.prototype);
        }
        return Mix;
    }
}