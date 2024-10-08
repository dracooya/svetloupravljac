import {LightType} from "./Enums/LightType.ts";

export interface Light {
    mac: string,
    ip: string,
    name: string,
    type: LightType,
    brightnessChange: boolean,
    colorChange: boolean,
    temperatureChange: boolean,
    minKelvin: number,
    maxKelvin: number
}