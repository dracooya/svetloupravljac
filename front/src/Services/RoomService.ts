import axios from "axios";
import {NewRoom} from "../Models/DTOs/NewRoom.ts";
import {ModifyHouseOrRoom} from "../Models/DTOs/ModifyHouseOrRoom.ts";

export class RoomService {
    private API_URL = import.meta.env.VITE_API_URL;

    public add(room: NewRoom) : Promise<string> {
        return axios({
            method: 'POST',
            url: `${this.API_URL}rooms/add`,
            data: room
        }).then((success) => success.data).catch((err) => {
            console.log(err);
            throw err;
        });
    }

    public edit(room: ModifyHouseOrRoom) : Promise<string> {
        return axios({
            method: 'PUT',
            url: `${this.API_URL}rooms/modify`,
            data: room
        }).then((success) => success.data).catch((err) => {
            console.log(err);
            throw err;
        });
    }

    public delete(id: number) : Promise<string> {
        return axios({
            method: 'DELETE',
            url: `${this.API_URL}rooms/delete/${id}`,
        }).then((success) => success.data).catch((err) => {
            console.log(err);
            throw err;
        });
    }
}