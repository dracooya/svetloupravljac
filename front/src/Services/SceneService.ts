import {House} from "../Models/House.ts";
import axios from "axios";
import {Scene} from "../Models/Scene.ts";
import {NewScene} from "../Models/DTOs/NewScene.ts";

export class SceneService {
    private API_URL = import.meta.env.VITE_API_URL;

    public getAll() : Promise<Scene[]> {
        return axios({
            method: 'GET',
            url: `${this.API_URL}scenes/all`,
        }).then((chart) => chart.data).catch((err) => {
            console.log(err);
            throw err;
        });
    }

    public add(scene: NewScene) : Promise<string> {
        return axios({
            method: 'POST',
            url: `${this.API_URL}scenes/add`,
            data: scene
        }).then((success) => success.data).catch((err) => {
            console.log(err);
            throw err;
        });
    }
}