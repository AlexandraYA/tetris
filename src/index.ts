
import Playground from './Playground';
import settings from './settings.json';


window.onload = function() {

    const $start = document.querySelector('#' + settings["start"])
    const $pause = document.querySelector('#' + settings["pause"])
    const $left = document.querySelector('#' + settings["left"])
    const $right = document.querySelector('#' + settings["right"])
    const $rotate = document.querySelector('#' + settings["rotate"])
    const $speed = document.querySelector('#' + settings["speed"])
    const $score = document.querySelector('#' + settings["score"])

    const playground  = new Playground(settings["tetris"], '#666', '#FF0000');
    playground.drawGrid(301, 476);

    const preview  = new Playground(settings["preview"], '#666', '#FF0000');
    preview.drawGrid(250, 100);

    const matrix: number[][] = [
      [0,0,0,0,0,0,1,0,0,0,0,0],
      [0,0,0,0,0,0,1,0,0,0,0,0],
      [0,0,0,0,0,1,1,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
    ];

    const matrixPreview: number[][] = [
      [0,0,0,0,1,0,0,0,0,0],
      [0,0,0,0,1,0,0,0,0,0],
      [0,0,0,0,1,1,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
    ];
    

    $start.addEventListener('click', () => {

      alert("Start");

      playground.draw(matrix);
      preview.draw(matrixPreview);
    })


};
