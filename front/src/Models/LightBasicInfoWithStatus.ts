import {LightType} from "./Enums/LightType.ts";

export interface LightBasicInfoWithStatus {
    id: number,
    ip: string,
    name: string,
    type: LightType,
    isOn: boolean
}