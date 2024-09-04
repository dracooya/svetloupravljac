import {Light} from "./Light.ts";
import {Scene} from "./Scene.ts";

export interface Room{
    name: string,
    id: number,
    lights: Light[],
    scenes: Scene[]
}