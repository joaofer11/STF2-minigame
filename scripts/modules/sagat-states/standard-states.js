import img from '/assets/images/sagat_sprite.png'
const sourceImg = new Image();
sourceImg.src = img;

export default class StandardStates {
  constructor() {
    this.sourceImg = sourceImg;
    this.state = { currentState: 'idle', nextState: 'idle' };
    this.sX = [0, 60, 120, 180];
    this.sY = [0, 0, 0, 0];
    this.sW = 60;
    this.sH = 132;
    this.cX = 30;
    this.cY = 80;
    this.cW = 60;
    this.cH = 132;
    this.position = 30;
    this.minFrame = 0;
    this.maxFrame = 4;
    this.animationActive = true;
    this.backgroundTransition = null;
    this.FPS = 0;
    this.maxFPS = 6;
    this.keyPressed = false;
    this.lockedControls = false;
    this.timeout = null;
  }
  
  //ANIMATIONS
  animate(ctx, backgroundTransition) {
    this.backgroundTransition = backgroundTransition;
    //console.log(this.state)
    this.checkState()
    ctx.drawImage(
      this.sourceImg,
      this.sX[this.minFrame], this.sY[this.minFrame],
      this.sW, this.sH,
      this.cX, this.cY,
      this.cW, this.cH
    )
    this.FPS++;
  }
  
  checkState() {
    if(this.state.currentState === 'idle') {
      this.setIdle()
    }
    else if(this.state.currentState === 'leftMovement') {
      this.setLeftMovement();
    }
    else if(this.state.currentState === 'rightMovement') {
      this.setRightMovement();
    }
    else if(this.state.currentState === 'jump') {
      this.setJump();
      if(this.state.currentState === 'jump' && this.state.direction === 'rightMovement') {
        this.fixRightMovement()
      }
      else if (this.state.currentState === 'jump' && this.state.direction === 'leftMovement') {
        this.fixLeftMovement()
      }
    }
    else if(this.state.currentState === 'crouch') {
      this.setCrouch();
    }
  }
  
  updateFrame() {
    const maxFPSReached = this.FPS % this.maxFPS === 0;
    
    if (maxFPSReached) {
      this.minFrame = (this.minFrame + 1) % this.maxFrame;
    }
  }
  
  resetDefault() {
    if(this.lockedControls && this.state.nextState === 'idle') {
      this.init();
      this.lockedControls = false;
    }
    this.position = this.state.currentState === 'crouch' ? (this.position) : this.cX;
    this.state = { currentState: 'idle', nextState: 'idle' };
    this.animationActive = false;
    this.maxFrame = 4;
    this.keyPressed = false;
  }
  
  //STATES
  //Idle
  setIdle() {
    if(!this.animationActive) {
      this.sX = [0, 60, 120, 180];
      this.sY = [0, 0, 0, 0]
      this.animationActive = true;
    }
    this.updateFrame()
    this.fixIdlePosition();
  }
  
  fixIdlePosition() {
    switch(this.minFrame) {
      case 0:
        this.cX = this.position;
        this.cY = 80;
        break;
      case 1:
        this.cX = this.position + 1;
        this.cY = 80;
        break;
      case 2:
        this.cX = this.position + 2;
        this.cY = 80;
        break;
      case 3:
        this.cX = this.position + 3;
        this.cY = 80;
        break;
    }
  }
  
  //leftMovement
  setLeftMovement() {
    if(!this.keyPressed) {
      this.sX = [246, 305, 366, 426, 486, 545];
      this.sY = [0, 0, 0, 0, 0, 0]
      this.minFrame = 0
      this.maxFrame = 6
      this.keyPressed = true;
    }
    this.fixLeftMovement()
    this.updateFrame()
  }
  
  fixLeftMovement() {
    if(this.cX > 0 && !this.backgroundTransition.itsTransition) {
      this.cX -= 2
    }
  }
  
  //rightMovement
  setRightMovement() {
    if (!this.keyPressed) {
      this.sX = [246, 305, 366, 426, 486, 545];
      this.sY = [0, 0, 0, 0, 0, 0]
      this.maxFrame = 6
      this.keyPressed = true;
    }
    this.updateFrame()
    this.fixRightMovement()
  }
  
  fixRightMovement() {
    if(this.cX < 360 - 60 && !this.backgroundTransition.itsTransition) {
      this.cX += 2
    }
  }
  
  //jump
  setJump() {
    if (!this.keyPressed) {
      this.sX = [610, 671, 721, 772];
      this.sY = [0, 0, 0, 0];
      this.minFrame = 0;
      this.maxFrame = 4;
      this.keyPressed = true;
    }
    this.fixJumpPosition()
  }
  
  fixJumpPosition() {
    if (this.cY === 80 && this.minFrame === 0) {
      this.updateFrame();
    }
    else if (this.minFrame === 1 && this.cY > 62) {
      this.cY -= 7;
      if(this.cY <= 62) {
        this.minFrame++;
      }
    }
    else if(this.minFrame === 2 && this.cY > 0) {
      this.cY -= this.state.velocity;
      this.state.velocity -= this.state.gravity;
      if(this.cY <= 6) {
        this.minFrame++;
      }
    }
    else if(this.minFrame === 3 && this.minFrame > 0) {
      this.cY -= this.state.velocity;
      this.state.velocity -= this.state.gravity;
      if (this.cY >= 80) {
        this.minFrame = 0;
        setTimeout(() => {
          this.state.nextState = 'idle'
          this.resetDefault();
        }, 50);
      }
    }
  }
  
  //crouch
  setCrouch() {
    if(!this.keyPressed) {
      this.sX = [831, 890];
      this.sY = [0, 0];
      this.minFrame = 0;
      this.maxFrame = 2;
      this.keyPressed = true;
    }
    this.fixCrouchPosition();
  }
  
  fixCrouchPosition() {
    switch(this.minFrame) {
      case 0:
        this.cX = this.position + 3;
        this.updateFrame()
        break;
      case 1:
        this.cX = this.position + 5;
        break;
    }
  }
  
  //ADD CONTROLS
  addControls() {
    const controlButtons = document.querySelectorAll('[data-js="control-buttons"]');
    controlButtons.forEach(this.addButtons);
    console.log('add')
    
    document.addEventListener('keydown', this.checkKey);
    document.addEventListener('keyup', this.checkKey);
  }
  
  addButtons(button) {
    button.addEventListener('touchstart', this.checkButton);
    button.addEventListener('touchend', this.checkButton);
  }
  
  //REMOVE CONTROLS
  removeControls() {
    if(!this.lockedControls) {
      const controlButtons = document.querySelectorAll('[data-js="control-buttons"]');
      controlButtons.forEach(this.removeButtons);
      console.log('removido')
      document.removeEventListener('keydown', this.checkKey);
      document.removeEventListener('keyup', this.checkKey);
      
      this.lockedControls = true;
    }
  }
  
  removeButtons(button) {
    button.removeEventListener('touchstart', this.checkButton);
    button.removeEventListener('touchend', this.checkButton);
  }
  
  //CONTROLS MAP
  checkKey(event) {
    const keyDown = event.type === 'keydown';
    const keyUp = event.type === 'keyup';
    const key = event.key;
    //clearTimeout(this.timeout);
    
    console.log(this.state)
    if (keyDown && key != 'ArrowUp') {
      this.mapMovementList(key);
    }
    else if (keyDown && key === 'ArrowUp') {
      this.mapMovementList(key);
      if (this.state.direction === 'static') {
        setTimeout(() => this.removeControls(), 130)
      }
    }
    else if (keyDown && this.state.movement === 'LR') {
      console.log('ta funcjonado')
      
      //this.timeout
    }
    else if (keyUp && this.state.nextState === 'idle') {
      this.resetDefault()
      //console.log(this.state.nextState === 'idle')
      // this.timeout = setTimeout(() => {
      //   this.resetDefault();
      // }, 120)
    }
  }
  
  checkButton(event) {
    const touchStart = event.type === 'touchstart';
    const touchEnd = event.type === 'touchend';
    
    const button = event.target.parentNode.classList[1];
    if(touchStart && button != 'ArrowUp') {
      this.mapMovementList(button);
    }
    else if (touchStart && button === 'ArrowUp') {
      this.mapMovementList(button);
      if(this.state.direction === 'static') {
        setTimeout(() => this.removeControls(), 130)
      }
    }
    else if (touchEnd && this.state.nextState === 'idle') {
      this.resetDefault();
    }
  }
  
  //MOVEMENT LIST
  mapMovementList(button) {
    if (button === 'ArrowLeft' && this.state.currentState === 'jump') {
      this.state.direction = 'leftMovement';
      console.log('ativou')
    }
    else if(button === 'ArrowRight' && this.state.currentState === 'jump') {
      this.state.direction = 'rightMovement';
    }
    else if (button === 'ArrowLeft') {
      this.state = {
        currentState: 'leftMovement',
        nextState: 'idle',
        movement: 'LR'
      }
    }
    else if (button === 'ArrowRight') {
      this.state = { 
        currentState: 'rightMovement',
        nextState: 'idle',
        movement: 'LR'
      }
    }
    else if (button === 'ArrowUp') {
      this.state = {
        currentState: 'jump', 
        direction: 'static',
        nextState: 'fall', 
        gravity: 0.36,
        velocity: 6,
      };
    }
    else if (button === 'ArrowDown') {
      this.state = {
        currentState: 'crouch',
        nextState: 'idle'
      }
    }
  }
  
  //CONFIGS
  bindEvents() {
    this.checkKey = this.checkKey.bind(this);
    this.addButtons = this.addButtons.bind(this);
    this.checkButton = this.checkButton.bind(this);
    this.removeButtons = this.removeButtons.bind(this);
  }
  
  init() {
    this.bindEvents();
    this.addControls();
  }
}
