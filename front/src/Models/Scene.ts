import {ColorOrModeParams} from "./ColorOrModeParams.ts";
import {LightColorConfig} from "./LightColorConfig.ts";

export interface Scene{
    id: number,
    name: string,
    lightsConfig: LightColorConfig[]
}