import { animations, parameters } from "../globalVariables/globalVariables.js";

const pauseButton = document.querySelectorAll('.pause_button');
const pauseButtonTopLeft = document.getElementById('pause_button_top_left');
const pauseButtonOnscreen = document.getElementById('pause_button_onscreen');
const settingsBar = document.getElementById('settings_bar');

let needToBeStunned = false;
let needToBeImmune = false;

function pause(){
    pauseButton.forEach(but => {
        but.addEventListener('click', () =>{
            if(window.getComputedStyle(settingsBar).display === 'none'){
                if(animations.moment.generating && animations.generator.interval){
                    clearInterval(animations.generator.interval);
                    animations.generator.interval = null;
                }else if(animations.moment.gameProcess){
                    if(animations.animationFrameId){
                        cancelAnimationFrame(animations.animationFrameId);
                        animations.animationFrameId = null;
                    }
                    if(parameters.timeInterval){
                        clearInterval(parameters.timeInterval);
                        parameters.timeInterval = null;
                    }
                    if(animations.stunFrameId){
                        cancelAnimationFrame(animations.stunFrameId);
                        animations.stunFrameId = null;
                        needToBeStunned = true;
                    }
                    if(animations.immutableFrameId){
                        cancelAnimationFrame(animations.immutableFunc);
                        animations.immutableFrameId = null;
                        needToBeImmune = true;
                    }
                }

                settingsBar.style.display = 'flex';
                pauseButtonTopLeft.style.display = 'none';
            }else{
                if(animations.moment.generating && !animations.generator.interval)
                    animations.generator.intervalFunc();
                else if(animations.moment.gameProcess){
                    if(!animations.animationFrameId)
                        animations.animationFrameId = requestAnimationFrame(animations.animationFrameFunc);
                    if(!parameters.timeInterval)
                        parameters.timeInterval = setInterval(() => parameters.timeChangeFunc(), 10);
                    if(!animations.stunFrameId && needToBeStunned){
                        needToBeStunned = false;
                        animations.stunFrameId = requestAnimationFrame(animations.stunFunc);
                    }
                    if(!animations.immutableFrameId && needToBeImmune){
                        needToBeImmune = false;
                        animations.immutableFrameId = requestAnimationFrame(animations.immutableFunc);
                    }
                }

                settingsBar.style.display = 'none';
                pauseButtonTopLeft.style.display = 'inline';
            } 
        });
    })
}

export default pause;