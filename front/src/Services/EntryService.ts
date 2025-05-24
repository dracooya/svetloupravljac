import {Password} from "../Models/DTOs/Password.ts";
import axios from "axios";

export class EntryService {
    private API_URL = import.meta.env.VITE_API_URL;

    public enter(password: Password) : Promise<string> {
        console.log("entering")
        console.log(this.API_URL)
        return axios({
            method: 'POST',
            url: `${this.API_URL}enter`,
            data: password
        }).then((success) => success.data).catch((err) => {
            console.log(err);
            throw err;
        });
    }

    public isAuthorized() : Promise<boolean> {
        console.log("checkin")
        return axios({
            method: 'GET',
            url: `${this.API_URL}enter/check`,
        }).then((success) => success.data).catch((err) => {
            console.log(err);
            throw err;
        });
    }
}