import {LightBasicInfoWithStatus} from "./LightBasicInfoWithStatus.ts";

export interface Room{
    name: string,
    value: number,
    lights: LightBasicInfoWithStatus[]
}