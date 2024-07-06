import {LightCustomColorConfig} from "./LightCustomColorConfig.ts";
import {LightModeConfig} from "./LightModeConfig.ts";

export interface Scene {
    id: number,
    name: string,
    lightsCustomColorConfig: LightCustomColorConfig[],
    lightsSceneConfig: LightModeConfig[]
}