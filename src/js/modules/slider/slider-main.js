import Slider from './slider';

//to get the access to properties and methodhs that Slider has
export default class MainSlider extends Slider {
  constructor (btns) {
    //to get the access
    super(btns);
  }
  
  //common function
  showSlides (n) {
    console.log(this.slides.length);
    //if the variable become more than we need then set 1
    if (n > this.slides.length) {
      
      this.slideIndex = 1;
    }

    //if slider < 1 (= 0) than we swipe to the last elem of slider
    if (n < 1) {
      this.slideIndex = this.slides.length;
    }

    try {
      this.hanson.style.opacity = '0';

      if (n === 3) {
        this.hanson.classList.add('animated');
        setTimeout(() => {
          this.hanson.style.opacity = '1';
          this.hanson.classList.add('slideInUp');
        }, 3000);
      } else {
        this.hanson.classList.remove('slideInUp');
      }
    } catch (e) {}

    //everything to display none
    this.slides.forEach(slide => {
      slide.style.display = 'none';
    });

    //show the first slide only
    this.slides[this.slideIndex - 1].style.display = 'block';
  }

  //for later
  plusSlides (n) {
    this.showSlides(this.slideIndex += n);
  }

  bindTriggers (arrow, target) {
    //if we clicked then plusSlides
    this.btns.forEach(item => {
      console.log('item: ', item);
      console.log(item.parentNode.previousElementSibling);
      item.addEventListener('click', () => {
        //+1. we'll change it later
        this.plusSlides(1);
      });

      //if we click on logo then turn slides to one
      item.parentNode.previousElementSibling.addEventListener('click', (e) => {
        if (e.tagName === 'A') {
          e.preventDefault();
          e.stopPropagation();
          this.slideIndex = 1;
          //change the variable
          this.showSlides(this.slideIndex);
        }
      });
    });

    document.querySelectorAll('.nextmodule').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.plusSlides(1);
      });
    });

    document.querySelectorAll('.prevmodule').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.plusSlides(-1);
      });
    });
  }


  //main method
  render() {
    if (this.container) {
      try {
      //to create the teacher pop up block 
      this.hanson = document.querySelector('.hanson');
    } catch (e) {}

    //to initializate our slider
    this.showSlides(this.slideIndex);
    this.bindTriggers();
    }
  }
}