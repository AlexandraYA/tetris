export interface IPlayground {
  canvas: any;
  draw(matrix: number[][]): void;
  drawGrid(w: number, h: number): void;
}
