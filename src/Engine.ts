import {IEngine} from './types/interfaces';

class Engine implements IEngine {
  figures: number[][][][];
  playMatrix: number[][];
  previewMatrix: number[][];
  currFigure: number[][][];
  nextFigure: number[][][];
  currentRotate = 0;

  constructor(figures: number[][][][]) {
    this.figures = figures;
  }

  getRandomInt = (max: number): number => {
    return Math.floor(Math.random() * max);
  }

  startGame() {
    this.setPlayMatrix();
    this.setPreviewMatrix();
    
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
    let center = this.previewMatrix.length / 2 - 2;
    console.log("center preview = ", center)

    this.nextFigure[0].forEach(coords => {
      this.previewMatrix[coords[1]][coords[0] + center] = 1;
    })
  }  

  mapFigureToPlay() {
    this.playMatrix = this.createMatrix(19, 12);
    let center = this.playMatrix.length / 2 - 2;
    console.log("center preview = ", center)

    this.currFigure[this.currentRotate].forEach(coords => {
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
