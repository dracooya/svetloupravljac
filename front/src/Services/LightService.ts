import {House} from "../Models/House.ts";
import axios from "axios";
import {Light} from "../Models/Light.ts";
import {NewLights} from "../Models/DTOs/NewLights.ts";

export class LightService {
    private API_URL = import.meta.env.VITE_API_URL;

    public discover() : Promise<Light[]> {
        return axios({
            method: 'GET',
            url: `${this.API_URL}lights/discover`,
        }).then((chart) => chart.data).catch((err) => {
            console.log(err);
            throw err;
        });
    }

    public add(lights: NewLights) : Promise<string> {
        return axios({
            method: 'POST',
            url: `${this.API_URL}lights/add`,
            data: lights
        }).then((chart) => chart.data).catch((err) => {
            console.log(err);
            throw err;
        });
    }
}