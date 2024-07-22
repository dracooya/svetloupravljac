import {io} from "socket.io-client";
import {Command} from "../../Models/DTOs/Command.ts";

export const socket = io('http://localhost:5000');

export const sendCommand = (command: Command) => {
    socket.emit('command', JSON.stringify(command));
}