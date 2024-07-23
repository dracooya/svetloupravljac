import {House} from "../Models/House.ts";
import axios from "axios";
import {Scene} from "../Models/Scene.ts";
import {NewScene} from "../Models/DTOs/NewScene.ts";
import {ModifyHouseOrRoom} from "../Models/DTOs/ModifyHouseOrRoom.ts";
import {ModifyScene} from "../Models/DTOs/ModifyScene.ts";

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

    public edit(scene: ModifyScene) : Promise<string> {
        console.log(scene)
        return axios({
            method: 'PUT',
            url: `${this.API_URL}scenes/modify`,
            data: scene
        }).then((success) => success.data).catch((err) => {
            console.log(err);
            throw err;
        });
    }

    public delete(id: number) : Promise<string> {
        return axios({
            method: 'DELETE',
            url: `${this.API_URL}scenes/delete/${id}`,
        }).then((success) => success.data).catch((err) => {
            console.log(err);
            throw err;
        });
    }
}