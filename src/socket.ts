import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = "https://ct239-server01.onrender.com";

export const socket = io(URL, {
  transports: ["websocket"],
});

