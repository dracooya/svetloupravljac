import {SceneType} from "./Enums/SceneType.ts";

export interface Scene {
    id: number,
    name: string,
    speed: number,
    dimming: number,
    type: SceneType
}