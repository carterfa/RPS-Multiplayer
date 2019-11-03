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

//compares player choices
function check(p1Choice, p2Choice) {
    //displays what each player chose
    $("#message1").text(p1Choice + " VS " + p2Choice);

    if (p1Choice === p2Choice) {
        //there is a tie
        $("#message2").text("TIE!")
        //player one wins
    } else if (
        (p1Choice === "ROCK" && p2Choice === "SCISSORS") ||
        (p1Choice === "PAPER" && p2Choice === "ROCK") ||
        (p1Choice === "SCISSORS" && p2Choice === "PAPER")) {
        $("#message2").text("PLAYER 1 WINS!");
    } else {
        //player two wins
        $("#message2").text("PLAYER 2 WINS!");
    }

    //resets player choices in database
    p1Choice = "";
    p2Choice = "";

    database.ref().update({
        dbp1Choice: p1Choice,
        dbp2Choice: p2Choice
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

        //firebase error message
    }, function (errorObject) {

        //Prints error
        console.log("The read failed: " + errorObject.code);
    });

    //player one chooses to join the game
    $(document).on("click", "#p1Join", function () {
        //sets player one true
        p1Select = true;

        //removes other player
        $("#p2Zone").remove()

        //sends info the database
        database.ref().update({
            playerOneSelected: p1Select,
        });

        //adds player one buttons to user
        const playerOneButtons = `<button class="play1Btn" id="p1Rock">ROCK</button>
        <button class="play1Btn" id="p1Paper">PAPER</button>
        <button class="play1Btn" id="p1Scissors">SCISSORS</button>`
        $("#p1Zone .btnContainer").append(playerOneButtons);
    })

    //player two chooses to join the game
    $(document).on("click", "#p2Join", function () {
        //sets player one true
        p2Select = true;

        //removes other player
        $("#p1Zone").remove()

        //sends info the database
        database.ref().update({
            playerTwoSelected: p2Select,
        });

        //adds player one buttons to user
        const playerTwoButtons = `<button class="play2Btn" id="p2Rock">ROCK</button>
        <button class="play2Btn" id="p2Paper">PAPER</button>
        <button class="play2Btn" id="p2Scissors">SCISSORS</button>`
        $("#p2Zone .btnContainer").append(playerTwoButtons);
    })


    //player one buttons
    $(document).on("click", ".play1Btn", function () {
        //prevents refresh
        event.preventDefault();

        //sets player 1 choice
        p1Choice = $(this).text();

        //sends info the database
        database.ref().update({
            dbp1Choice: p1Choice,
        });

        //console.log("P1" + p1Choice);

    })

    //player two buttons
    $(document).on("click", ".play2Btn", function () {
        //prevents refresh
        event.preventDefault();

        //sets player 2 choice
        p2Choice = $(this).text();

        //sends info the database
        database.ref().update({
            dbp2Choice: p2Choice
        });


        //console.log("P2" + p2Choice);

    })

    //reset button
    $("#resetBtn").on("click", function () {
        //prevents refresh
        event.preventDefault();

        //resets variables
        p1Select = false;
        p2Select = false;
        p1Choice = "";
        p2Choice = "";

        //sends info to the database
        database.ref().set({
            playerOneSelected: p1Select,
            playerTwoSelected: p2Select,
            dbp1Choice: p1Choice,
            dbp2Choice: p2Choice
        });

    })

    //run fight
    $("#fightBtn").on("click", function () {
        //prevents refresh
        event.preventDefault();


    })


})
