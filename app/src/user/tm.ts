
import TIM from 'tim-js-sdk';

let options = {
    SDKAppID: 1400449778 // 接入时需要将0替换为您的云通信应用的 SDKAppID
};
export var tim = TIM.create(options); // SDK 实例通常用 tim 表示