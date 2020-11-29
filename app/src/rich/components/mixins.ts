import { Block } from "../block/block";
export var mixins = {
    inject: ['view'],
    created() {
        var block = this.block;
        if (block) block.vm = this;
    },
    mounted() {
        this.$el["ref"] = this;
    },
    props: {
        rf: { type: Object }
    },
    computed: {
        block() {
            if (this.rf && this.rf.block instanceof Block) return this.rf.block;
        }
    },
}