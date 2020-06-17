//JAVASCRIPT
var markers = ["", ""];
var turn = 0;
var players = [];
var totals = [];
var winArray = [7, 56, 73, 84, 146, 273, 292, 448];
var playerOneScore = 0;
var playerTwoScore = 0;
var catScore = 0;
var gameOver;

function getPlayerNames() {
    players[0] = document.getElementById("player-one").value;
    players[1] = document.getElementById("player-two").value;
    document.getElementById("form-player").className = "hide";
    showPlayerMarkers();
}
function getGameBoard() {
    document.getElementById("form-marker").className = "hide";
    document.getElementById("game-board").className = "show";
    document.getElementById("first-name").innerText = players[0];
    document.getElementById("sec-name").innerText = players[1];
    document.getElementById("score-board").className = "show";
    startGame();

}
function startGame() {
    totals = [0, 0];
    gameOver = false;
    document.getElementById("message").innerText = players[turn] + "'s Turn";
}
function playGame(clickedDiv, divValue) {
    if(!gameOver) {
    //add icon to playing field
        clickedDiv.innerHTML = "<img src='" + markers[turn] + "'>";
        totals[turn] += divValue;
        if (isWin()) {
            if (turn == 0) {
                playerOneScore++; 
                document.getElementById("score-one").innerText = playerOneScore;
            }
            else {
                playerTwoScore++;
                document.getElementById("score-two").innerText = playerTwoScore;
            }
            document.getElementById("message").innerText = players[turn] + " WON!";
            document.getElementById("play-btn").className = "show";

        }
        else if (gameOver) {
            catScore++;
            document.getElementById("message").innerText = "CATS GAME!";
            document.getElementById("score-cat").innerText = catScore;
            document.getElementById("play-btn").className = "show";
        }
        else {
            changeTurn();
            //prevent clicking on same div again
            clickedDiv.attributes["1"].nodeValue = "";
            //update message
            document.getElementById("message").innerText = players[turn] + "'s Turn";
        }
    }
}
function isWin() {
    for (i = 0; i < winArray.length; i++) {
        if ((totals[turn] & winArray[i]) == winArray[i]) {
            gameOver = true;
            return true;
        }
    }
    if (totals[0] + totals[1] == 511) {
        gameOver = true;
    }
}
function resetGame() {
    //document.getElementById("game-board").className = "hide";
    //showPlayerMarkers();
    changeTurn();
    startGame();
    var els = document.getElementsByClassName("marker-sqr");
    var count = 1;
    for (var i = 0; i < els.length; i++) {
        els[i].innerHTML = "<img src='img/blank.png'>";
        els[i].attributes["1"].nodeValue = "playGame(this, " + count + ")";
        count *= 2;
    }
}
function showPlayerMarkers() {
    displayMarkerPrompt();
    document.getElementById("form-marker").className = "show";
}
function pickMarker(icon) {
    markers[turn] = icon.attributes.src.nodeValue; 
    icon.className = "chosen";
    icon.attributes["2"].nodeValue = "";
    changeTurn();
    if (markers[1] == "") {
        displayMarkerPrompt();
    }
    //after two have been selected continue btn appears and the rest of the icons become unclickable
    if (markers[0] != "" && markers[1] != "") {
        document.getElementById("prompt").innerText =  "Lets Play!";
        document.getElementById("btn-cont").className = "show";
        //makes all unchosen buttons unclickable after both players have selected 
        var els = document.getElementsByClassName("avail");
        for (var i = 0; i < els.length; i++) {
            els[i].attributes.removeNamedItem("onclick");
        }
    }

}
function displayMarkerPrompt() {
        document.getElementById("prompt").innerText =  players[turn] + " Choose Your Marker";
}
function changeTurn() {
    if (turn == 1) turn = 0; else turn = 1;
}
