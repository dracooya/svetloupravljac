import {LightType} from "./Enums/LightType.ts";

export interface LightBasicInfo {
    id: number,
    ip: string,
    name: string,
    type: LightType,
}