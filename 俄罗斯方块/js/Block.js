function Block() {
    // 选择一个形状
    this.allType = ['S', 'Z', 'J', 'L', 'I', 'O', 'T'][~~(Math.random() * 7)];
    // 这是所有方向的个数
    this.allDirectionNumber = block_json[this.allType].length;
    // 随机方向
    this.direction = ~~(Math.random() * this.allDirectionNumber);
    // 得到自己的code
    this.code = block_json[this.allType][this.direction];
    this.row = 0;
    // 我要保证 从中间出现
    this.col = 4;
}
Block.prototype.render = function() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            // 看自己的图形编码 有1  就染色  0 就没有色 
            if (this.code[i][j] == 1) {
                game.setClass(this.row + i, this.col + j, this.allType)
            }
        }
    }
}
// 下落方法
Block.prototype.down = function() {
    // 判断 这个数组的 第0个 是不是有不等于 0 的那一项 如果有 干掉定时器  弹出 游戏结束
    // forEach 也是ES6
    game.map.code[0].forEach(function(item) {
        if (item != 0) {
            clearInterval(game.timer)
            alert("游戏结束！！！！")
            return
        }
    });

    if (this.check(this.row + 1, this.col)) {
        this.row++
    } else {
        this.addDie();
        game.block = new Block();
        this.remove()
    }
}
Block.prototype.goDown = function() {
    // 一键到底
    while (this.check(this.row + 1, this.col)) {
        this.row++
    }
    document.getElementById("goDown").play() 
}
Block.prototype.left = function() {
    if (this.check(this.row, this.col - 1)) {
        document.getElementById("left_right").play() 
        this.col--
    }
}
Block.prototype.goLeft = function() {
    while(this.check(this.row, this.col - 1)) {
        document.getElementById("left_right").play() 
        this.col--
    }
}
Block.prototype.right = function() {
    if (this.check(this.row, this.col + 1)) {
        document.getElementById("left_right").play() 
        this.col++
    }
}
Block.prototype.goRight = function() {
    while(this.check(this.row, this.col + 1)) {
        document.getElementById("left_right").play() 
        this.col++
    }
}
Block.prototype.rotate = function() {
    // 备份旧的方向
    var oldDirection = this.direction
    if (this.direction == this.allDirectionNumber - 1) {
        this.direction = 0
    } else {
        this.direction++
    }

    // 如果 改变了 方向 记得别忘了 把砖块的 code 再 赋值 一次
    this.code = block_json[this.allType][this.direction];
    // 吐过不可以旋转 就帮我撤回来
    if (!this.check(this.row, this.col)) {
        this.direction = oldDirection;
        // 如果 改变了 方向 记得别忘了 把砖块的 code 再 赋值 一次
        this.code = block_json[this.allType][this.direction];
    }else{
        // 添加旋转音乐
        document.getElementById("rotate").play() 
    }
}
Block.prototype.addDie = function() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (this.code[i][j] != 0) {
                game.map.code[i + this.row][j + this.col] = this.allType
            }
        }
    }
};
Block.prototype.check = function(row, col) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (this.code[i][j] != 0 && game.map.code[row + i][col + j] != 0) {
                return false
            }
        }
    }
    return true
}
// 消行判定
Block.prototype.remove = function() {
    // 判断map里面的code地图的某一行 是不是没有0  如果没有0  消行
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 12; j++) {
            if (!game.map.code[i].includes(0)) {
                game.map.code.splice(i, 1);
                game.map.code.unshift(new Array(12).fill(0));
                game.score++
                document.getElementById("remove").play() 
            }
        }
    }
}