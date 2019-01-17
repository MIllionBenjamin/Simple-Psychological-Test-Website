$(document).ready(function () {
    var rule = "             1.本游戏为投币游戏，共4名玩家共同参加。\n\
            2.游戏中设有一个虚拟的金币池，每名玩家均拥有25枚金币。在每一轮游戏中，玩家可以决定是否向金币池内投币。\n\
            3.游戏规则：当且仅当4名玩家中有3名玩家选择投币（即金币池内有3枚金币）时，选择投币的3名玩家各获得1分，并且可以取回所投金币；其余情况所有玩家既不得分，也不能取回金币。（游戏中可随时查看游戏规则）\n\
            4.每一轮游戏中，您可通过点击按钮 “0” 或 “1” 决定是否投币（1表示投币，0表示不投币）。当所有玩家选择完毕，屏幕会呈现所有玩家的选择，等待5s之后，可以进行下一轮选择。\n\
            5.游戏共有50轮。但若游戏中任一玩家用完所有金币，则游戏提前结束。\n\
            6.实验所得被试费与金币数无关，由游戏得分决定，得分越高，被试费越多。\n\
            Tips：本游戏为团体游戏，关注其他玩家的选择将有助于你更好地完成游戏。";
    var whetherOver = 0;
    var player_number = 0;
    var round = -1;
    var pc = [3];
    gameStart();

    $("body").children().hide();
    $("form").show();
    $("form").children().hide();
    $("#testID").show();
    $("#continue").show(); 
    $("#search").show();

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function getData() {
        $("#P1").val($("#player_1").find(".choice").html());
        $("#P2").val($("#player_2").find(".choice").html());
        $("#P3").val($("#player_3").find(".choice").html());
        $("#P4").val($("#player_4").find(".choice").html());
        $("#User").val($(".me").attr('id'));
        $("#roundNum").val(round);
    }

    $("#yes").on("click", function() {
        if($(this).hasClass("disabled")) return;
        $("#buttons").children().addClass("disabled");
        $(".me").find(".coin").html(parseInt($(".me").find(".coin").html())-1);
        $(".me").find(".choice").html("1");
        $("#gameInfo").html("等待其他玩家决定");
        var delay = Math.random()*3000;
        setTimeout(calculate, delay);
    });

    $("#no").on("click", function() {
        if($(this).hasClass("disabled")) return;
        $("#buttons").children().addClass("disabled");
        $(".me").find(".choice").html("0");
        $("#gameInfo").html("等待其他玩家决定");
        var delay = Math.random()*3000;
        setTimeout(calculate, delay); 
    });

    $("#continue").on("click", async function() {
        if($("#testID").val() == "") {
            alert("请输入正确的实验编号");
            return;
        }
        if(!$("#testID").val().toString().match(/^\d{3}$/)) {
            alert("请输入正确的实验编号");
            return;
        }

        if(round == -1) {
            getData();
            console.log(round);
            round++;
            $("#search").html("匹配中...");
            await sleep(Math.random()*2000 + 6000);
            $("body").children().show();
            $("form").children().hide();
            $("iframe").hide();
            $("#search").hide();
        }

        console.log("continue" + "Me " + $(".me").find(".choice").html() +
                                 " testID " + $("#testID").val() + 
                                 " P1 " + $("#P1").val() + 
                                 " P2 " + $("#P2").val() + 
                                 " P3 " + $("#P3").val() + 
                                 " P4 " + $("#P4").val() +
                                 " User " + $("#User").val() + 
                                 " roundNum " + $("#roundNum").val());

        
    });

    $("#rule").on("click", function() {
        alert(rule);
    });

    async function calculate() {
        pc_chose();
        var count = 0;
        for(var i = 0; i < 4; i++) {
            if($(".player").eq(i).find(".choice").html() == "1") count++;
        }
        if(count == 3) {
            for(var i = 0; i < 4; i++) {
                if($(".player").eq(i).find(".choice").html() == "1") {
                    $(".player").eq(i).find(".coin").html(parseInt($(".player").eq(i).find(".coin").html()) + 1);
                    $(".player").eq(i).find(".score").html(parseInt($(".player").eq(i).find(".score").html()) + 1);
                }
            }
        }
        round++;
        $("#round").html(round);
        $("#coin").html($(".me").find(".coin").html());
        $("#score").html($(".me").find(".score").html());
        getData();
        $("#continue").click();
        if(round == 50) {
            gameOver();
            return;
        }
        for(var i = 0; i < 4; i++) {
            if($(".player").eq(i).find(".coin").html() == "0") {
                gameOver();
                return;
            }
        }
        await sleep(5000);
        $(".choice").html("");
        $("#gameInfo").html("请选择是否投币");
        $("#buttons").children().removeClass("disabled");
    }

    function gameStart() {
        round = -1;
        player_number = Math.floor(Math.random()*4 + 1);
        $(".player").eq(player_number-1).addClass("me");
        for(var i = 0, j = 0; i < 4; i++) {
            if(i != player_number - 1) {
                pc[j] = $(".player").eq(i);
                j++;
            }
        }
        pc.sort(function() {
            0.5 - Math.random();
        });
        $(".coin").hide();
        $(".score").hide();
        $("#buttons").children().removeClass("disabled");
        $("#playerNumber").html("你是玩家" + player_number);
        alert(rule);
    }

    function pc_chose() {
        if((round + 1) % 4 == 0) pc[0].find(".choice").html("0");
        else {
            pc[0].find(".choice").html("1");
            pc[0].find(".coin").html(parseInt(pc[0].find(".coin").html())-1);
        }
        if((round + 2) % 4 == 0) pc[1].find(".choice").html("0");
        else {
            pc[1].find(".choice").html("1");
            pc[1].find(".coin").html(parseInt(pc[1].find(".coin").html())-1);
        }
        if(Math.random() >= 0.5) pc[2].find(".choice").html("0");
        else {
            pc[2].find(".choice").html("1");
            pc[2].find(".coin").html(parseInt(pc[2].find(".coin").html())-1);
        }
    }

    async function gameOver() {
        getData();
        $("#continue").click();
        await sleep(500);
        whetherOver = 1;
        $("#buttons").children().hide();
        gameOverCoin();
        await sleep(500);
        console.log("Coin here");
        gameOverScore();
        $("#gameInfo").html("游戏结束！");
    }

    function gameOverCoin() {
        $("#roundNum").val("Over!Coins");
        $("#P1").val($("#player_1").find(".coin").html());
        $("#P2").val($("#player_2").find(".coin").html());
        $("#P3").val($("#player_3").find(".coin").html());
        $("#P4").val($("#player_4").find(".coin").html());
        $("#continue").click();
    }

    function gameOverScore() {
        $("#roundNum").val("Over!Score");
        $("#P1").val($("#player_1").find(".score").html());
        $("#P2").val($("#player_2").find(".score").html());
        $("#P3").val($("#player_3").find(".score").html());
        $("#P4").val($("#player_4").find(".score").html());
        $("#continue").click();
    }
})