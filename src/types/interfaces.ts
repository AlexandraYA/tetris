export interface IPlayground {
  canvas: any;
  draw(matrix: number[][]): void;
  drawGrid(): void;
}
