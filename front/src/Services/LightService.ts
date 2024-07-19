import axios from "axios";
import {Light} from "../Models/Light.ts";
import {NewLights} from "../Models/DTOs/NewLights.ts";
import {ModifyLight} from "../Models/DTOs/ModifyLight.ts";

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

    public edit(light: ModifyLight) : Promise<string> {
        return axios({
            method: 'PUT',
            url: `${this.API_URL}lights/modify`,
            data: light
        }).then((success) => success.data).catch((err) => {
            console.log(err);
            throw err;
        });
    }


    public delete(mac: string) : Promise<string> {
        return axios({
            method: 'DELETE',
            url: `${this.API_URL}lights/delete/${mac}`,
        }).then((success) => success.data).catch((err) => {
            console.log(err);
            throw err;
        });
    }

    public ping(ip: string): Promise<void> {
        return axios({
            method: 'GET',
            url: `${this.API_URL}lights/ping/${ip}`,
        }).then((_) => {} ).catch((err) => {
            console.log(err);
            throw err;
        });
    }
}