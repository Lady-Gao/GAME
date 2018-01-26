function Food(gamee){
	var slef=this;
	console.log(gamee)
	do{
		this.row=parseInt(Math.random()*gamee.rowAmount)
		this.col=parseInt(Math.random()*gamee.colAmount)
	}while(
		//遍历蛇的身子,不能产生在蛇的身上
		(function(){
			for(var i=0;i<gamee.snake.body.length;i++){
				if(gamee.snake.body[i].row==self.row&&gamee.snake.body[i].col==self.col){
					return true;
				}
	}
				return false;
		})()
		)
}

//渲染
Food.prototype.render=function(){
	game.setHTML(this.row,this.col,"❤");

}