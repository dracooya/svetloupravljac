import axios from "axios";
import {House} from "../Models/House.ts";
import {NewHouse} from "../Models/DTOs/NewHouse.ts";
import {ModifyHouse} from "../Models/DTOs/ModifyHouse.ts";

export class HouseService {
    private API_URL = 'http://localhost:5000/';

    public getAll() : Promise<House[]> {
        return axios({
            method: 'GET',
            url: `${this.API_URL}houses/all`,
        }).then((chart) => chart.data).catch((err) => {
            console.log(err);
            throw err;
        });
    }


    public add(house: NewHouse) : Promise<string> {
        return axios({
            method: 'POST',
            url: `${this.API_URL}houses/add`,
            data: house
        }).then((success) => success.data).catch((err) => {
            console.log(err);
            throw err;
        });
    }

    public edit(house: ModifyHouse) : Promise<string> {
        return axios({
            method: 'PUT',
            url: `${this.API_URL}houses/modify`,
            data: house
        }).then((success) => success.data).catch((err) => {
            console.log(err);
            throw err;
        });
    }

    public delete(id: number) : Promise<string> {
        return axios({
            method: 'DELETE',
            url: `${this.API_URL}houses/delete/${id}`,
        }).then((success) => success.data).catch((err) => {
            console.log(err);
            throw err;
        });
    }
}