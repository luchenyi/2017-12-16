
  function Carousel($ct){
    this.$ct=$ct
    this.init()
    this.bind()
    this.bullet()
    this.auto()
  }
  Carousel.prototype.auto=function(){
    var _this=this
    this.clock = setInterval(function () {
      _this.playNext(1);
  }, 2000)
}
  Carousel.prototype.init=function(){
    var $imgCt =this.$imgCt=this.$ct.find('.img-ct')
    var $imgs = this.$imgs=this.$ct.find('.img-ct >li')
    var $preBtn =this.$preBtn=this.$ct.find('.pre')
    var $nextBtn = this.$nextBtn=this.$ct.find('.next')
    var $bullets = this.$bullets=this.$ct.find('.bullet li')
    var pageIndex =this.pageIndex= 0
    var isAnimate = this.isAnimate=false
    var imgCount =this.imgCount= $imgs.length
    var imgWidth = this.imgWidth=$imgs.width()
    this.$imgCt.append($imgs.first().clone())
    this.$imgCt.prepend($imgs.last().clone())
    this.$imgCt.width((imgCount + 2) * imgWidth)
    this.$imgCt.css({left: -imgWidth})
  }
  Carousel.prototype.bind=function(){
    var _this=this
    this.$nextBtn.on('click',function(){
      _this.playNext(1)
    })
  this.$preBtn.click(function(){
    _this.playPre(1)
  })
  }
  Carousel.prototype.playNext=function(len){
    var _this=this
    console.log('playNext', len)
    if(_this.isAnimate) return
    _this.isAnimate = true
    
    _this.$imgCt.animate({
      left: '-='+len*_this.imgWidth
    }, function(){
      
      _this.pageIndex += len
      if(_this.pageIndex === _this.imgCount) {
        _this.pageIndex = 0
        _this.$imgCt.css({left: -_this.imgWidth})
      }
      console.log(_this.pageIndex)
      _this.setBullet()
      _this.isAnimate = false
    })
  }
  Carousel.prototype.playPre=function(len){
    var _this=this
    if(_this.isAnimate) return
    _this.isAnimate = true
    _this.$imgCt.animate({
      left: '+='+len*_this.imgWidth
    }, function(){
      _this.pageIndex -= len
      if(_this.pageIndex < 0){
        _this.pageIndex = _this.imgCount - 1
        _this.$imgCt.css({left: -_this.imgCount*_this.imgWidth})
      }
      _this.setBullet()
      _this.isAnimate = false
    })
  }
  Carousel.prototype.setBullet=function(){
    var _this=this
    _this.$bullets.removeClass('active')
            .eq(_this.pageIndex)
            .addClass('active')
  }
  Carousel.prototype.bullet=function(){
    var _this=this
    _this.$bullets.click(function(){
    var index = $(this).index()
    console.log(index)
    if(index > _this.pageIndex) {
      _this.playNext(index - _this.pageIndex)
    }else if(index < _this.pageIndex){
      _this.playPre(_this.pageIndex - index)
    }
  })
  }
  // new Carousel($('.carousel').eq(0))
  // new Carousel($('.carousel').eq(1))
  Carousel1=(function(){
    return{
      init:function($ct){
        $ct.each(function(index,node){
          new Carousel($(node))
        })
      }
    }
  })()
  module.exports = Carousel




