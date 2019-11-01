let p1Selected = false;
let p2Selected = false;

let p1Choice = "";
let p2Choice = "";

let p1Ready = false;
let p2Ready = false;

//compares player choices
function check() {
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

}

//waits for page to load before running
$(document).ready(function () {

    //player one buttons
    $(".play1Btn").on("click", function () {
        //prevents refresh
        event.preventDefault();
        //sets player 1 choice
        p1Choice = $(this).text();
        //player 1 is now ready
        p1Ready = true;
        //console.log("P1" + p1Choice);

        //run check if other player is ready
        if (p2Ready === true) {
            check();
        }

    })

    //player two buttons
    $(".play2Btn").on("click", function () {
        //prevents refresh
        event.preventDefault();
        //sets player 2 choice
        p2Choice = $(this).text();
        //player 2 is now ready
        p2Ready = true;
        //console.log("P2" + p2Choice);

        //run check if other player is ready
        if (p1Ready === true) {
            check();
        }

    })

})
