import {ModeCategory} from "./Enums/ModeCategory.ts";

export interface AvailableMode {
    id: number,
    name : string,
    speedChange: boolean,
    brightnessChange: boolean,
    category: ModeCategory
}