import {LightType} from "../Enums/LightType.ts";

export interface NewLight {
    ip: string,
    mac: string,
    name: string,
    roomId: number,
    type: LightType,
    brightnessChange: boolean,
    colorChange: boolean,
    temperatureChange: boolean,
    minKelvin: number,
    maxKelvin: number,
}