"use client";
import { useEffect, useState } from "react";
import presets from '@/predefined.json'

const { v4: uuidv4 } = require("uuid");
let rows = 41;
let cols = 41;

export default function Home() {
  const [grid, setGrid] = useState<number[][]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(50);
  const [generations, setGenerations] = useState<number>(0);

  function initializeGrid(){
    const initialGrid = Array(rows)
      .fill(0)
      .map(() => Array(cols).fill(0));

    initialGrid[7][9] = 1;
    initialGrid[7][10] = 1;
    initialGrid[8][9] = 1;
    initialGrid[8][10] = 1;

    initialGrid[9][7] = 1;
    initialGrid[9][8] = 1;
    initialGrid[9][9] = 1;
    initialGrid[10][8] = 1;

    setGrid(initialGrid);
  };

  function updateGrid(){
    setGrid((prevGrid) => {
      const newGrid = JSON.parse(JSON.stringify(prevGrid));

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const neighbors = countNeighbors(prevGrid, i, j);

          if (prevGrid[i][j] === 1) {
            if (neighbors < 2 || neighbors > 3) {
              newGrid[i][j] = 0; // Célula morre
            }
          } else {
            if (neighbors === 3) {
              newGrid[i][j] = 1; // Célula nasce
            }
          }
        }
      }
      setGenerations((gen) => gen += 1);
      return newGrid;
    });
  };

  function countNeighbors(grid: Array<Array<number>>, x: number, y: number) {
    let count = 0;
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    for (let i = 0; i < directions.length; i++) {
      const [dx, dy] = directions[i];
      const newX = x + dx;
      const newY = y + dy;

      if (newX >= 0 && newX < rows && newY >= 0 && newY < cols) { // Proteger dos limites do array
        count += grid[newX][newY];
      }
    }
    return count;
  }

  function changeValue(row: number, col: number) {
    setIsRunning(false);

    let newGrid = [...grid];

    newGrid[row][col] === 0 ? (newGrid[row][col] = 1) : (newGrid[row][col] = 0);
    setGrid(newGrid);
  }

  useEffect(() => {
    initializeGrid();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        updateGrid();
      }, speed);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, speed]);

  function handleToggleRunning(){
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

function handleReset(){
    setIsRunning(false);

    let clearGrid = [...grid];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        clearGrid[i][j] = 0;
      }
    }
    setGenerations(0);
    setGrid(clearGrid);
  };

  function handleSpeedChange(event: React.ChangeEvent<HTMLInputElement>){
    setSpeed(Number(event.target.value));
  };

  function handlePattern (pattern: number){
    setIsRunning(false);

    if (pattern === 1) {
      setGrid(presets.pulsar)
    }
    if (pattern === 2) {
      setGrid(presets.pentadecathlon)
    }
  }

  return (
    <main className='flex flex-col h-screen items-center justify-center text-lg'>
      <h1 className='text-3xl '>Conway&apos;s Game of Life</h1>
      <div className='grid grid-cols-41 gap-0 max-w-fit'>
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i * 41 + j}`}
              onClick={(e) => changeValue(i, j)}
              className={`w-5 h-5 aspect-square border text-xs  ${
                cell === 0 ? "bg-black border-green-500" : "bg-green-500 border-black"
              }`}></div>
          ))
        )}
      </div>
      <div className='flex flex-row items-center justify-center gap-2'>
        <button
          className='border border-green-500 w-24 h-12 p-1 m-1 rounded  hover:text-black hover:bg-green-500 transition'
          onClick={() => handleToggleRunning()}>
          {isRunning ? "Stop" : "Run"}
        </button>
        <button
          className='border border-green-500 w-24 h-12 p-1 m-1 rounded  hover:text-black hover:bg-green-500 transition'
          onClick={() => handleReset()}>
          Reset
        </button>
        <div className='flex flex-col items-center justify-center '>
          <span>Interval: {speed} ms</span>
          <input
            type='range'
            min={50}
            max={1000}
            step={50}
            value={speed}
            onChange={handleSpeedChange}
            className="cursor-pointer appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-none [&::-webkit-slider-runnable-track]:bg-white/10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[25px] [&::-webkit-slider-thumb]:w-[25px] [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:bg-green-500"
          />
        </div>
        <button
        className='border border-green-500 w-24 h-12 p-1 m-1 rounded  hover:text-black hover:bg-green-500 transition'
        onClick={() => handlePattern(1)}>
          Pulsar
      </button>
        <button
        className='border border-green-500 w-24 h-12 p-1 m-1 rounded  hover:text-black hover:bg-green-500 transition'
        onClick={() => handlePattern(2)}>
          Pentadec
      </button>
      </div>
      <h2>
      Generations: {generations}
        </h2>
    </main>
  );
}

