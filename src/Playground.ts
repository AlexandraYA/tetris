import {IPlayground} from './types/interfaces';

class Playground implements IPlayground {
  canvas: any;
  ctx: any;

  constructor(elemId: string, strokeColor: string, fillColor: string) {
    this.canvas = document.getElementById(elemId);
    if (this.canvas.getContext) {
      this.ctx = this.canvas.getContext('2d');
      this.ctx.strokeStyle = strokeColor;
      this.ctx.fillStyle = fillColor;
    }
  }

  draw(matrix: number[][]): void {
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

  drawGrid(w: number, h: number):void {
    this.ctx.beginPath();

    for (let i = 0.5; i < w; i+=25) {
      this.ctx.moveTo(i, 0.5);
      this.ctx.lineTo(i, h);
    }

    for (let j = 0.5; j < h; j+=25) {
      this.ctx.moveTo(0.5, j);
      this.ctx.lineTo(w, j);
    }

    this.ctx.stroke();
    this.ctx.closePath();
  }
}


export default Playground;