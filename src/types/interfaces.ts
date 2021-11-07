export interface IPlayground {
  canvas: HTMLCanvasElement;
  ctx: any;
  width: number;
  height: number;
  draw(matrix: number[][]): void;
  drawGrid(): void;
}

export interface IEngine {
  figures: number[][][][];
  playMatrix: number[][];
  previewMatrix: number[][];
  currFigure: number[][][];
  nextFigure: number[][][];
  currentRotate: number;
  startGame(): void;
  setPlayMatrix(): void;
  setPreviewMatrix(): void;
  createMatrix(row: number, col: number): number[][];
  mapFigureToPreview(): void;
  mapFigureToPlay(): void;
}
