import {Password} from "../Models/DTOs/Password.ts";
import axios from "axios";

export class EntryService {
    private API_URL = 'http://localhost:5000/';

    public enter(password: Password) : Promise<string> {
        return axios({
            method: 'POST',
            url: `${this.API_URL}enter`,
            data: password
        }).then((success) => success.data).catch((err) => {
            console.log(err);
            throw err;
        });
    }
}