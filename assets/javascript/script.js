//Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC3xqgeZ7TFBb5SL6UcvKxhAguD4WwG8Yc",
    authDomain: "rockpaperscissors-f8fb3.firebaseapp.com",
    databaseURL: "https://rockpaperscissors-f8fb3.firebaseio.com",
    projectId: "rockpaperscissors-f8fb3",
    storageBucket: "rockpaperscissors-f8fb3.appspot.com",
    messagingSenderId: "621981149435",
    appId: "1:621981149435:web:702709e9e790a2f724685e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//set variable to store database
let database = firebase.database();

//declare global variables
let p1Wins = 0;
let p2Wins = 0;
let ties = 0;
let reset = false;

//join player function
function joinGame(playerid) {

    let myP = "";
    let othrP = "";

    if (playerid === "p1Join") {
        //sets player one true
        p1Select = true;

        //sends info the database
        database.ref().update({
            playerOneSelected: p1Select,
        });

        myP = "#p1Zone";
        othrP = "#p2Zone";

    } else {
        //sets player two true
        p2Select = true;

        //sends info the database
        database.ref().update({
            playerTwoSelected: p2Select,
        });

        myP = "#p2Zone";
        othrP = "#p1Zone";
    }

    //removes other player
    $(othrP).remove();
    //sets your player to full screen
    $(myP).attr("class", "col-12");

    //adds player buttons for user
    const playButtons = `<button class="playBtn" id="rock">ROCK</button>
    <button class="playBtn" id="paper">PAPER</button>
    <button class="playBtn" id="scissors">SCISSORS</button>`
    $(myP + " .btnContainer").append(playButtons);

}

//player buttons function
function playGame(zoneId, rps) {

    if (zoneId === "p1Zone") {
        //sets player 1 choice
        p1Choice = rps;

        //sends info the database
        database.ref().update({
            dbp1Choice: p1Choice,
        });
    } else {
        //sets player 2 choice
        p2Choice = rps;

        //sends info the database
        database.ref().update({
            dbp2Choice: p2Choice
        });
    }

}

//compares player choices
function check(p1Choice, p2Choice) {
    //displays what each player chose
    $("#movesPlayed").text(p1Choice + " VS " + p2Choice);

    if (p1Choice === p2Choice) {
        //there is a tie
        $("#gameState").text("TIE!")
        $(".messageDiv").css("background-color","#abadaf");
        ties++;
        //player one wins, add to win count
    } else if (
        (p1Choice === "ROCK" && p2Choice === "SCISSORS") ||
        (p1Choice === "PAPER" && p2Choice === "ROCK") ||
        (p1Choice === "SCISSORS" && p2Choice === "PAPER")) {
        $("#gameState").text("PLAYER 1 WINS!");
        $(".messageDiv").css("background-color","#dc3545");
        p1Wins++;
    } else {
        //player two wins, add to win count
        $("#gameState").text("PLAYER 2 WINS!");
        $(".messageDiv").css("background-color","#007bff");
        p2Wins++;
    }

    //resets player choices in database and updates wins/tie count
    database.ref().update({
        dbp1Choice: "",
        dbp2Choice: "",
        p1WinCount: p1Wins,
        p2WinCount: p2Wins,
        tieCount: ties
    });

}

//resets the page
function pageReset() {
    //clears messages
    $("#movesPlayed").text('');
    $("#gameState").text('');
    $(".messageDiv").css("background-color","#abadaf");

    //adds original buttons back in
    $("#playArea").empty();
    const origButtons = `<div class="col-6" id="p1Zone">
            <h2>PLAYER 1</h2>
            <div class="btnContainer">
                <button class="joinBtn" id="p1Join">JOIN GAME</button>
            </div></div>
        <div class="col-6" id="p2Zone">
            <h2>PLAYER 2</h2>
            <div class="btnContainer">
                <button class="joinBtn" id="p2Join">JOIN GAME</button></div></div>`
    $("#playArea").append(origButtons);


    //resets variables in the database
    database.ref().set({
        playerOneSelected: false,
        playerTwoSelected: false,
        dbp1Choice: "",
        dbp2Choice: "",
        p1WinCount: 0,
        p2WinCount: 0,
        tieCount: 0,
        resetState: false
    });


}

//waits for page to load before running
$(document).ready(function () {

    //updates page with value changes
    database.ref().on("value", function (snapshot) {

        //sets variables from database
        p1Select = snapshot.val().playerOneSelected;
        p2Select = snapshot.val().playerTwoSelected;
        p1Choice = snapshot.val().dbp1Choice;
        p2Choice = snapshot.val().dbp2Choice;
        p1Wins = snapshot.val().p1WinCount;
        p2Wins = snapshot.val().p2WinCount;
        ties = snapshot.val().tieCount;
        reset = snapshot.val().resetState;

        if (p1Select === true) {
            //removes join button
            $("#p1Join").remove();
        }

        if (p2Select === true) {
            //removes join button
            $("#p2Join").remove();
        }

        //runs check if both players chose
        if ((p1Choice !== "") && (p2Choice !== "")) {
            check(p1Choice, p2Choice);
        }

        if (reset === true) {
            //runs reset
            pageReset();
        }

        //updates game stats display
        $("#p1WinsText").text(p1Wins);
        $("#p2WinsText").text(p2Wins);
        $("#tiesText").text(ties);

        //firebase error message
    }, function (errorObject) {

        //Prints error
        console.log("The read failed: " + errorObject.code);
    });

    //player one chooses to join the game
    $(document).on("click", ".joinBtn", function () {

        //retrieves player chosen from id
        playerid = $(this).attr("id");
        joinGame(playerid);

    })

    //player buttons
    $(document).on("click", ".playBtn", function () {

        //prevents refresh
        event.preventDefault();

        //detects which player it is
        let currentZone = $(this).get(0).parentNode.parentNode;
        let zoneId = $(currentZone).attr("id");
        let rps = $(this).text();

        //runs gameplay
        playGame(zoneId, rps);

    })

    //reset button
    $("#resetBtn").on("click", function () {
        //prevents refresh
        event.preventDefault();

        //sends info the database
        database.ref().update({
            resetState: true
        });

    })


})
