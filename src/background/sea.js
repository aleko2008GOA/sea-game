import { animations, parameters } from "../globalVariables/globalVariables.js";
// canvases
/** @type {HTMLCanvasElement} */
const sea_canvas_waves_left = document.getElementById('waves_left');
const sea_canvas_waves_right = document.getElementById('waves_right');

/** @type {CanvasRenderingContext2D} */
const sea_waves_left = sea_canvas_waves_left.getContext('2d');
const sea_waves_right = sea_canvas_waves_right.getContext('2d');

let left_display = 'block';
let right_display = 'none';

let index = 0;

function background_sea(){
    loadImages('./src/assets/waves/wave-left.png', './src/assets/waves/wave-right.png')
        .then(([img_left, img_right]) =>{
            wave_animation(img_left, img_right);
            animations.sea.seaAnimationFrameId = requestAnimationFrame(startAnimation);
            animations.sea.seaFrameFunc = startAnimation;
        })
        .catch((err) => console.log('Waves generating error: ' + err));

    // images
    function loadImages(src_left, src_right){
        return new Promise((resolve, reject) =>{ 
            const wave_left_img = new Image();
            const wave_right_img = new Image();
            
            wave_left_img.src = src_left;
            wave_right_img.src = src_right;

            let loadedImages = 0;
            const images = [];

            function checkResolve() {
                if (loadedImages === 2) resolve(images);
            }
    
            wave_left_img.onload = () => {
                loadedImages++;
                images[0] = wave_left_img;
                checkResolve();
            };
    
            wave_right_img.onload = () => {
                loadedImages++;
                images[1] = wave_right_img;
                checkResolve();
            };

            wave_left_img.onerror = (e) => reject(e);
            wave_right_img.onerror = (e) => reject(e);
        });
    }

    // wave animation
    const waveWidth = 30;
    const waveHeight = 15;
    let waves = 0;

    let lastStamp = 0;
    let seconds = 0;

    // wave animation function
    function wave_animation(img_left, img_right){
        for (let i = 0; i < 201; i++) {
            for (let j = 0; j < 101; j++) {
                let x1 = i % 2 == waves ? waveWidth * (j - 1) + 5 : waveWidth * (j - 1) + 15;
                let y1 = waveHeight * (i - 1) + 5;

                if (j % 2 == waves) {
                    sea_waves_left.drawImage(img_left, x1, y1, 20, 5);
                } else {
                    sea_waves_left.drawImage(img_right, x1, y1 + 5, 20, 5);
                }
            }
        }

        for (let i = 0; i < 201; i++) {
            for (let j = 0; j < 101; j++) {
                let x1 = i % 2 == waves ? waveWidth * (j - 1) + 5 : waveWidth * (j - 1) + 15;
                let y1 = waveHeight * (i - 1) + 5;

                if (j % 2 != waves) {
                    sea_waves_right.drawImage(img_left, x1, y1, 20, 5);
                } else {
                    sea_waves_right.drawImage(img_right, x1, y1 + 5, 20, 5);
                }
            }
        }
    }

    function startAnimation(timeStamp){
        let deltaStamp = (timeStamp - lastStamp) / 1000;
        lastStamp = timeStamp;
        if(animations.moment.gameProcess && !animations.moment.pause) seconds += deltaStamp;
        
        if(seconds >= 1){
            animations.sea.waveSpeed -= 2 * Math.floor(seconds);
            seconds -= Math.floor(seconds);
        }

        if(index < animations.sea.waveSpeed / 1000 / deltaStamp) index++;
        else{
            index = 0;

            sea_canvas_waves_left.style.display = left_display;
            sea_canvas_waves_right.style.display = right_display;
    
            left_display = left_display == 'block' ? 'none' : 'block';
            right_display = right_display == 'block' ? 'none' : 'block';
        }
        requestAnimationFrame(startAnimation);
    }
}

export { background_sea };