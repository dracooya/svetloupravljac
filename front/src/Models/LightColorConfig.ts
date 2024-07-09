import {ColorOrModeParams} from "./ColorOrModeParams.ts";
import {LightBasicInfo} from "./LightBasicInfo.ts";

export interface LightColorConfig {
    light : LightBasicInfo,
    config: ColorOrModeParams
}