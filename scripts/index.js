//IMPORTS
import StageBackground from './modules/stage-background';
import StandardStates from './modules/sagat-states/standard-states';

//CANVAS
const myCanvas = document.querySelector('#my-canvas');
const ctx = myCanvas.getContext('2d');


//INSTANCES
const stageBackground = new StageBackground();
const standardStates = new StandardStates();
stageBackground.init();
standardStates.init();



//DISABLE CONTEXT MENU
window.oncontextmenu = (event) => {
  event.preventDefault();
  event.stopPropagation();
  return false;
}

//ANIMATION LOOP
const animationLoop = () => {
  stageBackground.animate(ctx, standardStates.cX);
  standardStates.animate(ctx, stageBackground.transition);
  
  // ctx.fillStyle = '#000';
  // ctx.fillRect(0, (132 + 75), 300, 2);
  // ctx.fillRect(42, 0, 2, 300);
  
  requestAnimationFrame(animationLoop);
}

animationLoop();
