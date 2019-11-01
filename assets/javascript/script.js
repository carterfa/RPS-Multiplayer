let p1Selected = false;
let p2Selected = false;

let p1Choice = "";
let p2Choice = "";

let p1Ready = false;
let p2Ready = false;

//compares player choices
function check(){
    console.log("rungame");

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
        console.log("P1"+p1Choice);

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
        console.log("P2"+p2Choice);

        //run check if other player is ready
        if (p1Ready === true) {
            check();
        }

    })

})
