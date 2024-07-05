import {LightCustomColorConfig} from "./LightCustomColorConfig.ts";
import {LightSceneConfig} from "./LightSceneConfig.ts";

export interface QuickAction {
    id: number,
    name: string,
    lightsCustomColorConfig: LightCustomColorConfig[],
    lightsSceneConfig: LightSceneConfig[]
}