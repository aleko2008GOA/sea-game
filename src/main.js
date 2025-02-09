import { setParameters } from './settings/setParameters.js';
import fullScreen from './settings/fullScreenMode.js';
import loading from './story/loading.js';
import { background_sea } from './background/sea.js';
import { icebergs } from './objects/icebergs.js';
import { lights } from './objects/lights.js';
import { character_moves } from './character/character_moving.js';
import { restart } from './settings/restart.js';
import characterImages from './images/loadingImages/character_images.js';
import './settings/pause.js';
import { checkDevice } from './settings/onMobile.js';
import { drawJoystick } from './settings/joystick.js';
import { animations, parameters } from './globalVariables/globalVariables.js';
import './settings/animationFrameFPS.js';
import './settings/setFPS.js';
import { drawRain } from './background/lightStorm.js';
import { drawSnow } from './background/snow.js';

setParameters(); // set parameters by device
checkDevice(); // check device
document.querySelectorAll('.fullScreen').forEach(but => {
    but.addEventListener('click', async () => {
        if(
            (window.matchMedia("(orientation: landscape)").matches && 
            (parameters.device.includes('Mobile') || parameters.device.includes('Tablet') || parameters.device.includes('Ebook'))) || 
            (screen.width > screen.height)
        ){
            await fullScreen(); // fullScreen mode
            setTimeout(startGame, 0); // Microtasks did not work (I think full screen is macro) so i used Macrotask by timeout
        }else alert("Rotate your devise!"); // device should be landscape
    });
}); 

async function startGame() {
    if(!parameters.gameStarted){
        // gameStarted
        parameters.gameStarted = true;
        await loading(1);
        // start all animation
        animations.allFrameId = requestAnimationFrame(animations.allFrameFunc);
        await loading(2);
        // draw joistick
        drawJoystick();
        await loading(5);
        // draw rain animation
        await drawRain();
        await loading(35);
        // draw snow animation
        await drawSnow();
        await loading(65);
        // draw sea
        background_sea();
        await loading(70);
        // draw icebergs
        const { icebergGridPosition } = await icebergs();
        await loading(75);
        // draw lights
        await lights(icebergGridPosition);
        await loading(80);
        // load character position images
        const characterImagesArray = await characterImages;
        await loading(85);
        // character move logic
        character_moves(icebergGridPosition, characterImagesArray);
        await loading(95);
        // add images to global variables
        parameters.images.characterImages = characterImagesArray;
        await loading(99);
        // restart function
        restart(characterImagesArray);
        await loading(5000);
    }
}