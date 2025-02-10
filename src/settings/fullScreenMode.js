import { animations, parameters } from "../globalVariables/globalVariables.js";
import pause from "./pause.js"
import { restartAllFunctions, startAgain } from "./restart.js";

const game = document.getElementById('game');
const fullScreenButtonMain = document.getElementById('fullScreenStart');
const startButton = document.getElementById('start');

document.addEventListener('fullscreenchange', () =>{
    if (!document.fullscreenElement) {
        if(!parameters.loadingProcces) restartAllFunctions(parameters.images.characterImages);
        fullScreenButtonMain.style.display = 'inline';
        startButton.style.display = 'none';
    }
});

document.addEventListener('visibilitychange', () =>{
    if(document.hidden && (animations.moment.gameProcess || animations.moment.generating)) pause();
});

async function fullScreen(){
    try{
        if(!document.fullscreenElement){
            if(game.requestFullscreen) await game.requestFullscreen();

            await waitForFullscreenChange(); // To be sure that we are fullscreen
            
            if(parameters.loadingProcces) console.log('loading will continue');
            else if(parameters.gameStarted){
                restartAllFunctions();
                await startAgain(parameters.images.characterImages);
                startButton.style.display = 'inline';
            }

            fullScreenButtonMain.style.display = 'none';
        }else{
            if(document.exitFullscreen) await document.exitFullscreen();

            if(!parameters.loadingProcces) restartAllFunctions(parameters.images.characterImages);
            fullScreenButtonMain.style.display = 'inline';
        }
    }catch(err){
        console.error('Your browser does not support out game, check for updates');
    }
}

function waitForFullscreenChange() {
    return new Promise(resolve => {
        const handler = () => {
            document.removeEventListener('fullscreenchange', handler);
            resolve();
        };
        document.addEventListener('fullscreenchange', handler);
    });
}

export default fullScreen;