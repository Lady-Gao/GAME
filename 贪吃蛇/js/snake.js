function Snake(){
	//自己的身体
	this.body=[
	{"row":3,"col":8},
	{"row":3,"col":7},
	{"row":3,"col":6},
	{"row":3,"col":5},
	{"row":3,"col":4},
	];
	// this.game=game;
	this.direction="R";
	this.willDirdction="R";
	}
//渲染方法
Snake.prototype.render=function(){
	game.setColor(this.body[0].row, this.body[0].col, "pink");
    for (var i = 1; i < this.body.length; i++) {
        game.setColor(this.body[i].row, this.body[i].col, "red");
    }
	if(this.body[0].col>=game.colAmount){
		this.body[0].col=0;
	}if(this.body[0].row>=game.rowAmount){
		this.body[0].row=0;
	}if(this.body[0].col<0){
		this.body[0].col=game.colAmount-1;
	}if(this.body[0].row<0){
		this.body[0].row=game.rowAmount-1;
	}
}
//更新
Snake.prototype.update=function(){
	//尾巴每次删除一项
this.direction = this.willDirdction;
	switch(this.direction){
		case "R":
		//头插节点
		var toucha={"row":this.body[0].row,"col":this.body[0].col+1};
		this.body.unshift(toucha);
		break;
		case "D":
		//头插节点
		var toucha={"row":this.body[0].row+1,"col":this.body[0].col};
		this.body.unshift(toucha);
		break;
		case "L": 
		//头插节点
		var toucha={"row":this.body[0].row,"col":this.body[0].col-1};
		this.body.unshift(toucha);
		break;
		case "U":
		//头插节点
		var toucha={"row":this.body[0].row-1,"col":this.body[0].col};
		this.body.unshift(toucha);
		break;
	}

	//判断吃没吃到食物  头碰到食物 
	if(toucha.col == game.food.col && toucha.row == game.food.row){
    	game.setHTML(game.food.row,game.food.col," ")
    	game.food = new Food(game);
        game.fs+=5;
    }else{
    	this.body.pop();
    }
    //撞到自己的身体
   for(var i=1;i<this.body.length;i++){
   	if(toucha.row==this.body[i].row&&toucha.col==this.body[i].col){
   		alert("撞死了");
   		
   		clearInterval(game.timer)
   	}
   }
}
Snake.prototype.chaneDirection=function(str){
	this.willDirdction=str;
}