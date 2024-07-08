import {LightCustomColorConfig} from "./LightCustomColorConfig.ts";
import {LightModeConfig} from "./LightModeConfig.ts";
import {ItemToDelete} from "./ItemToDelete.ts";

export interface Scene extends ItemToDelete{
    id: number,
    name: string,
    lightsCustomColorConfig: LightCustomColorConfig[],
    lightsSceneConfig: LightModeConfig[]
}