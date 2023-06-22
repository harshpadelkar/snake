import {
  AiOutlineArrowUp,
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
  AiOutlineArrowDown,
} from "react-icons/ai";

import food from "../music/food.mp3";
import gameover from "../music/gameover.mp3";
import move from "../music/move.mp3";

export const BOARD_SIZE = 20;

export const FRAME_RATE = 300;

export const INITIAL_SNAKE_LENGTH = [
  { x: 5, y: BOARD_SIZE - 1 },
  { x: 4, y: BOARD_SIZE - 1 },
  { x: 3, y: BOARD_SIZE - 1 },
  { x: 2, y: BOARD_SIZE - 1 },
  { x: 1, y: BOARD_SIZE - 1 },
];

export const arrowIcons = [
  { icon: AiOutlineArrowUp, type: "up" },
  { icon: AiOutlineArrowLeft, type: "left" },
  { icon: AiOutlineArrowDown, type: "down" },
  { icon: AiOutlineArrowRight, type: "right" },
];

export const arrowKeyCodes = [
  { keyCode: 38, type: "up" },
  { keyCode: 37, type: "left" },
  { keyCode: 40, type: "down" },
  { keyCode: 39, type: "right" },
];

export const foodSound = new Audio(food);
export const gameOverSound = new Audio(gameover);
export const moveSound = new Audio(move);
export const musicSound = new Audio("../music/music.mp3");
