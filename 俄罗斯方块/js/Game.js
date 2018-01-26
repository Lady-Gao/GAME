function Game() {
    this.block = new Block()
    this.map = new Map()
    this.init();
    this.start();
    this.bindEvent();
}
Game.prototype.init = function() {
	// 创建 table 表格 是20行 12列的
    this.$dom = $("<table></table>");
    var tr, td;
    for (var i = 0; i < 20; i++) {
        tr = $("<tr></tr>")
        for (var j = 0; j < 12; j++) {
            td = $("<td></td>")
            tr.append(td)
        }
        this.$dom.append(tr);
    }
    $("#app").append(this.$dom);
};
// Game 提供 一个 setClass 的方法
Game.prototype.setClass = function(row, col, classname) {
    $("tr").eq(row).children('td').eq(col).attr("class", classname)
};
// Game 提供 一个 清理 的方法
Game.prototype.clearClass = function(row, col, classname) {
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 12; j++) {
            $("tr").eq(i).children('td').eq(j).attr("class", "")
        }
    }
};
Game.prototype.bindEvent = function() {
    var self = this;
    $(document).keyup(function(event) {
    	if(event.keyCode == 37){
    		self.block.left();
    	}else if(event.keyCode == 38){
    		self.block.rotate();
    	}else if(event.keyCode == 39){
    		self.block.right();
    	}else if(event.keyCode == 40){

    	}else if(event.keyCode == 32){
    		self.block.goDown()
    	}
        if(event.ctrlKey && event.keyCode == 39){
           self.block.goRight()
        }
        if(event.ctrlKey && event.keyCode == 37){
           self.block.goLeft()
        }
    });
};
// 主循环  主定时器
Game.prototype.start = function() {
    var self = this;
    this.score = 0
    this.f = 0;
    this.timer = setInterval(function() {
        self.f++;
        self.clearClass();
        self.block.render();
        $("#score").text(self.score)
        self.map.render();
        self.f % 30 == 0 && self.block.down();
    }, 20)
};