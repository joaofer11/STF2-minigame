//JS IMPORTS
import StandardStates from './sagat-states/standard-states';

//ASSET MODULES IMPORTS
import img from '/assets/images/blanka_stage.png';
const sourceImg = new Image();
sourceImg.src = img;

//INTANCES

export default class StageBackground {
  constructor() {
    this.standardStates = new StandardStates()
    this.sourceImg = sourceImg
    this.sX = (621 / 2) - ((621 / 2) / 2);
    this.sY = 0;
    this.sW = (621 / 2) ;
    this.sH = 224;
    this.cX = 0;
    this.cY = 0;
    this.cW = 360;
    this.cH = 224;
    this.FPS = 0;
    this.maxFPS = 3;
    this.itsHoldingTouch = false;
    this.timer = null;
    this.transition = { direction: null, itsTransition: false}
    this.characterPosition = null;
  }
  
  //ANIMATIONS
  animate(ctx, characterPosition) {
    this.characterPosition = characterPosition;
    this.checkTransition()
    ctx.drawImage(
      this.sourceImg,
      this.sX, this.sY,
      this.sW, this.sH,
      this.cX, this.cY,
      this.cW, this.cH
    )
    this.FPS++;
  }
  
  checkTransition() {
    switch(this.transition.direction) {
      case 'toLeft':
        this.transitionStageToLeft();
        break;
      case 'toRight':
        this.transitionStageToRight();
        break;
    }
  }
  
  transitionStageToLeft() {
    if(this.sX > 0 && this.characterPosition <= 15 ) {
      this.sX -= 1
      this.transition.itsTransition = true;
    }
  }
  
  transitionStageToRight() {
    if(this.sX < (360 - 56) && this.characterPosition >= 280) {
      this.sX += 1;
      this.transition.itsTransition = true;
    }
  }
  
  //ADD CONTROLS
  addControls() {
    const controlButtons = document.querySelectorAll('[data-js="control-buttons"]');
    controlButtons.forEach(this.addButtons);
    
    document.addEventListener('keydown', this.checkKey);
    document.addEventListener('keyup', this.checkKey);
  }
  
  addButtons(button) {
    button.addEventListener('touchstart', this.checkButton);
    button.addEventListener('touchmove', this.checkButton);
    button.addEventListener('touchend', this.checkButton);
  }
  
  //CONTROLS MAP
  checkKey(event) {
    const keyDown = event.type === 'keydown';
    const keyUp = event.type === 'keyup';
    
    if(keyDown) {
      this.mapTransitionDirection(event.key);
    }
    else if(keyUp) {
      this.transition.direction = null;
      this.transition.itsTransition = false;
    }
  }
  
  checkButton(event) {
    const touchStart = event.type === 'touchstart';
    const touchMove = event.type === 'touchmove';
    const touchEnd = event.type === 'touchend';
    const button = event.target.parentNode.classList[1];
  
    if (touchStart) {
      this.mapTransitionDirection(button)
    }
    else if (touchEnd) {
      this.transition.direction = null;
      this.transition.itsTransition = false;
    }
  }
  
  mapTransitionDirection(button) {
    switch (button) {
      case 'ArrowLeft':
        this.transition.direction = 'toLeft'
        break;
      case 'ArrowRight':
        this.transition.direction = 'toRight'
        break;
    }
  }
  
  //CONFIGS
  bindEvents() {
    this.checkKey = this.checkKey.bind(this);
    this.addButtons = this.addButtons.bind(this);
    this.checkButton = this.checkButton.bind(this);
  }
  
  init() {
    this.bindEvents();
    this.addControls();
  }
}
