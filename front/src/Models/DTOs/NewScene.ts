import {LightColorConfigBasic} from "./LightColorConfigBasic.ts";

export interface NewScene {
    name: string,
    roomId: number,
    config: LightColorConfigBasic[]
}