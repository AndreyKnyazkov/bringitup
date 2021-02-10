export default class Slider {
  //pass parametrs
  constructor ({container = null,
    btns = null,
    next = null, 
    prev = null,
    activeClass = '',
    animate,
    autoplay} = {}) {
    //get parent
    this.container = document.querySelector(container);
    //get childrens of the parent
    try {this.slides = this.container.children;} catch (e) {}
    //get btn to swipe slides
    this.btns = document.querySelectorAll(btns);
    this.prev = document.querySelector(prev);
    this.next = document.querySelector(next);
    this.activeClass = activeClass;
    this.animate = animate;
    this.autoplay = autoplay;
    //start with
    this.slideIndex = 1;
  }
}