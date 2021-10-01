class GameBoard {
    constructor(displayController, player1, player2) {
        this.dc = displayController
        this.player1 = player1
        this.player2 = player2
        this.board = ['','','','','','','','','']
        this.container = document.querySelector('#board')
        this.i=0
    }

    createBoard (){

        let turn = 0
        this.dc.updateScores(this.player1, this.player2)

        for (this.i = 0; this.i < 9; this.i++){
            let div = document.createElement('div');
            div.id = `box_${this.i}`
            div.dataset.index = this.i
            this.container.appendChild(div).className = 'tile'
            div.innerHTML = ''
            
            div.addEventListener('click', ()=>{
                if(div.innerHTML === ''){
                    if (turn %2 == 0) {
                        div.innerHTML = this.player1.icon
                        this.board[div.dataset.index] = this.player1.icon
                        if(this._winCheck(this.player1)){
                            this.dc.updateScores(this.player1, this.player2)
                            this.dc.displayWinner(this.player1)
                        }
                    } else {
                        div.innerHTML = this.player2.icon
                        this.board[div.dataset.index] = this.player2.icon
                        if(this._winCheck(this.player2)){
                            this.dc.updateScores(this.player1, this.player2)
                            this.dc.displayWinner(this.player2)
                        }
                    }
                    turn++
                }
            })
        }
        this._createRestartButton(turn)
    }

    _winCheck(player){
        if ((this.board[0] == player.icon && this.board[1] == player.icon && this.board[2] == player.icon) ||
        (this.board[3] == player.icon && this.board[4] == player.icon && this.board[5] == player.icon) ||
        (this.board[6] == player.icon && this.board[7] == player.icon && this.board[8] == player.icon) ||
        (this.board[0] == player.icon && this.board[3] == player.icon && this.board[6] == player.icon) ||
        (this.board[1] == player.icon && this.board[4] == player.icon && this.board[7] == player.icon) ||
        (this.board[2] == player.icon && this.board[5] == player.icon && this.board[8] == player.icon) ||
        (this.board[0] == player.icon && this.board[4] == player.icon && this.board[8] == player.icon) ||
        (this.board[2] == player.icon && this.board[4] == player.icon && this.board[6] == player.icon)) {
            player.score += 1
            return true
        } else if (this.board.slice(0,9) == (0, 9)){
            console.log('Tie Game')
            return false
        }
        return false
        }

    _createRestartButton(turn){
        
        const restartButton = document.getElementById('restart')
        const tiles = document.querySelectorAll('.tile')

        restartButton.addEventListener('click', ()=>{
            tiles.forEach(tile => tile.innerHTML = '')
            this.board = ['','','','','','','','','']
            turn = 0
        })
        
    }

}

const player = (icon) => {

    this.name = `Player ${icon}`
    this.icon = icon
    this.score = 0

    return {icon, name, score}

}

const computer = () => {

    this.name = 'Computer'
    this.icon = 'O'
    this.score = 0

}

const displayController = (function(){

    const _updateScores = function(player1, player2){
        const player1Score = document.getElementById('player1')
        const player2Score = document.getElementById('player2')
        player1Score.innerHTML = `${player1.name} Score: ${player1.score}`
        player2Score.innerHTML = `${player2.name} Score: ${player2.score}`

    }

    const _displayWinner = function(player){
        const body = document.querySelector('#layout')
        const displayScreen = document.createElement('div')
        displayScreen.className = 'winner-display'
        body.appendChild(displayScreen)
        
        const displayText = document.createElement('div')
        displayText.className = 'winner-text'
        displayText.innerHTML = `${player.name} Wins!`
        displayText.addEventListener('click', ()=>{
            body.removeChild(displayScreen)
        })

        displayScreen.appendChild(displayText)
    }

    return{
        displayWinner: _displayWinner,
        updateScores: _updateScores,
    }

})();

function game(){
    let player1 = player('X')
    let player2 = player('O')
    let dc = displayController
    let gameBoard = new GameBoard(dc, player1, player2)
    gameBoard.createBoard()
}
game()