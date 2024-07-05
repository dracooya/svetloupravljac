import {LightBasicInfo} from "./LightBasicInfo.ts";

export interface LightCustomColorConfig {
    light: LightBasicInfo,
    r: number,
    g: number,
    b: number,
    c: number,
    w: number,
    dimming: number,
    temperature: number
}