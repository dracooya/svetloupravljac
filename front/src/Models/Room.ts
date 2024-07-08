import {LightBasicInfoWithStatus} from "./LightBasicInfoWithStatus.ts";
import {ItemToDelete} from "./ItemToDelete.ts";

export interface Room extends ItemToDelete{
    name: string,
    value: number,
    lights: LightBasicInfoWithStatus[]
}