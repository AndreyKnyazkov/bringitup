export default class VideoPlayer {
  constructor (triggers, overlay) {
    //buttons to open the modal window
    this.btns = document.querySelectorAll(triggers);
    //overlay for that
    this.overlay = document.querySelector(overlay);
    //close btn to close the modal
    this.close = this.overlay.querySelector('.close');
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
  }

  bindTriggers() {
    this.btns.forEach((btn, i) => {
      try {
        const blockedElem = btn.closest('.module__video-item').nextElementSibling;        
        if (i % 2 == 0) {
          blockedElem.setAttribute('data-disabled', 'true');
        }
      } catch (error) {}

      btn.addEventListener('click', () => {
        if (!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-disabled') !== 'true') {
          this.activeBtn = btn;
          //if the modal is already created
          if (document.querySelector('iframe#frame')) {
            
            this.overlay.style.display = 'flex';
            //if path doesn't exist
            if (this.path !== btn.getAttribute('data-url')) {
              this.path = btn.getAttribute('data-url');
              this.player.loadVideoById({videoId: this.path});
            }
          //if it did not create it
          } else {
            this.overlay.style.display = 'flex';
            this.path = btn.getAttribute('data-url');

            this.createPlayer(this.path);
          }
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
      events: {
        'onStateChange': this.onPlayerStateChange
      }
    });
    console.log(this.player);
  }

  onPlayerStateChange (state) {
    try {
      const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling;
      const playBtn = this.activeBtn.querySelector('svg').cloneNode(true);
      //remove styles
      if (state.data === 0) {
        if (blockedElem.querySelector('.play__circle').classList.contains('closed')) {
          blockedElem.querySelector('.play__circle').classList.remove('closed');
          blockedElem.querySelector('svg').remove();
          blockedElem.querySelector('.play__circle').appendChild(playBtn);
          blockedElem.querySelector('.play__text').textContent = 'play video';
          blockedElem.querySelector('.play__text').classList.remove('attention');
          blockedElem.style.opacity = 1;
          blockedElem.style.filter = 'none';

          blockedElem.setAttribute('data-disabled', 'false');
        }
      }
    } catch (error) {}
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

      