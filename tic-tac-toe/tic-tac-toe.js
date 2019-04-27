/*
Copyright (C) 2019 Ahmed Khaled <nemoload@aol.com> - All Rights Reserved
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const Point = function (X, Y) {
    this.X = X
    this.Y = Y
}

const Square = function (point, length, row, column) {
    /* Top Left*/
    this.P1 = point

    /* Top Right */
    this.P2 = new Point(point.X + length, point.Y)

    /* Bottom Right */
    this.P3 = new Point(this.P2.X, this.P2.Y + length)

    /* Botto, Left */
    this.P4 = new Point(this.P3.X - length, this.P3.Y)

    this.row = row
    this.column = column

    this.value = ''
}

Square.prototype.within = function within(point) {
    if (point.X >= this.P1.X && point.X <= this.P2.X && point.Y >= this.P1.Y && point.Y <= this.P4.Y) {
        return true;
    }
    return false;
}

Square.prototype.isEmpty = function isEmpty() {
    return this.value === '' ? true : false
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

const Game = (function () {
    let instance
    let gameState

    function init() {
        const canvas = document.getElementById('game')
        const ctx = canvas.getContext('2d')

        const score = new Array(8).fill(0) /* 2*N+2, N=3  */
        const SquaresList = []

        const canvasWidth = canvas.width
        const canvasHeight = canvas.height
        const squareLength = canvasWidth / 3

        const xScorePoint = 1
        const oScorePoint = -1

        const win = Symbol('win')
        const lost = Symbol('lost')
        const draw = Symbol('draw')

        drawGrid = () => {
            ctx.strokeStyle = '#000000'
            ctx.strokeRect(squareLength, 0, squareLength, canvasHeight)
            ctx.strokeRect(0, squareLength, canvasWidth, squareLength)
        }

        createGrid = () => {
            for (let column = 0; column < 3; column++) {
                for (let row = 0; row < 3; row++) {
                    SquaresList.push(
                        new Square(new Point(squareLength * row, squareLength * column), squareLength, row, column))
                }
            }
            drawGrid()
        }

        function addScore(scorePoint, selectedSquare) {
            score[selectedSquare.row] += scorePoint
            score[selectedSquare.column + 3] += scorePoint /* N */
            if (selectedSquare.row == selectedSquare.column) {
                score[2 * 3] += scorePoint
            }
            if (3 - 1 - selectedSquare.column == selectedSquare.row) {
                score[2 * 3 + 1] += scorePoint
            }

        }

        function drawTextShape(shape, selectedSquare) {
            selectedSquare.value = shape
            ctx.font = '50px sans'
            ctx.fillText(shape, selectedSquare.P1.X + (squareLength / 3), selectedSquare.P4.Y - (squareLength / 3))
        }

        function checkGameState() {
            if (gameState === undefined) {
                if (score.find(e => e == 3)) {
                    gameState = win
                    alert("You win!")
                } else if (score.find(e => e == -3)) {
                    gameState = lost
                    alert("You lost :(")
                }
            }
        }

        function computerPlay() {
            while (true) {
                selectedSquare = SquaresList[getRandomInt(0, 8)]
                if (SquaresList.find(e => e.value === '') === undefined) {
                    if (gameState === undefined) {
                        alert('Looks like a draw.')
                        gameState = draw
                    }
                    break
                } else if (selectedSquare.isEmpty()) {
                    addScore(oScorePoint, selectedSquare)
                    drawTextShape('O', selectedSquare)
                    break
                }
            }
        }

        function gameLogic(event) {

            let rect = canvas.getBoundingClientRect();
            let x = event.clientX - rect.left
            let y = event.clientY - rect.top

            let mousePoint = new Point(x, y)

            let selectedSquare = SquaresList.find((e) => e.within(mousePoint))
            if (selectedSquare.isEmpty()) {
                addScore(xScorePoint, selectedSquare)
                drawTextShape('X', selectedSquare)
                checkGameState()
                computerPlay()
                checkGameState()
                console.log(SquaresList)
            }
        }

        createGrid()
        canvas.addEventListener('click', gameLogic)
    }

    return {
        createGame: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    }
})()

Game.createGame()