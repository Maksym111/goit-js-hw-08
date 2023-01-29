import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

import { save, load } from './local-storage';

const KEY_DATA = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(saveVideoDate, 1000));

function saveVideoDate(e) {
  save(KEY_DATA, {
    time: e.seconds,
  });
}

window.addEventListener('DOMContentLoaded', loadVideoDate);

function loadVideoDate() {
  player.setCurrentTime(load(KEY_DATA).time);
}
