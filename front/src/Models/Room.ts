import {LightBasicInfoWithStatus} from "./LightBasicInfoWithStatus.ts";

export interface Room{
    name: string,
    id: number,
    lights: LightBasicInfoWithStatus[]
}