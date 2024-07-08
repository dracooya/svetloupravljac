import {Room} from "./Room.ts";
import {ItemToDelete} from "./ItemToDelete.ts";

export interface House extends ItemToDelete{
    name: string,
    value: number,
    rooms: Room[]
}