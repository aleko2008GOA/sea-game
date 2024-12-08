import loading from './story/loading.js';
import { background_sea } from './background/sea.js';
import { icebergs } from './objects/icebergs.js';
import { lights } from './objects/lights.js';
import { character_moves } from './character/character_moving.js';
import restart from './settings/restart.js';
import characterImages from './images/loadingImages/character_images.js';
import pause from './settings/pause.js';
import { checkDevice } from './settings/onMobile.js';

checkDevice();
background_sea();
const {icebrg_coordinate_arr, iceberg_grid_position} = icebergs();
const {lights_coordinate_arr, lights_grid_position, lights_background} = lights(icebrg_coordinate_arr);
characterImages
    .then(characterImagesArray =>{
        character_moves(iceberg_grid_position, lights_grid_position, lights_background, characterImagesArray);
        return characterImagesArray;
    })
    .then(characterImagesArray => {
        restart(characterImagesArray);
    })
pause();
loading(true, 100);