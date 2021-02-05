export default class Slider {
  constructor (page, btns) {
    //get parent
    this.page = document.querySelector(page);
    //get childrens of the parent
    this.slides = this.page.children;
    //get btn to swipe slides
    this.btns = document.querySelectorAll(btns);
    //start with
    this.slideIndex = 1;
  }

  //common function
  showSlides (n) {
    //if the variable become more than we need then set 1
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }

    //if slider < 1 (= 0) than we swipe to the last elem of slider
    if (n < 1) {
      this.slideIndex = this.slide.length;
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

  //main method
  render() {
    try {
      //to create the teacher pop up block 
      this.hanson = document.querySelector('.hanson');
    } catch (e){}
    


    //if we clicked then plusSlides
    this.btns.forEach(item => {
      item.addEventListener('click', () => {
        //+1. we'll change it later
        this.plusSlides(1);
      });

      //if we click on logo then turn slides to one
      item.parentNode.previousElementSibling.addEventListener('click', (e) => {
        e.preventDefault();
        this.slideIndex = 1;
        //change the variable
        this.showSlides(this.slideIndex);
      });
    });

    //to initializate our slider
    this.showSlides(this.slideIndex);
  }
}