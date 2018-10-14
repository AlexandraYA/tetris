var Tetris = function() {
    this.field = null;
    this.fieldW = 0;
    this.preview = null;
    this.previewW = 0;
    this.previewType = [];
    this.btnLeft = null;
    this.btnRight = null;
    this.btnRotate = null;
    this.btnDown = null;
    this.playCycle = null;
    this.scoreBlock = null;
    this.currentTypeFig = 0;
    this.previewTypeFig = 0;
    this.currentRotate = 0;
    this.currentElem = {};
    this.currentElemLinks = [];
    this.fieldElemLinks = [];
    this.bottomFieldEdge = {};
    this.previewElem = [];
    this.allElems = [];
    this.blockHeight = 20;
    this.typesFigures = ['square','four','fourRev','stick','squareLtl','fig','geleft','geright'];

    this.typeFigFitures = [{'square': [[-20,0],[0,0],[-20,20],[0,20]],
            'four': [[0,0],[0,20],[-20,20],[-20,40]],
            'fourRev': [[-20,0],[-20,20],[0,20],[0,40]],
            'stick': [[0,0],[0,20],[0,40],[0,60]],
            'squareLtl': [[0,0]],
            'fig': [[0,0],[0,20],[-20,20],[20,20]],
            'geleft': [[0,0],[-20,0],[0,20],[0,40]],
            'geright': [[0,0],[20,0],[0,20],[0,40]]
        },
        {   'square': [[-20,0],[0,0],[-20,20],[0,20]],
            'four': [[0,0],[0,20],[-20,0],[20,20]],
            'fourRev': [[0,0],[0,20],[-20,20],[20,0]],
            'stick': [[0,0],[-20,0],[20,0],[-40,0]],
            'squareLtl': [[0,0]],
            'fig': [[0,0],[0,20],[0,40],[20,20]],
            'geleft': [[0,0],[-20,0],[20,0],[-20,20]],
            'geright': [[0,0],[-20,0],[20,0],[20,20]]
        },
        {   'square': [[-20,0],[0,0],[-20,20],[0,20]],
            'four': [[0,0],[0,20],[-20,20],[-20,40]],
            'fourRev': [[-20,0],[-20,20],[0,20],[0,40]],
            'stick': [[0,0],[0,20],[0,40],[0,60]],
            'squareLtl': [[0,0]],
            'fig': [[0,0],[0,20],[-20,0],[20,0]],
            'geleft': [[0,0],[0,20],[0,40],[20,40]],
            'geright': [[0,0],[0,20],[0,40],[-20,40]]
        },
        {   'square': [[-20,0],[0,0],[-20,20],[0,20]],
            'four': [[0,0],[0,20],[-20,0],[20,20]],
            'fourRev': [[0,0],[0,20],[-20,20],[20,0]],
            'stick': [[0,0],[-20,0],[20,0],[-40,0]],
            'squareLtl': [[0,0]],
            'fig': [[0,0],[0,20],[0,40],[-20,20]],
            'geleft': [[0,20],[-20,20],[20,20],[20,0]],
            'geright': [[0,0],[-20,-20],[-20,0],[20,0]]
        }];    
    this.speed = 60;
    this.speedEtalon = 60;
    this.columnsCnt = 0;
    this.fieldBottom = 0;;
};

Tetris.prototype.init = function() {
    this.field = document.getElementById('field');
    this.columnsCnt = (parseInt(this.field.offsetWidth) - 8) / this.blockHeight;
    this.fieldW = this.blockHeight * this.columnsCnt / 2;
    this.fieldBottom = parseInt(this.field.offsetHeight) - 5;
    
    for (var i = 0; i < this.columnsCnt; i++) {
        var tempArr = [];
        tempArr.push(this.fieldBottom);
        this.bottomFieldEdge[i * this.blockHeight] = tempArr;
    }

    this.preview = document.getElementById('preview');
    this.previewW = parseInt(this.preview.offsetWidth) / 2;
    this.btnLeft = document.getElementById('btnLeft');
    this.btnRight = document.getElementById('btnRight');
    this.btnDown = document.getElementById('btnDown');
    this.btnRotate = document.getElementById('btnRotate');
    this.scoreBlock = document.getElementById('score');
    this.haven = document.getElementById('haven');
    this.haven.style.bottom = "50%";
    this.hell = document.getElementById('hell');
    this.hell.style.top = "50%";

    var that = this;
    this.btnLeft.addEventListener('click', function(){that.moveLeft();});
    this.btnRight.addEventListener('click', function(){that.moveRight();});
    this.btnDown.addEventListener('click', function(){that.speedIncrease();});
    this.btnRotate.addEventListener('click', function(){that.rotate();});
    window.addEventListener('keydown', function(e){that.controlKeyDown(e);});

    this.play();
};

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min) ;
}

Tetris.prototype.play = function() {
    this.newFigure();
    that = this;

    this.playCycle = window.setInterval(function() {
        that.move();
    }, this.speed);
};

Tetris.prototype.gameOver = function() {
    window.clearInterval(this.playCycle);
    document.getElementById('gameOver').classList.add("active");
    return false;
};

Tetris.prototype.newFigure = function() {
    this.speed = this.speedEtalon;
    this.currntRotate = 0;
    this.currentTypeFig = getRandomArbitrary(0,7);
    this.currentElem = [];
    this.currentElemLinks = [];
    this.bottomCurElemEdge = [];
    this.previewElem = [];
    var currentCoordsArr = [];

    if (this.previewType.length) {
        currentCoordsArr = this.previewType;
        this.currentTypeFig = this.previewTypeFig;
    } else {
        currentCoordsArr = this.typeFigFitures[0][this.typesFigures[this.currentTypeFig]];
    }

    var currentCoordsLength = currentCoordsArr.length;
    var keys = [];

    for (var i = 0; i < currentCoordsLength; i++) {
        var x = currentCoordsArr[i][0] + this.fieldW;

        if (keys.indexOf(x) > -1) {
            this.currentElem[x].push(currentCoordsArr[i][1]);
        } else {
            keys.push(x);
            var arr = [];
            arr.push(currentCoordsArr[i][1]);
            this.currentElem[x] = arr;
        }
    }
    this.draw(0, this.currentElem);

    this.previewElem = {};
    this.previewType = [];
    keys = [];
    this.previewTypeFig = getRandomArbitrary(0,7);
    this.previewType = this.typeFigFitures[0][this.typesFigures[this.previewTypeFig]];
    var prevCoordsLength = this.previewType.length;

    for (var i = 0; i < prevCoordsLength; i++) {
        var x = this.previewType[i][0] + this.previewW;

        if (keys.indexOf(x) > -1) {
            this.previewElem[x].push(this.previewType[i][1]);
        } else {
            keys.push(x);
            var arr = [];
            arr.push(this.previewType[i][1]);
            this.previewElem[x] = arr;
        }
    }

    while (this.preview.firstChild) this.preview.removeChild(this.preview.firstChild);
    this.draw(1, this.previewElem);
};

Tetris.prototype.draw = function(preview, coords) {
    for (var key in coords) {
        for (var i = 0; i < coords[key].length; i++) {
            var elem = document.createElement('div');
            elem.className = "block";
            elem.style.left = key + "px";
            elem.style.top = coords[key][i] + "px";

            if (preview) {
                this.preview.appendChild(elem);
            } else {
                this.field.appendChild(elem);
                this.currentElemLinks.push(elem);
            }
        }
    }
};

Tetris.prototype.checkCollisionBottom = function() {
    var isCollision = false;
    var that = this;
    var nextElemY = 0;
    
    for (var key in this.currentElem) {        
        for (var j = 0; j < this.currentElem[key].length; j++) {

            nextElemY = this.currentElem[key][j] + 1;
            
            if ((nextElemY + that.blockHeight) <= that.fieldBottom) {
            
                var fieldYByX = this.bottomFieldEdge[key];
                for (var x = 0; x < fieldYByX.length; x++) {
                    
                    if (fieldYByX[x] <= nextElemY && (fieldYByX[x] + that.blockHeight) > nextElemY) {
                        isCollision = true;
                        
                        if (nextElemY == 2) {
                            return that.gameOver();
                        }
                    }

                    if ((fieldYByX[x] < (nextElemY + that.blockHeight)) && (fieldYByX[x] + that.blockHeight) > (nextElemY + that.blockHeight)) {
                        isCollision = true;
                    }
                }
                
            } else {
                isCollision = true;
            }
        }
    }

    return isCollision;
};

Tetris.prototype.checkCollisionLeft = function() {
    var that = this;
    var isCollision = false;
    var tempX = 0;

    for (var x in this.currentElem) {

        for (var j = 0; j < this.currentElem[x].length; j++) {

            tempX = x - this.blockHeight;

            if (tempX < 0) {
                isCollision = true;
            } else {
                this.bottomFieldEdge[tempX].forEach(function(fieldY) {
                    if (fieldY < that.fieldBottom) {
                        if (fieldY < that.currentElem[x][j] && (fieldY + that.blockHeight) > that.currentElem[x][j]) {
                            isCollision = true;
                        } 

                        if ((fieldY < (that.currentElem[x][j] + that.blockHeight)) && (fieldY + that.blockHeight) > (that.currentElem[x][j] + that.blockHeight)) {
                            isCollision = true;
                        }

                        if (fieldY === that.currentElem[x][j]) {
                            isCollision = true;
                        }
                    }
                });
            }
        }
    }

    return isCollision;
};

Tetris.prototype.checkCollisionRight = function() {
    var isCollision = false;
    var tempX = 0;

    for (var x in this.currentElem) {
        for (var j = 0; j < this.currentElem[x].length; j++) {
            tempX = parseInt(x) + this.blockHeight;

            if (tempX >= this.fieldW * 2) {
                isCollision = true;
            } else {
                this.bottomFieldEdge[tempX].forEach(function(fieldY) {
                    if (fieldY < that.fieldBottom) {
                        if (fieldY < that.currentElem[x][j] && (fieldY + that.blockHeight) > that.currentElem[x][j]) {
                            isCollision = true;
                        } 

                        if ((fieldY < (that.currentElem[x][j] + that.blockHeight)) && (fieldY + that.blockHeight) > (that.currentElem[x][j] + that.blockHeight)) {
                            isCollision = true;
                        }

                        if (fieldY === that.currentElem[x][j]) {
                            isCollision = true;
                        }
                    }
                });
            }
        }
    }

    return isCollision;
};

Tetris.prototype.addElemBlockToField = function() {

    for (var x in this.currentElem) {
        for (var j = 0; j < this.currentElem[x].length; j++) {
            if (this.bottomFieldEdge[x].indexOf(this.currentElem[x][j]) < 0) {
                this.bottomFieldEdge[x].push(this.currentElem[x][j]);
            }
        }
    }
    
    for (var i = 0; i < this.currentElemLinks.length; i++) {
        this.fieldElemLinks.push(this.currentElemLinks[i]);
    }
};

Tetris.prototype.rowRemove = function(yFullRowInArray) {
    
    var index = null;
    var yFullFieldRow = parseInt(yFullRowInArray);
    
    for (var x in this.bottomFieldEdge) {
        index = this.bottomFieldEdge[x].indexOf(yFullFieldRow);
        this.bottomFieldEdge[x].splice(index, 1);
        
        for (var j = 0; j < this.bottomFieldEdge[x].length; j++) {
            if (this.bottomFieldEdge[x][j] < yFullFieldRow) {
                this.bottomFieldEdge[x][j] += this.blockHeight;
            }
        }
    }
    
    for (var i = 0; i < this.fieldElemLinks.length; i++) {
        if (parseInt(this.fieldElemLinks[i].style.top) == yFullRowInArray) {
            this.fieldElemLinks[i].remove();
        }
    }
    
    for (var i = 0; i < this.fieldElemLinks.length; i++) {
        if (parseInt(this.fieldElemLinks[i].style.top) < yFullRowInArray) {
            var top = Math.round(parseInt( this.fieldElemLinks[i].style.top ));
            top += this.blockHeight;
            this.fieldElemLinks[i].style.top = top + 'px';            
        }
    } 
    
    var score = parseInt(this.scoreBlock.innerHTML);
    score++;    
    if (!(score%10) && this.speedEtalon > 10) {
        this.speedEtalon--;
    }
    this.scoreBlock.innerHTML = score;
};

Tetris.prototype.checkRowFull = function() {
    var arr = [];
    var rowIsFull = false;

    for (var x in this.bottomFieldEdge) {
        for (var j = 0; j < this.bottomFieldEdge[x].length; j++) {
            if (this.bottomFieldEdge[x][j] < this.fieldBottom) {
                if ( Array.isArray(arr[this.bottomFieldEdge[x][j]]) ) {
                    arr[this.bottomFieldEdge[x][j]].push(x);
                } else {
                    arr[this.bottomFieldEdge[x][j]] = [];
                    arr[this.bottomFieldEdge[x][j]].push(x);
                }
            }
        }
    }

    for (var index in arr) {
        if (arr[index].length === this.columnsCnt) {
            rowIsFull = true;
            this.rowRemove(index);
        }
    }

    return rowIsFull;
};

Tetris.prototype.move = function() {

    if (this.checkCollisionBottom()) {
        clearInterval(this.playCycle);
        this.addElemBlockToField();
        this.checkRowFull();
        this.play();
    }

    for (var i = 0; i < this.currentElemLinks.length; i++) {
        var top = Math.round(parseInt( this.currentElemLinks[i].style.top ));
        top++;
        this.currentElemLinks[i].style.top = top + 'px';
    }

    for (var x in this.currentElem) {
        for (var i = 0; i < this.currentElem[x].length; i++) {
            ++this.currentElem[x][i];
        }
    }
};

Tetris.prototype.moveLeft = function() {

    if (!this.checkCollisionLeft()) {
        for (var i = 0; i < this.currentElemLinks.length; i++) {
            var left = Math.round(parseInt( this.currentElemLinks[i].style.left ));
            left -= this.blockHeight;
            this.currentElemLinks[i].style.left = left + 'px';
        }

        var tempObj = {};

        for (var x in this.currentElem) {
            tempObj[x - this.blockHeight] = this.currentElem[x];
        }

        this.currentElem = tempObj;
    }
};

Tetris.prototype.moveRight = function() {

    if (!this.checkCollisionRight()) {
        for (var i = 0; i < this.currentElemLinks.length; i++) {
            var left = Math.round(parseInt( this.currentElemLinks[i].style.left ));
            left += this.blockHeight;
            this.currentElemLinks[i].style.left = left + 'px';
        }

        var tempObj = {};

        for (var x in this.currentElem) {
            tempObj[parseInt(x) + this.blockHeight] = this.currentElem[x];
        }

        this.currentElem = tempObj;
    }
};

Tetris.prototype.controlKeyDown = function(e) {
    e.stopPropagation();
    e.preventDefault();

    var that = this;

    switch(e.which) {
        case 37:
            that.moveLeft();
            break;
        case 39:
            that.moveRight();
            break;
        case 38:
            that.rotate();
            break;
        case 40:
            that.speedIncrease();
            break;
    }
};

Tetris.prototype.speedIncrease = function() {
    this.speed = (this.speed > 10) ? (this.speed - 10) : this.speed;
    
    window.clearInterval(this.playCycle);
    this.playCycle = window.setInterval(function() {
        that.move();
    }, this.speed);
};

function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a < b) return -1;
}

Tetris.prototype.rotate = function() {
    
    if (this.currentTypeFig !== 0 && this.currentTypeFig !== 4) {
    
        var xCenter = 0, xArr = [],
            yCenter = 0, yArr = [],
            currentCoordsArr = [];

        window.clearInterval(this.playCycle);    

        for (var x in this.currentElem) {        
            if (xArr.indexOf(x) < 0) {
               xArr.push(parseInt(x));
            }        

            for (var i = 0; i < this.currentElem[x].length; i++) {
                if (yArr.indexOf(this.currentElem[x][i]) < 0) {
                    yArr.push(parseInt(this.currentElem[x][i]));
                 }
            }
        }

        xArr.sort(compareNumeric);
        yArr.sort(compareNumeric);

        if (xArr.length > 2) {
            xCenter = xArr[(Math.round((xArr.length - 1) / 2))];
        } else {
            xCenter = xArr[0];
        }
    
        yCenter = yArr[0];

        if (this.currentRotate < 3) {
            this.currentRotate++;
        } else {
            this.currentRotate = 0;
        }
        
        var tempCurrentElem = [];
        currentCoordsArr = this.typeFigFitures[this.currentRotate][this.typesFigures[this.currentTypeFig]];
        var currentCoordsLength = currentCoordsArr.length;
        var keys = [];

        for (var i = 0; i < currentCoordsLength; i++) {
            var x = currentCoordsArr[i][0] + xCenter;

            if (keys.indexOf(x) > -1) {
                tempCurrentElem[x].push(currentCoordsArr[i][1] + yCenter);
            } else {
                keys.push(x);
                var arr = [];
                arr.push(currentCoordsArr[i][1] + yCenter);
                tempCurrentElem[x] = arr;
            }
        }

        var that = this;
        var isCollision = false;
        
        tempCurrentElem.forEach(function(value, idx) {
            for (var i = 0; i < value.length; i++) {
                if ( (value[i] <= that.bottomFieldEdge[idx][i]) && ((value[i] + that.blockHeight) >  that.bottomFieldEdge[idx][i])) {
                    isCollision = true;
                }
                
                if ( (value[i] >= that.bottomFieldEdge[idx][i]) && (value[i] < (that.bottomFieldEdge[idx][i] + that.blockHeight))) {
                    isCollision = true;
                }
            }
            
            idx = parseInt(idx);            
            if (idx <= 0 || idx >= that.fieldW * 2) {
                isCollision = true;
            }
        });

        if (!isCollision) {
            var j = 0;
            this.currentElem = tempCurrentElem;

            for (var key in this.currentElem) {
                for (var i = 0; i < this.currentElem[key].length; i++) {
                    this.currentElemLinks[j].style.top = this.currentElem[key][i] + 'px';
                    this.currentElemLinks[j].style.left = key + 'px';
                    j++;
                }
            }
        }
        
        this.playCycle = window.setInterval(function() {
            that.move();
        }, this.speed);        
    }
};

Tetris.prototype.createBlock = function(x,y) {
    var div = document.createElement('div');
    div.className = 'block';
    div.style.left = '120px';
    div.style.top = '0px';

    return div;
};

window.onload = function() {
    var tetris = new Tetris();
    tetris.init();
};
