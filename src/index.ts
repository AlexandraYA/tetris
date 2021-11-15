
import Playground from './Playground';
import Engine from './Engine';
import {IPlayground, IEngine} from './types/interfaces';
import settings from './settings.json';


window.onload = function() {

    const $start = document.querySelector('#' + settings["startId"])
    const $pause = document.querySelector('#' + settings["pauseId"])
    const $left = document.querySelector('#' + settings["leftId"])
    const $right = document.querySelector('#' + settings["rightId"])
    const $rotate = document.querySelector('#' + settings["rotateId"])
    const $speed = document.querySelector('#' + settings["speedId"])
    const $score = document.querySelector('#' + settings["scoreId"])

    const playground: IPlayground  = new Playground(settings["tetrisId"], 301, 476, '#666', '#FF0000');
    const preview: IPlayground  = new Playground(settings["previewId"], 250, 125, '#666', '#FF0000');
    const store: IEngine = new Engine(settings["figures"], playground, preview);

    store.init();

    $start.addEventListener('click', () => {
      store.startGame();
      
    })


};
