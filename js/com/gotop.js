define(['jquery'],function () {
  var gotop = (function () {
      function _goTop($ct) {
          this.ct = $ct;
          this.init();
          this.bind();
      }

      _goTop.prototype = {
          construstor: _goTop,
          init: function () {
              this.windowHeight = $(window).height();
              this.scrollTop = $(window).scrollTop();
          },
          bind: function () {
              var _this = this;
              $(window).on('scroll',function () {
                  _this.scrollTop = $(window).scrollTop();
                  if(_this.scrollTop > _this.windowHeight){
                      _this.ct.css({
                          display: 'block'
                      });
                  }
              });
              this.ct.on('click',function () {
                  $(window).scrollTop(0);
                  _this.ct.css({
                      display: 'none'
                  });
              });
          }
      };

      return {
          start: function ($ct) {
              new _goTop($ct)
          }
      }
  })();

  return gotop;
});