const Point = function (X, Y) {
    this.X = X
    this.Y = Y
}

const Rectangle = function (point, row, column) {
    this.P1 = point
    this.P2 = new Point(point.X + squareLength, point.Y)
    this.P3 = new Point(this.P2.X, this.P2.Y + squareLength)
    this.P4 = new Point(this.P3.X - squareLength, this.P3.Y)
    
    this.row = row
    this.column = column

    this.value = ''
}

Rectangle.prototype.within = function within(point) {
    if (point.X >= this.P1.X && point.X <= this.P2.X && point.Y >= this.P1.Y && point.Y <= this.P4.Y) {
        return true;
    }
    return false;
}

Rectangle.prototype.centre = function () {
    return new Point((this.P2.X - this.P1.X) / 2, (this.P4.Y - this.P1.Y) / 2)
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
let rectanglesList = []
const score = new Array(8).fill(0) /* 2*N+2, N=3  */

canvas.addEventListener('click', (event) => {

    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left
    let y = event.clientY - rect.top
    let mousePoint = new Point(x, y)
    let selectedRect = rectanglesList.find((e) => e.within(mousePoint))

    if (selectedRect.value === '') {
        score[selectedRect.row]++
        score[selectedRect.column + 3]++ /* N */
        if (selectedRect.row == selectedRect.column) {
            score[2 * 3]++
        }
        if (3 - 1 - selectedRect.column == selectedRect.row) {
            score[2 * 3 + 1]++
        }

        selectedRect.value = 'x'
        ctx.font = '50px sans'
        ctx.fillText('X', selectedRect.P1.X + (squareLength / 3), selectedRect.P4.Y - (squareLength / 3))

    }

    while (true) {
        selectedRect = rectanglesList[getRandomInt(0, 8)]
        if (selectedRect.value === '') {

            score[selectedRect.row]--
            score[selectedRect.column + 3]-- /* N */
            if (selectedRect.row == selectedRect.column) {
                score[2 * 3]--
            }
            if (3 - 1 - selectedRect.column == selectedRect.row) {
                score[2 * 3 + 1]--
            }

            selectedRect.value = 'o'
            ctx.font = '50px sans'
            ctx.fillText('O', selectedRect.P1.X + (squareLength / 3), selectedRect.P4.Y - (squareLength / 3))

            break
        }
    }

    if (score.find(e => e == 3)) {
        alert("You win!")
    } else if (score.find(e => e == -3)) {
       alert("You lost :(")
    }

    // console.log(score)

})

const canvasWidth = canvas.width
const canvasHeight = canvas.height

const squareLength = canvasWidth / 3

for (let column = 0; column < 3; column++) {
    for (let row = 0; row < 3; row++) {
        rectanglesList.push(
            new Rectangle(new Point(squareLength * row, squareLength * column), row, column))
    }
}

// console.log(rectanglesList)

ctx.strokeStyle = '#000000'
ctx.strokeRect(squareLength, 0, squareLength, canvasHeight)
ctx.strokeRect(0, squareLength, canvasWidth, squareLength)