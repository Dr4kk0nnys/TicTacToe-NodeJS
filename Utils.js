let field = new Array(9)

exports.DrawFakeField = function (){ // It will create a random " player " for every element of the array ( it'll simulate a full board )
    let players = ["X", "O"]

    for(let i = 0; i < 9; i++){
        field[i] = players[Math.floor(Math.random() * players.length)]
    }
}

exports.CreateField = function (){
    for(let i = 0; i < field.length; i++){
        field[i] = " "
    }
}

function ShowField(){ // It shows the field already formated ( note that the field doesn't look like that since it's a one row/line array )
    let three  = 0;
    for(let i = 0; i < 3; i++){
        let table = "";
    
        for(let j = three; j < (three + 3); j++){
            table += field[j]
            if(j != 2 && j != 5 && j != 8   ) { table += " | " }
        }
        console.log(table)
        three += 3
    }
    console.log("")
}

function IsPositionAvailable(pos) {
    if(field[pos] == " ") { return true }
    else { return false }
}

function PlayAtPosition (pos, player){
    let play = ""
    if(player % 2 == 0) { play = "X" }
    else { play = "O" }

    if(IsPositionAvailable(pos)) { field[pos] = play } // If there's nothing
    else { console.log("Position unavailable") }
}

function CheckGame(play){ // It checks every possibility, for every player, and also checks if it's possible to lose
    if(play % 2 == 0) { player = "X"}
    else { player = "O" }

    let line = 0, win = 0, vertical = 0

    for(let i = 0; i < 3; i++){ // Horizontal    [ 0, 1, 2 ], [ 3, 4, 5 ], [ 6, 7, 8 ]
        for(let j = 0; j < 3; j++){
            if(field[line] == player) { win++ }
            line++

            if(win >= 3) { return true }
        }
        win = 0
    }

    for(let i = 0; i < 3; i++){ // Vertical      [ 0, 3, 6 ], [ 1, 4, 7 ], [ 2, 5, 8 ]
        line = vertical
        for(let j = 0; j < 3; j++){
            if(field[line] == player) { win++ }
            line += 3

            if(win >= 3) { return true }
        }
        vertical++
        win = 0
    }

    if(field[0]  == player && field[4] == player && field[8] == player){ return true } //  Crossed [ 0, 4, 8 ], [ 2, 4, 6]
    if(field[2]  == player && field[4] == player && field[6] == player){ return true }

    for(let i = 0; i < 9; i++){ // Checks if the game should end
        if(field[i] == " ") { return } // If in the entire field, there's none free space left, it won't return
    }
    GameOver() // Then this line'll be executed!
}

function GameOver() {
    console.log("GAME OVER!!! NO ONE WON !!!")
    process.exit()
}

exports.GetUserInput = function (){ // Not only gets the user input, but also is the game core
    console.log("[ 1 ~ 9 ]")
    let play = 0
    process.stdin.on("data", (position) => {
        if(IsPositionAvailable(position -1)) { PlayAtPosition(position -1, play) }
        else { console.log("Invalid Play!") }

        ShowField()
        if(CheckGame(play++)){
            console.log("Game ENDED!!!")
            process.exit()
        }
    })
}
// Sup, so ... I'm writting this at 22:05 and i'm stuck on the user input part, and there's a lot of stuff left
// 06:21 All done! I woke up at 3:00 am basically ...