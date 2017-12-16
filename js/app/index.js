define(['jquery','com/carousel','com/gotop','com/exposure'],function($,carousel,gotop,exposure){
  Carousel1.init($('.carousel'))
  gotop.start($('.gotop'))
  exposure($('.exposure'))
})