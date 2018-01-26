function Map(){
	// 创建一个地图
	this.code = (function(){
		var arr = [];
		for(var i = 0; i < 20; i++){
			arr.push([]);
			for (var j = 0; j < 12; j++) {
				arr[i].push(0);
			}
		}
		arr.push(Array(12).fill(1));//这是ES6的填充数组的语法
		return arr
	})()
	console.log(this);
}
Map.prototype.render = function(){
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 12; j++) {
			if(this.code[i][j] != 0){
				game.setClass(i,j,this.code[i][j]);
			}
		}
	}
}