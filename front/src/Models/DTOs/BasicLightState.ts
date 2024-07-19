import {Command} from "./Command.ts";

export interface BasicLightState extends Command{
    isOn: boolean,
}