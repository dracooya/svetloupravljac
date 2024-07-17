import axios from "axios";
import {House} from "../Models/House.ts";
import {NewHouse} from "../Models/DTOs/NewHouse.ts";

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
}