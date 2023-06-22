import React, { useEffect, useState } from "react";
import {
  INITIAL_SNAKE_LENGTH,
  arrowIcons,
  BOARD_SIZE,
  FRAME_RATE,
  arrowKeyCodes,
} from "../utils/Constants";
import {
  friendlyFireHandler,
  snakeDirectionHandler,
  placeFoodHandler,
  wallElimateHandler,
  arrowTypesHandler,
} from "../utils/Features";
import {
  foodSound,
  gameOverSound,
  moveSound,
  musicSound,
} from "../utils/Constants";
import ControllerButton from "./ControllerButton";

const Game = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE_LENGTH);
  const [direction, setDirection] = useState("right");
  const [gameOver, setGameOver] = useState(false);
  const [food, setFood] = useState(placeFoodHandler(INITIAL_SNAKE_LENGTH));
  const [score, setScore] = useState(0);

  //Restarts the game once game is over
  function restartGame() {
    setSnake(INITIAL_SNAKE_LENGTH);
    setFood(placeFoodHandler(INITIAL_SNAKE_LENGTH));
    setDirection("right");
    setGameOver(false);
    setScore(0);
  }

  if (gameOver) {
    gameOverSound.play();
    alert("Game over");
    restartGame();
  }

  const snakeMoveHandler = (type) => {
    if (gameOver) return;

    const [head] = snake;
    const newHead = { ...head };

    //Includes the logic to give direction to snake
    snakeDirectionHandler(setDirection, type, newHead);

    //Make sures that game gets over once Snake collides to wall
    wallElimateHandler(newHead, setGameOver);

    //If snake collides to its own body then this functions get called
    friendlyFireHandler(newHead, snake, setGameOver);

    //This function make sures that once snake eats food then function stops executing further
    if (newHead.x === food.x && newHead.y === food.y) {
      foodSound.play();
      setScore((prev) => prev + 1);
      setFood(placeFoodHandler(snake));
      const newSnake = [newHead, ...snake];
      setSnake(newSnake);
      return;
    }

    //It make sures that if snake doesnt eat food then its tail gets cutoff to maintain the current length of the snake
    const newSnake = [newHead, ...snake.slice(0, -1)];
    setSnake(newSnake);
  };

  const handleKeyDown = (e) => {
    const keyIndex = arrowKeyCodes.findIndex(
      (key) => key.keyCode === e.keyCode
    );
    const key = arrowKeyCodes[keyIndex];

    if (arrowTypesHandler(direction, key.type)) {
      moveSound.play();
      snakeMoveHandler(key.type);
    }
  };

  useEffect(() => {
    //Starts the loop once the game starts
    const callSnakeMove = setInterval(() => {
      snakeMoveHandler(direction);
    }, FRAME_RATE);

    return () => clearTimeout(callSnakeMove);
  }, [snake]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [snake]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className=" font-semibold mb-5 text-xl md:text-3xl md:font-bold">
        Your score: {score < 10 ? `0${score}` : score}
      </div>

      <div className="game-board sm:h-[400px] sm:w-[400px] md:w-[500px] md:h-[500px] lg:h-[600px] lg:w-[600px] board">
        {new Array(BOARD_SIZE).fill().map((_, row, arr) => {
          //Nesed Map methods to create rows and colums efficiently
          /////////////////////////////////////////////////////////

          return arr.map((_, col, arr) => {
            const isSnakeCell = snake.some(
              (segment, i) => i !== 0 && segment.x === col && segment.y === row
            );

            const [head] = snake;

            const headCell = head.x === col && head.y === row;
            const foodCell = food.x === col && food.y === row;

            return (
              <div
                key={`${col}-${row}`}
                //Styling eac
                className={`
                ${headCell ? " bg-purple-700" : ""} 
                
                ${isSnakeCell ? " bg-blue-500 " : ""} 
                
                ${foodCell ? "bg-red-600 food" : ""} 
                text-[5px] flex justify-center items-center`}
              ></div>
            );
          });
        })}
      </div>

      <div className="controller-container">
        {arrowIcons.map((icon) => {
          return (
            <ControllerButton
              key={icon.type}
              direction={direction}
              type={icon.type}
              snakeMoveHandler={snakeMoveHandler}
              Icon={icon.icon}
              onClick={() => moveSound.play()}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Game;
