import Slider from './slider';

export default class MultiSlider extends Slider {
  constructor (container, next, prev, activeClass, animate, autoplay) {
    super(container, next, prev, activeClass, animate, autoplay);
    try {
      this.currentSlides = [...this.slides].filter(val => val.nodeName !== "BUTTON"),
      this.targetSlide = this.currentSlides.length,
      this.sliderParent = this.slides[0].parentNode;
    } catch (e) {}    
  }  

  //set ative classes
  decorizeSlides() {
    
    this.slides.forEach(slide => {
      slide.classList.remove(this.activeClass);
      //remove classes if the animation argument was passed
      if (this.animate) {
        slide.querySelector('.card__title').style.opacity = '0.4';
        slide.querySelector('.card__controls-arrow').style.opacity = '0';
      }
    });

    //it should not be a button
    if (!this.slides[0].closest('button')) {
      this.slides[0].classList.add(this.activeClass);
    }
    

    //if the animation argument is passed
    if (this.animate) {
      this.slides[0].querySelector('.card__title').style.opacity = '1';
      this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
    }
  }

  nextSlide () {
      //remove btns
      /*
      const currentSlides = [...this.slides].filter(val => val.nodeName !== "BUTTON"),
            targetSlide = currentSlides.length,
            sliderParent = this.slides[0].parentNode;*/

            //get first element and set it to the last position    
            this.sliderParent.insertBefore(this.sliderParent.firstElementChild, this.sliderParent.children[this.targetSlide]);
            this.decorizeSlides();
  }

  bindTriggers () {
    this.next.addEventListener('click', () => this.nextSlide());

    this.prev.addEventListener('click', () => {
      /*
      const currentSlides = [...this.slides].filter(val => val.nodeName !== "BUTTON"),
            sliderParent = this.slides[0].parentNode;*/

      //get last element and set it to the first element
      //structure: parentElement.insertBefore(newElement, parentElement.children[2]);
      this.sliderParent.insertBefore(this.slides[this.currentSlides.length - 1], this.sliderParent.firstElementChild);

      this.decorizeSlides();
    });
  }

  autoplaySlide () {
    const startPlay = setInterval(() => this.nextSlide(), 5000),
          sliderParent = this.slides[0].parentNode;

      sliderParent.addEventListener('mouseenter', () => {
        clearInterval(startPlay);
      });
      
      sliderParent.addEventListener('mouseleave', () => {
        this.autoplaySlide();
      });
  }

  init () {
    try {
      this.container.style.cssText = `
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      align-items: flext-start;
    `;

    this.bindTriggers();
    this.decorizeSlides();
    
    if (this.autoplay) {

      this.autoplaySlide();

    }
    } catch (error) {
      
    }
  }
}