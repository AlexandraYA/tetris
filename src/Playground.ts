import {IPlayground} from './types/interfaces';

class Playground implements IPlayground {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;

  constructor(
    elemId: string,
    w: number,
    h: number,
    strokeColor: string,
    fillColor: string
  ) {
    this.width = w;
    this.height = h;
    this.canvas = document.getElementById(elemId) as HTMLCanvasElement;
    if (this.canvas.getContext) {
      this.ctx = this.canvas.getContext('2d');
      this.ctx.strokeStyle = strokeColor;
      this.ctx.fillStyle = fillColor;
    }
  }

  draw(matrix: number[][]): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawGrid();
    this.ctx.beginPath();

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === 1) {
          this.ctx.fillRect(0.5 + j*25 + 1, 0.5 + i*25 + 1, 23, 23);
        }
      }
    }
      
    this.ctx.closePath();
  }

  drawGrid():void {
    this.ctx.beginPath();

    for (let i = 0.5; i < this.width; i+=25) {
      this.ctx.moveTo(i, 0.5);
      this.ctx.lineTo(i, this.height);
    }

    for (let j = 0.5; j < this.height; j+=25) {
      this.ctx.moveTo(0.5, j);
      this.ctx.lineTo(this.width, j);
    }

    this.ctx.stroke();
    this.ctx.closePath();
  }
}


export default Playground;