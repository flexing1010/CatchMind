import { disableChat, enableChat } from "./chat";
import {
  disableCanvas,
  enableCanvas,
  hideControls,
  resetCanvas,
  showControls,
} from "./paint";

const board = document.getElementById("jsPBoard");
const notifs = document.getElementById("jsNotifs");
const seconds = document.getElementById("jsCountDown");

const addPlayers = (players) => {
  board.innerHTML = "";
  players.forEach((player) => {
    const playerEmelemt = document.createElement("span");
    playerEmelemt.innerText = `${player.nickname}: ${player.points}`;
    board.appendChild(playerEmelemt);
  });
};

const setNotifs = (text) => {
  notifs.innerText = "";
  notifs.innerText = text;
};

let count = 30;

let timer = null;

export const counter = () => {
  count--;
  seconds.innerText = count;
};

export const handlePlayerUpdate = ({ sockets }) => addPlayers(sockets);
export const handleGameStarted = () => {
  setNotifs("");
  disableCanvas();
  hideControls();
  enableChat();
  return (timer = setInterval(counter, 1000));
};

export const handleLeaderNotif = ({ word }) => {
  enableCanvas();
  showControls();
  disableChat();
  notifs.innerText = `You are the Leader, paint ${word}`;
};

export const handleGameEnded = () => {
  setNotifs("Game ended");
  clearInterval(timer);
  disableCanvas();
  hideControls();
  resetCanvas();
  count = 31;
};

export const handleGameStarting = () => setNotifs("Game will start soon");
