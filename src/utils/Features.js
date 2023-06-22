import { BOARD_SIZE } from "./Constants";

export const snakeDirectionHandler = (setDirection, type, head) => {
  if (type === "right") {
    setDirection("right");
    head.x = head.x + 1;
  }
  if (type === "left") {
    setDirection("left");
    head.x = head.x - 1;
  }
  if (type === "up") {
    setDirection("up");
    head.y = head.y - 1;
  }
  if (type === "down") {
    setDirection("down");
    head.y = head.y + 1;
  }

  return head;
};

export const wallElimateHandler = (head, setGameOver) => {
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x > BOARD_SIZE - 1 ||
    head.y > BOARD_SIZE - 1
  ) {
    setGameOver(true);
    return;
  }
};

export const friendlyFireHandler = (head, snake, setGameOver) => {
  const headX = snake.some(
    (bodyCell, i) => i !== 0 && bodyCell.x === head.x && bodyCell.y === head.y
  );

  if (headX) {
    setGameOver(true);
    return;
  }
};

export const placeFoodHandler = (snake) => {
  const x = Math.floor(Math.random() * BOARD_SIZE);
  const y = Math.floor(Math.random() * BOARD_SIZE);

  const headX = snake.some(
    (bodyCell, i) => bodyCell.x === x && bodyCell.y === y
  );

  if (headX) {
    return {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
  }
  return { x, y };
};

export const arrowTypesHandler = (direction, type) => {
  if (
    (direction === "left" && type === "right") ||
    (direction === "right" && type === "left") ||
    (direction === "up" && type === "down") ||
    (direction === "down" && type === "up") ||
    (direction === "right" && type === "right") ||
    (direction === "up" && type === "up") ||
    (direction === "down" && type === "down") ||
    (direction === "left" && type === "left")
  ) {
    return false;
  } else {
    return true;
  }
};
