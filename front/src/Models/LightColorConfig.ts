import {ColorOrModeParams} from "./ColorOrModeParams.ts";
import {LightBasicInfo} from "./LightBasicInfo.ts";
import {Light} from "./Light.ts";

export interface LightColorConfig {
    light : Light,
    config: ColorOrModeParams
}