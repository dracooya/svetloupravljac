import {Command} from "./Command.ts";
import {Light} from "../Light.ts";

export interface LightState {
    light: Light,
    isOn: boolean,
    state: Command
}