import React, { useEffect, useState, useRef } from 'react';
//import {format} from 'date-fns'
import './App.css';

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 8 * 32, y: 8 * 32 }]);
  const [direction, setDirection] = useState('right');
  const [food, setFood] = useState({
    x: Math.floor(Math.random() * 15 + 1) * 32,
    y: Math.floor(Math.random() * 15 + 1) * 32,
  });
  const [score, setScore] = useState(0);

  const snakeRef = useRef(snake);
  const directionRef = useRef(direction);
  const foodRef = useRef(food);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 37 && directionRef.current !== 'right') setDirection('left');
      if (event.keyCode === 38 && directionRef.current !== 'down') setDirection('up');
      if (event.keyCode === 39 && directionRef.current !== 'left') setDirection('right');
      if (event.keyCode === 40 && directionRef.current !== 'up') setDirection('down');
    };

    window.addEventListener('keydown', handleKeyDown);

    const game = setInterval(startGame, 200);
    return () => {
      clearInterval(game);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    snakeRef.current = snake;
  }, [snake]);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    foodRef.current = food;
  }, [food]);

  const creatSnake = () => {
    const canvas = document.getElementById('snake');
    const context = canvas.getContext('2d');
    for (let i = 0; i < snakeRef.current.length; i++) {
      context.fillStyle = 'blue';
      context.fillRect(snakeRef.current[i].x, snakeRef.current[i].y, 32, 32);
    }
  };

  const createBG = () => {
    const canvas = document.getElementById('snake');
    const context = canvas.getContext('2d');
    context.fillStyle = 'purple';
    context.fillRect(0, 0, 16 * 32, 16 * 32);
  };

  const createFood = () => {
    const canvas = document.getElementById('snake');
    const context = canvas.getContext('2d');
    context.fillStyle = 'yellow';
    context.fillRect(foodRef.current.x, foodRef.current.y, 32, 32);
  };

  const startGame = () => {
    let newSnake = [...snakeRef.current];
    let head = { ...newSnake[0] };

    switch (directionRef.current) {
      case 'right':
        head.x += 32;
        break;
      case 'left':
        head.x -= 32;
        break;
      case 'up':
        head.y -= 32;
        break;
      case 'down':
        head.y += 32;
        break;
    }

    if (head.x >= 16 * 32) head.x = 0;
    if (head.x < 0) head.x = 15 * 32;
    if (head.y >= 16 * 32) head.y = 0;
    if (head.y < 0) head.y = 15 * 32;

    for (let i = 1; i < newSnake.length; i++) {
      if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
        alert('Game Over 😭');
        setScore(0);
        setSnake([{ x: 8 * 32, y: 8 * 32 }]);
        setDirection('right');
        setFood({
          x: Math.floor(Math.random() * 15 + 1) * 32,
          y: Math.floor(Math.random() * 15 + 1) * 32,
        });
        return;
      }
    }

    newSnake.unshift(head);

    if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
      const newFood = {
        x: Math.floor(Math.random() * 15 + 1) * 32,
        y: Math.floor(Math.random() * 15 + 1) * 32,
      };

      setFood(newFood);
      setScore((prevScore) => prevScore + 1);
      foodRef.current = newFood;
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);

    createBG();
    createFood();
    creatSnake();
  };

  return (
    <div>
      <h1>MINION GAME: 🍌</h1>
      <h2>Score: {score}</h2>
      <canvas id='snake' width='512' height='512'></canvas>
    </div>
  );
};

export default SnakeGame;
