var width = 10,
    height = 10,
    weight = 3,
    score = 0,
    food = false,
    dx = 1,
    dy = 0,
    x, y, xFood, yFood;

//when key press
$("body").keydown(function(event) {
    dx = (event.keyCode - 38) % 2;
    dy = (event.keyCode - 39) % 2;
});

//timer for refresh
var timer = setInterval(function() {

    var way = [];
    var snake = $(".snakePart");
    var head, end;

    //where is snake now
    for (var i = 0; i < snake.length; i++) {
        way[i] = +$(snake[i]).attr("way");
    }

    //address snak head and end of the snake
    head = $(".snakePart[way =" + Math.max.apply(Math, way) + "]");
    end = $(".snakePart[way =" + Math.min.apply(Math, way) + "]");

    //the next address of the way
    x = +head.attr("id").split('_')[1] + dx;
    y = +head.attr("id").split('_')[0] + dy;

    // if food is away
    if (!food) {
        xFood = +head.attr("id").split('_')[1];
        yFood = +head.attr("id").split('_')[0];

        while ($("#" + yFood + "_" + xFood).hasClass('snakePart')) {
            xFood = Math.floor(Math.random() * 9);
            yFood = Math.floor(Math.random() * 9);
        }

        $("#" + yFood + "_" + xFood).addClass('food');
        food = true;
    }

    // if snake is not crush
    if (!(($("#" + y + "_" + x).hasClass('snakePart')) || (x >= width) || (y >= height) || (x < 0) || (y < 0))) {

        $("#" + y + "_" + x)
            .addClass('snakePart')
            .attr("way", Math.max.apply(Math, way) + 1);

        if ($("#" + y + "_" + x).hasClass('food')) {

            $("#" + y + "_" + x).removeClass('food');
            weight++;
            score++;
            food = false;
        }

        if (way.length >= weight) {
            $("#" + end.attr("id").split('_')[0] + "_" + end.attr("id").split('_')[1])
                .removeClass('snakePart')
                .removeAttr("way");
        }

    } else {
        clearInterval(timer);
        alert("Game is over! Your score: " + score);
    }

}, 200);
