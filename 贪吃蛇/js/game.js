function Game(){
	//行数
	this.rowAmount=16;
	//列数
	this.colAmount=20;
	this.init();
	//实例化蛇
	this.snake=new Snake();
	this.food=new Food(this);
	this.binEvent();
	//开启定时器
	this.start();

}
//上树 创建表格
Game.prototype.init=function(){
	this.dom=$("<table></table>")
	//table,tr,td 上树
	var tr;
	for(var i=0;i<this.rowAmount;i++){
		tr=$("<tr></tr>")
		for(var j=0;j<this.colAmount;j++){
			$("<td></td>").appendTo(tr)
		}
		tr.appendTo(this.dom)
	}
	$(".app").append(this.dom)
}
//设置颜色
Game.prototype.setColor = function(row,col,color){
	$("tr").eq(row).children('td').eq(col).css("background",color);
}
//设置食物
Game.prototype.setHTML=function(row,col,text){
	$("tr").eq(row).children('td').eq(col).html(text);
}
//清屏
Game.prototype.clearColor=function(){
	for(var i=0;i<this.rowAmount;i++){
		for(var j=0;j<this.colAmount;j++){
			$("tr").eq(i).children("td").eq(j).css("background","")
		}
	}
}
//监听
Game.prototype.binEvent=function(){
	var slef=this;
	$(document).keydown(function(e){
	console.log(e.keyCode)
	if(e.keyCode==37){
			if(slef.snake.direction=="R") return 
				slef.snake.chaneDirection("L")
		}
	if(e.keyCode==38){
			if(slef.snake.direction=="D") return 
				slef.snake.chaneDirection("U")
		}
	if(e.keyCode==39){
			if(slef.snake.direction=="L") return 
				slef.snake.chaneDirection("R")
		}
	if(e.keyCode==40){
			if(slef.snake.direction=="U") return 
				slef.snake.chaneDirection("D")
		}

	})
}

//定时器
Game.prototype.start=function(){
	//游戏的定时器
	var self=this;
	this.f=0;
	this.fs=0;
	this.timer=setInterval(function(){
		self.f++;
		$(".info1").html("帧 : "+self.f);
		$(".fs").text(self.fs)
		//清屏幕
		self.clearColor();
		//渲染
		self.snake.render();
		self.food.render()
		self.f%10==0&&self.snake.update()
	},20)
}