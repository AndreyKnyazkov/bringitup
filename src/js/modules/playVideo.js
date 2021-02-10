export default class VideoPlayer {
  constructor (triggers, overlay) {
    //buttons to open the modal window
    this.btns = document.querySelectorAll(triggers);
    //overlay for that
    this.overlay = document.querySelector(overlay);
    //close btn to close the modal
    this.close = this.overlay.querySelector('.close');
  }

  bindTriggers() {
    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        //if the modal is already created
        if (document.querySelector('iframe#frame')) {
          this.overlay.style.display = 'flex';
        //if it did not create it
        } else {
          this.overlay.style.display = 'flex';
          const path = btn.getAttribute('data-url');
          this.createPlayer(path);
        }
        
      });
    });
  }

  //to close the modal
  bindCloseBtn() {
    this.close.addEventListener('click', () => {
      this.overlay.style.display = 'none';
      this.player.stopVideo();
    });
  }

  //create the YouTube player
  createPlayer (url) {
    this.player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId: `${url}`,
    });
    console.log(this.player);
  }

  //the main function
  init () {
    if (this.btns.length > 0) {
      //create a script
      const tag = document.createElement('script');
      //bind youtube API
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      //to bind triggers
      this.bindTriggers();
      //to close the modal
      this.bindCloseBtn();
    }      
  }    
}

      