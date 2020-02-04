(function() {
    var currentPlayer = "player1";
    var foundEmptySlot;
    var slots = $(".slot");
    var modalBox = $("#modal-box");

    // there are 24 sets of winning combinations(4 slots with the same class);
    // var winningCombos = [
    //     [slots.eq(0), slots.eq(7), slots.eq(14), slots.eq(21)],
    //     [slots.eq(1), slots.eq(8), slots.eq(15), slots.eq(22)],
    //     [slots.eq(2), slots.eq(9), slots.eq(16), slots.eq(23)],
    //     [slots.eq(3), slots.eq(8), slots.eq(13), slots.eq(18)],
    //     [slots.eq(4), slots.eq(9), slots.eq(14), slots.eq(19)],
    //     [slots.eq(5), slots.eq(10), slots.eq(15), slots.eq(20)],
    //     [slots.eq(6), slots.eq(13), slots.eq(20), slots.eq(27)],
    //     [slots.eq(7), slots.eq(14), slots.eq(21), slots.eq(26)],
    //     [slots.eq(8), slots.eq(15), slots.eq(22), slots.eq(29)],
    //     [slots.eq(9), slots.eq(14), slots.eq(19), slots.eq(24)],
    //     [slots.eq(10), slots.eq(15), slots.eq(20), slots.eq(25)],
    //     [slots.eq(11), slots.eq(16), slots.eq(21), slots.eq(26)],
    //     [slots.eq(12), slots.eq(19), slots.eq(26), slots.eq(33)],
    //     [slots.eq(13), slots.eq(20), slots.eq(27), slots.eq(34)],
    //     [slots.eq(14), slots.eq(21), slots.eq(28), slots.eq(35)],
    //     [slots.eq(15), slots.eq(20), slots.eq(25), slots.eq(30)],
    //     [slots.eq(16), slots.eq(21), slots.eq(26), slots.eq(31)],
    //     [slots.eq(17), slots.eq(22), slots.eq(27), slots.eq(32)],
    //     [slots.eq(18), slots.eq(25), slots.eq(32), slots.eq(39)],
    //     [slots.eq(19), slots.eq(26), slots.eq(33), slots.eq(40)],
    //     [slots.eq(20), slots.eq(27), slots.eq(34), slots.eq(41)],
    //     [slots.eq(21), slots.eq(26), slots.eq(31), slots.eq(36)],
    //     [slots.eq(22), slots.eq(27), slots.eq(32), slots.eq(37)],
    //     [slots.eq(23), slots.eq(28), slots.eq(33), slots.eq(38)]
    // ];

    var winningCombos = [
        [0, 7, 14, 21],
        [1, 8, 15, 22],
        [2, 9, 16, 23],
        [3, 8, 13, 18],
        [4, 9, 14, 19],
        [5, 10, 15, 20],
        [6, 13, 20, 27],
        [7, 14, 21, 28],
        [8, 15, 22, 29],
        [9, 14, 19, 24],
        [10, 15, 20, 25],
        [11, 16, 21, 26],
        [12, 19, 26, 33],
        [13, 20, 27, 34],
        [14, 21, 28, 35],
        [15, 20, 25, 30],
        [16, 21, 26, 31],
        [17, 22, 27, 32],
        [18, 25, 32, 39],
        [19, 26, 33, 40],
        [20, 27, 34, 41],
        [21, 26, 31, 36],
        [22, 27, 32, 37],
        [23, 28, 33, 38]
    ];
    console.log(winningCombos);

    $(".column").on("click", function(e) {
        var col = $(e.currentTarget);
        // console.log(col);
        var slotsInCol = col.children(); // col.find(".slot"); these are all the slots
        for (var i = 5; i >= 0; i--) {
            // we want to check if one of the slots in the column we clicked on already has a player class
            if (
                !slotsInCol.eq(i).hasClass("player1") &&
                !slotsInCol.eq(i).hasClass("player2")
            ) {
                foundEmptySlot = true;
                //if the slot is empty we add currentPlayer class to slot
                slotsInCol.eq(i).addClass(currentPlayer);
                break;
            }
        }
        // if the slot isn't empty we return nothing
        if (!foundEmptySlot) {
            return;
        }

        var slotsInRow = $(".row" + i);

        // we check for Victory horizontally and vertically, and finally diagonally;
        if (checkVictory(slotsInCol)) {
            celebrateVictory();
        } else if (checkVictory(slotsInRow)) {
            celebrateVictory();
        } else if (checkDiagonalWin()) {
            celebrateVictory();
        } else {
            changePlayer();
        }

        // we will be interested in which slot has the currentPlayer
        // i is the index of the row we need to check for victory
    });

    function checkVictory(slots) {
        var count = 0;
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                count++;
                // we want to check if there are 4 slots with the same player class
                if (count === 4) {
                    return true;
                }
            } else {
                count = 0;
            }
        }
    }

    // check diagonal victory
    function checkDiagonalWin() {
        for (var i = 0; i < winningCombos.length; i++) {
            var count = 0;
            // console.log(count);

            for (var y = 0; y < winningCombos[i].length; y++) {
                if (slots.eq(winningCombos[i][y]).hasClass(currentPlayer)) {
                    // it prints out the slot we cliked on
                    console.log(winningCombos[i][y]);
                    // we continue counting
                    count++;
                }
                // we are counting how many slots from the winningCombo arrays have
                // been already targeted and once it finds a match of 4 we finish the loop;
                if (count >= 4) {
                    // we want to get to each item in the array
                    // and assign a new class to the winning combination slots
                    winningCombos[i].forEach(function(indx) {
                        slots.eq(indx).css({
                            transition: "background-color 300ms ease-in-out 1s",
                            "background-color": "red"
                        });
                    });
                    return true;
                }
            }
        }
    }

    function celebrateVictory() {
        if (currentPlayer == "player1") {
            slots.addClass("winner");
            $(".message")
                .html(
                    "<p>On your knees<br>now<br>Because you'll<br>only<br>suffer more!!!"
                )
                // "<p>WINNER:<br>THEE<br>OH<br>SEES</p>")
                .css({
                    "font-family": "Monoton",
                    "font-size": "60px",
                    color: "red"
                });
            $(".oh-sees").addClass("on");
            $(".songJ").addClass("on");
            $(".player1-img").addClass("on");
            setTimeout(showModal, 1000);
        } else {
            slots.css({
                "background-image": "url(assets/king-logo.png)",
                "background-size": "100% 85px"
            });
            $(".message")
                .html(
                    // "<p>WINNER:<br>KING GIZZARD<br>AND<br>THE LIZARD WIZARD</p>"
                    "<p>The operation<br>has begun<br>There is no<br> Planet B!!!</p>"
                )
                .css({
                    "font-family": "Metal Mania",
                    "font-size": "80px"
                });
            $(".king-gizz").addClass("on");
            $(".songS").addClass("on");
            setTimeout(showModal, 1000);
        }
    }

    function changePlayer() {
        if (currentPlayer == "player1") {
            currentPlayer = "player2";
            $(".imageK").addClass("on");
            $(".imageJ").removeClass("on");
            $(".king-gizz").addClass("on");
            $(".oh-sees").removeClass("on");
            $(".player2-img").addClass("on");
            $(".player1-img").removeClass("on");
        } else {
            currentPlayer = "player1";
            $(".imageJ").addClass("on");
            $(".imageK").removeClass("on");
            $(".oh-sees").addClass("on");
            $(".king-gizz").removeClass("on");
            $(".player1-img").addClass("on");
            $(".player2-img").removeClass("on");
        }

        $(".separate").addClass("on");
    }

    function showModal() {
        modalBox.show();
    }

    $(".button").on("click", function() {
        modalBox.hide();
        window.location.reload();
    });
})();
