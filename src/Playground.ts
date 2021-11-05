import {IPlayground} from './types/interfaces';

class Playground implements IPlayground {
  canvas: any;
  ctx: any;

  constructor(elemId: string) {
    this.canvas = document.getElementById(elemId);
    if (this.canvas.getContext) {
      this.ctx = this.canvas.getContext('2d');
    }
  }

  draw(matrix: number[][]): void {
    this.ctx.strokeStyle = 'rgba(102,102,102,1)';
    this.ctx.fillStyle = "#FF0000";
    this.ctx.beginPath();
    this.drawGrid();
    

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
    for (let i = 0.5; i < 301; i+=25) {
      this.ctx.moveTo(i, 0.5);
      this.ctx.lineTo(i, 476);
    }

    for (let i = 0.5; i < 476; i+=25) {
      this.ctx.moveTo(0.5, i);
      this.ctx.lineTo(301, i);
    }
    this.ctx.stroke();
  }
}


export default Playground;