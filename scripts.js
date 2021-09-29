function game(){

    const player1 = player('X')
    const player2 = player('O')
    gameBoard.createBoard(player1, player2)

}

const gameBoard = (function(){

    const container = document.querySelector('#board')
    const board = ['','','','','','','','','']
    

    function _createBoard (player1, player2){
        let turn = 0
        displayController.displayScore(player1, player2)

        for (i = 0; i < 9; i++){
            let div = document.createElement('div');
            div.id = `box_${i}`
            div.dataset.index = i
            container.appendChild(div).className = 'tile'
            div.innerHTML = ''
            
            div.addEventListener('click', ()=>{
                if(div.innerHTML === ''){
                    if (turn %2 == 0) {
                        div.innerHTML = player1.icon
                        board[div.dataset.index] = player1.icon
                        if(_winCheck(player1)){
                            displayController.displayScore(player1,player2)
                        }
                        console.log(turn)
                    } else {
                        div.innerHTML = player2.icon
                        board[div.dataset.index] = player2.icon
                        if(_winCheck(player2)){
                            displayController.displayScore(player1,player2)
                        }
                    }
                    turn++
                }
            })
        }
        _restartBoard(turn)
    }

    function _winCheck(player){
        if (board[0] == player.icon && board[1] == player.icon && board[2] == player.icon){
            player.score +=1
            displayController.displayWinner(player)
        }
        else if (board[3] == player.icon && board[4] == player.icon && board[5] == player.icon){
            player.score +=1
            displayController.displayWinner(player)
        }
        else if (board[6] == player.icon && board[7] == player.icon && board[8] == player.icon){
            player.score +=1
            displayController.displayWinner(player)
        }
        else if (board[0] == player.icon && board[3] ==player.icon && board[6] == player.icon){
            player.score +=1
            displayController.displayWinner(player)
        }
        else if (board[1] == player.icon && board[4] == player.icon && board[7] == player.icon){
            player.score +=1
            displayController.displayWinner(player)
        }
        else if (board[2] == player.icon && board[5] == player.icon && board[8] == player.icon){
            player.score +=1
            displayController.displayWinner(player)
        }
        else if (board[0] == player.icon && board[4] == player.icon && board[8] == player.icon){
            player.score +=1
            displayController.displayWinner(player)
        }
        else if (board[2] == player.icon && board[4] == player.icon && board[6] == player.icon){
            player.score +=1
            displayController.displayWinner(player)
        }
        else if (board.slice(0,9) == (0, 9)){
            console.log('Tie Game')}
        return player.score
        }

    function _restartBoard(turn){
        
        const restartButton = document.getElementById('restart')
        const tiles = document.querySelectorAll('.tile')

        restartButton.addEventListener('click', ()=>{
            tiles.forEach(tile => tile.innerHTML = '')
            board.forEach(function(item, index){
                this[index]=''
            }, board)
            console.log(turn)
            return turn = 0
        })
        
    }

    return{
        createBoard: _createBoard,
        board: board,
    }

})();

const player = (icon) => {

    this.name = `Player ${icon}`
    this.icon = icon
    this.score = 0

    return {icon, name, score}

}

const displayController = (function(){

    const _displayScore = function(player1, player2){
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

        displayScreen.appendChild(displayText)

    }

    const _removeDisplay = function (){
        const body = document.querySelector('#layout')
        const displayScreen = document.createElement('div')
        const displayText = document.createElement('div')

        body.addEventListener('click', ()=>{
            displayScreen.removeChild(displayText)
            body.removeChild(displayScreen)
        })
    }

    return{
        displayWinner: _displayWinner,
        displayScore: _displayScore,
        removeDisplay: _removeDisplay
    }

})();

game()