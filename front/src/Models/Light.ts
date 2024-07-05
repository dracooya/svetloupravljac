import {LightType} from "./Enums/LightType.ts";

export interface Light {
    id: number,
    ip: string,
    name: string,
    type: LightType,
    brightnessChange: boolean,
    colorChange: boolean,
    temperatures: boolean,
    minKelvin: number,
    maxKelvin: number
}