import {LightType} from "./Enums/LightType.ts";
import {ItemToDelete} from "./ItemToDelete.ts";

export interface LightBasicInfoWithStatus extends ItemToDelete{
    id: number,
    ip: string,
    name: string,
    type: LightType,
    isOn: boolean
}