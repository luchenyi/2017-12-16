function Barrels($ct){
 			this.$ct = $ct;
 			this.imgNum = 40;
 			this.rowList = [];
 			this.baseHeight = 100;
 			this.loadImg();
}
Barrels.prototype = {
	loadImg: function(){
	  var _this = this;
      var imgUrls = this.getImgUrls(100); //先拿100个url
	  $.each(imgUrls,function(idx, url){
          console.log(url);
          var img = new Image();
          img.src = url;
          img.onload = function(){
            var ratio = img.width/img.height;
            console.log(ratio);
            var imgInfo = {
              target: $(img),
              width: _this.baseHeight*ratio,//原图同比例到img
              height: _this.baseHeight,
              ratio: ratio
            };
            _this.render(imgInfo);//图片置入imgInfo
          };
        });
	},
	render: function(imgInfo){
        var _this = this;
		var clientWidth = this.$ct.width();
        var rowList = this.rowList;
		var lastImgInfo = imgInfo;
		var rowHeight = 0;
		var rowWidth = 0;
		this.rowList.push(imgInfo);//往空数组中添加对象
		$.each(rowList,function(idx,imgInfo){
          rowWidth += imgInfo.width;
          if(rowWidth > clientWidth){		
			_this.rowList.pop();//若大于容器宽度将最后一个对象去除，并建立新空数组，最后一项添加至新空数组,直至行宽与容器相等
            rowWidth -= lastImgInfo.width;
			rowHeight = clientWidth*_this.baseHeight/rowWidth;
			_this.layout(rowHeight);
			_this.rowList = [];
			_this.rowList.push(lastImgInfo);
		}
        });		
	},
	layout: function(rowHeight){
       console.log("createRow");
		var $rowCt = $('<div class ="img-row"></div>');
		$.each(this.rowList,function(idx,imgInfo){
		 var $imgWidth = rowHeight*imgInfo.width/100;
          var $imgCt = $('<div class="img-box"></div>'),
           
			    $img = imgInfo.target;
                $img.width($imgWidth-8);
			    $img.height(rowHeight);
			    $imgCt.append($img);//放入盒容器
			    $rowCt.append($imgCt);//放入行容器
		});
		this.$ct.append($rowCt);
	},
	getImgUrls: function(num){
	var color,width, height, urls=[];
		for(let j=0; j<num; j++){
			color = Math.random().toString(16).substring(2,8);
			width = Math.floor(Math.random()*100+50);
			height = Math.floor(Math.random()*30+50);
			urls.push("http://placehold.it/" +width + "x" + height +"/"+ color + "/fff" );
		}
		return urls;
	}
};
module.exports = Barrels();