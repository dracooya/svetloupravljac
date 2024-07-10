import {Room} from "./Room.ts";

export interface House{
    name: string,
    id: number,
    rooms: Room[]
}