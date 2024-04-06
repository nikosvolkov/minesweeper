import { rows, columns } from './consts';

export const getBoard2dArray = () => {
  const board = [];
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      const boardCell = document.getElementById(`${r}-${c}`);
      row.push(boardCell);
    }
    board.push(row);
  }
  return board;
};

let stopWatch;
let stopWatchValue = 0;
export const stopWatchHandler = (state) => {
  if (state == 'start') {
    stopWatch = setInterval(() => {
      stopWatchValue++;
      document.getElementById('stopwatch').innerText = `⏱:${String(stopWatchValue).padStart(3,'0')}`;
    }, 1000);
  }else if (state == 'stop'){
    clearInterval(stopWatch)
  }
};
