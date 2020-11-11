
import Vue from "vue";
import Button from "./form/button.vue";
import ButtonGroup from "./form/button.group.vue";
import VpPanel from "./layout/panel.vue";
import VpRow from "./layout/row.vue";
import VpCol from "./layout/col.vue";
import VpBox from "./layout/box.vue";
import VpDevide from "./layout/devide.vue";
import Icon from "./layout/icon.vue";
import VpText from "./layout/text.vue";
import VpTip from "./layout/tip.vue";
import VpInput from "./form/input.vue";
import VpNumber from "./form/number.vue";
import VpSwitch from "./form/switch.vue";
import VpTags from "./form/tags.vue";

Vue.component('VpButton', Button);
Vue.component('VpPanel', VpPanel);
Vue.component('VpButtonGroup', ButtonGroup);
Vue.component('VpRow', VpRow);
Vue.component('VpText', VpText);
Vue.component('VpCol', VpCol);
Vue.component('VpBox', VpBox);
Vue.component('VpDevide', VpDevide);
Vue.component('VpIcon', Icon);

Vue.component('VpTip', VpTip);
Vue.component('VpInput', VpInput);
Vue.component('VpNumber', VpNumber);
Vue.component('VpSwitch', VpSwitch);
Vue.component('VpTags', VpTags);