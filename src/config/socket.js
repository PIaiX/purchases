import { io } from "socket.io-client";
import { BASE_URL_FOR_SOCKET } from './api'
const socket = io(BASE_URL_FOR_SOCKET, { autoConnect: false });
export default socket;
