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
  playground: IPlayground;
  preview: IPlayground;
  currFigure: number[][][];
  nextFigure: number[][][];
  currRotate: number;
  setIntervalid: NodeJS.Timer;
  SECONDS: number;
  init(): void;
  startGame(): void;
  checkFullLine(cells: Map<number, number>): void;
  eraseCurFigure(): void;
  setPlayMatrix(): void;
  setPreviewMatrix(): void;
  createMatrix(row: number, col: number): number[][];
  mapFigureToPreview(): void;
  mapFigureToPlay(): void;
}
