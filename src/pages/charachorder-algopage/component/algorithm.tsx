import React, {useState} from "react";
import { _actionMap, _keyMapDefaults, _keyMap, _chordMaps  } from "../../../../src/pages/manager/controls/maps";

export const getCheckAlgo = ()  => {
    
    window.performance = window.performance || {};
    performance.now = 
    performance.now       ||
    performance.mozNow     ||
    performance.msNow      ||
    performance.oNow       ||
    performance.webkitNow  ||
    Date.now * 1.0; /*none found - fallback to browser default */


  let body = document.getElementById('txt_Name');

  if(sessionStorage.getItem('exampleItem') == null || sessionStorage.getItem('exampleItem') == 'false'){
  let bestKeyTime = 10000;
  let keyDownTime = performance.now();
  let isKeyDown = false;


  body.onkeydown = function (e) {
    if ( !e.metaKey ) {
        e.stopPropagation();
    }

    if (!isKeyDown) {
      isKeyDown = true;
      keyDownTime = 1;
      console.log('THis is the DownTime '+ performance.now());

    }
  };

  body.onkeyup = function (e) {
    if ( !e.metaKey ) {
      e.stopPropagation();
    }
    isKeyDown = false;
    let upTime = performance.now();
    console.log('THis is the UpTime '+ upTime);
    let heldTime = Math.ceil(upTime - keyDownTime);
    console.log('What is this Value '+ keyDownTime);
    console.log(keyDownTime);
    console.log('This is the held time '+ heldTime);
    bestKeyTime = Math.min(bestKeyTime, heldTime);
    console.log('THis is the best keyTime '+bestKeyTime)
    let scanRate = Math.min(1000 / (bestKeyTime), 1000);

    console.log(bestKeyTime);
    console.log(scanRate);
    console.log('Here it is I am in Key Up')


  };
  }
  
  }
