import {IEngine, IPlayground} from './types/interfaces';

class Engine implements IEngine {
  figures: number[][][][];
  playMatrix: number[][];
  previewMatrix: number[][];
  playground: IPlayground;
  preview: IPlayground;
  currFigure: number[][][];
  nextFigure: number[][][];
  setIntervalid: NodeJS.Timer;
  currRotate = 0;

  SECONDS = 1000;

  constructor(figures: number[][][][], playground: IPlayground, preview: IPlayground) {
    this.figures = figures;
    this.playground = playground;
    this.preview = preview;
  }

  getRandomInt = (max: number): number => {
    return Math.floor(Math.random() * max);
  }

  init() {
    this.playground.drawGrid();
    this.preview.drawGrid();
    this.playMatrix = this.createMatrix(12, 19);
  }

  startGame() {
    this.setPlayMatrix();
    this.setPreviewMatrix();
    this.playground.draw(this.playMatrix);
    this.preview.draw(this.previewMatrix);

    this.setIntervalid = setInterval(() => {
      console.log("cycle started")
      this.nextStep();
      
    }, this.SECONDS)
  }

  nextStep() {
    let stepEnable = true;
    let cells = new Map();

    let tempCurFigure = this.currFigure[this.currRotate].map(cell => {
      let _cell = [cell[0], cell[1] + 1];

      if (cells.has(_cell[0]) || 
          (cells.has(_cell[0]) && cells.get(_cell[0]) < _cell[1])) {
        cells.set(_cell[0], _cell[1]);
      }

      return _cell;
    });    

    cells.forEach((x, y) => {
      if (!this.playMatrix[x][y] || this.playMatrix[x][y] === 1) {
        stepEnable = false;
      }
    });

    if (stepEnable) {
      this.eraseCurFigure();

      console.log("after null ", this.playMatrix)

      this.currFigure[this.currRotate] = tempCurFigure;
      this.mapFigureToPlay();
    } else {
      clearInterval(this.setIntervalid);
      this.checkFullLine(cells);
    }
    
    // if full - delete it - this.removeLine()
    // if not full - copy new cur figure from preview
    // generate new preview
    // finish cycle

    this.playground.draw(this.playMatrix);
    this.preview.draw(this.previewMatrix);
  }

  checkFullLine(cells: Map<number, number>) {
    console.log("check it = ", cells);    
  }

  setPreviewMatrix() {
    const nextFigN: number = this.getRandomInt(this.figures.length);
    this.nextFigure = [...this.figures[nextFigN]];
    this.mapFigureToPreview();
  }

  setPlayMatrix() {
    const currFigN: number = this.getRandomInt(this.figures.length);
    this.currFigure = [...this.figures[currFigN]];
    this.mapFigureToPlay()
  }

  eraseCurFigure() {
    let center = this.playMatrix[0].length / 2 - 2;
    console.log("center = ", center)
    this.currFigure[this.currRotate].forEach(cell => {
      console.log("cell[1] = ", cell[1])
      console.log("cell[0] = ", cell[0] + center)
      this.playMatrix[cell[1]][cell[0] + center] = 0;
    });
  }

  /**
   * Coords in figure array are calculated
   * from square 4 by 4
   * 0 0 1 0
   * 0 0 1 0
   * 0 1 1 0
   * 0 0 0 0
   */

  mapFigureToPreview() {
    this.previewMatrix = this.createMatrix(4, 10);
    let center = this.previewMatrix[0].length / 2 - 2;
    console.log("center preview = ", center)

    this.nextFigure[0].forEach(coords => {
      this.previewMatrix[coords[1]][coords[0] + center] = 1;
    })
  }  

  mapFigureToPlay() {
    let center = this.playMatrix[0].length / 2 - 2;
    console.log("center preview = ", center)

    this.currFigure[this.currRotate].forEach(coords => {
      this.playMatrix[coords[1]][coords[0] + center] = 1;
    })    
  }
  
  createMatrix(row: number, col: number): number[][] {
    let matrix: number[][] = [];

    for (let i = 0; i < col; i++) {
      matrix[i] = [];

      for (let j = 0; j < row; j++) {
        matrix[i].push(0);
      }
    }

    return matrix;
  }
}

export default Engine;
