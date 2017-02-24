/**
 * Created by Administrator on 2017/2/23.
 */
//if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){
    alert('151')
    for(var i = 0;i<5;i++){
       console.log(document.getElementsByTagName('button')[i]);
        document.getElementsByTagName('button')[i].style.setAttribute('-webkit-appearance','none');
        
    };for(i = 0;i<4;i++)
        document.getElementsByClassName('directbut')[i].removeAttribute('onclick');alert('3');
//} else {
//    alert('1');
//    for(i = 0;i<4;i++)
//        document.getElementsByClassName('directbut')[i].style.display = 'none';
//}

var snake = [
    {x:3,y:1},
    {x:2,y:1},
    {x:1,y:1}
];
var food;
var map = [];
var score;
var direction;
var e;
var rawdirect;
var direct;
var speed = 100;
var snake_id = null;
var cxt = document.getElementById('board').getContext('2d');

for(var x = 0;x<=19;++x) {
    for(var y = 0;y<=19;++y) {
        var atom = {};
        atom.x = x;
        atom.y = y;
        map.push(atom);
    }
}

document.onkeydown = function(event){
    e = event;
    if(e && e.keyCode == 37)
        rawdirect = 37;
    if(e && e.keyCode == 38)
        rawdirect = 38;
    if(e && e.keyCode == 39)
        rawdirect = 39;
    if(e && e.keyCode == 40)
        rawdirect = 40;
};

function button_click(){
    rawdirect = parseInt(event.target.value);
}

function block(x,y,color){
    cxt.fillStyle = color;
    cxt.fillRect(x*15,y*15,15,15);
    cxt.strokeStyle = '#150509';
    cxt.lineWidth = 1;
    cxt.strokeRect(x*15,y*15,15,15);
}

function fresh(){
    cxt.clearRect(0,0,300,300);
}

function Food(){
    var space = map;
    this.newfood = function(){
        for(var i = 0;i<snake.length;i++){
            for(var j = 0;j<space.length;j++){
                if(space[j].x == snake[i].x && space[j].y == snake[i].y)
                    space.splice(j,1);
            }
        }
        food = space[Math.floor(Math.random()*space.length)];
    };

    this.food_show = function(){
        block(food.x,food.y,'#87ff47');
    }
}

function move39(){
    snake.unshift({x:snake[0].x+1,y:snake[0].y});
    tail = snake.pop();
}

function move37(){
    snake.unshift({x:snake[0].x-1,y:snake[0].y});
    tail = snake.pop();
}

function move38(){
    snake.unshift({x:snake[0].x,y:snake[0].y-1});
    tail = snake.pop();
}

function move40(){
    snake.unshift({x:snake[0].x,y:snake[0].y+1});
    tail = snake.pop();
}

function eatfood(){
    if(snake[0].x == food.x && snake[0].y == food.y){
        fd.newfood();
        snake.push(tail);
    }
}

function snake_show(){
    block(snake[0].x,snake[0].y,'#ff061c');
    for(i=1;i<snake.length;++i){
        if(snake[0].x<0 || snake[0].x>19 || snake[0].y<0 || snake[0].y>19)
            return;
        block(snake[i].x,snake[i].y,'#ff3b76');
    }
}

function failtest(){
    if(snake[0].x<0 || snake[0].x>19 || snake[0].y<0 || snake[0].y>19){
        document.getElementById('score').innerHTML = 'Game Over,Score：'+score;
        clearInterval(snake_id)
    }
    for(i = 1;i<snake.length;i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            document.getElementById('score').innerHTML = 'Game Over,Score：'+score;
            clearInterval(snake_id)
        }
    }
}

function score_show(){
    document.getElementById('score').innerHTML = 'Score:'+score;
}

function movesnake(){
    fresh();
    if((snake[0].x == snake[1].x) && (snake[0].y > snake[1].y))
        direction = 40;
    if((snake[0].x == snake[1].x) && (snake[0].y < snake[1].y))
        direction = 38;
    if((snake[0].y == snake[1].y) && (snake[0].x > snake[1].x))
        direction = 39;
    if((snake[0].y == snake[1].y) && (snake[0].x < snake[1].x))
        direction = 37;

    if(!rawdirect){
        direct = direction;
    } else if (direction == rawdirect-2 || direction == rawdirect+2 || direction == rawdirect){
        direct = direction;
    }else{
        direct = rawdirect;
    }

    eval('move'+direct+'()');
    eatfood();

    fd.food_show();
    snake_show();
    score = snake.length - 3;
    score_show();
    failtest();
}

function init(){
    fresh();
    snake = [
        {x:3,y:1},
        {x:2,y:1},
        {x:1,y:1}
    ];
    food = null;
    rawdirect = null;alert('fresh?');
    snake_show();alert('snakeshow?');
    fd = new Food();
    fd.newfood();
    fd.food_show();
    if(snake_id)
        clearInterval(snake_id);
    snake_id = setInterval("movesnake()",speed);
}

init();
