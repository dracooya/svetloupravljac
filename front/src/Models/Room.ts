import {Light} from "./Light.ts";

export interface Room{
    name: string,
    id: number,
    lights: Light[]
}