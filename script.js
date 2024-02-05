
// this cool effect I took directly from https://github.com/garrettallen/fireflies/blob/gh-pages/fireflies.js but changed the use of var to let or const where appropriate

const fireFlies = (function() {

  function checkCss() {
    if (Array.isArray(document.styleSheets) && document.styleSheets.length > 0) {
      return document.styleSheets[0];
    }
  
    const styleElement = document.createElement('style');
    document.head.appendChild(styleElement);
    return styleElement.sheet;
  }

  function randomTranslate(position, max) {
    return Math.floor((Math.random() * max) - position);
  }

  function keyframeFactory(class_name, x, y, width, height) {
    const keyframe_percent = Math.floor(Math.random() * 40);
    const keyframe_percent2 = 50 + Math.floor(Math.random() * 40);
    const plus_minus = 3;
    return `
      @keyframes ${class_name} {
        50% {
          transform: translate(${x > 0 ? -width : width}px, ${randomTranslate(y, height)}px);
        }
        ${keyframe_percent}% {
          opacity: 1;
        }
        ${keyframe_percent - plus_minus}% {
          opacity: 0;
        }
        ${keyframe_percent + plus_minus}% {
          opacity: 0;
        }
        ${keyframe_percent2}% {
          opacity: 1;
        }
        ${keyframe_percent2 - plus_minus}% {
          opacity: 0;
        }
        ${keyframe_percent2 + plus_minus}% {
          opacity: 0;
        }
      }`;
  }

  function ruleFactory(rule_name, duration, size, color, animation_name, x, y) {
    return `
      .${rule_name} {
        position: absolute;
        top: ${y}px;
        left: ${x}px;
        color: ${color};
        text-shadow: 0 0 3px ${color};
        font-size: ${size}px;
        opacity: 0;
        animation: ${animation_name} ${duration} linear infinite;
      }`;
  }

  function hatchFlies(config) {
    config = config || {};
    const flyNodes = [];
    const flies = config.number_flies || 40;
    const color = config.color || '#ffb149';
    const element = config.elem || 'body';
    let element_dom;
    if (document.querySelectorAll(element).length) {
      element_dom = document.querySelectorAll(element)[0];
    } else {
      console.error(`No elements were found that match the selector: '${element}'. Please check it and try again.`);
      return;
    }
  
    // Adjust the following lines to get the correct height of the page
    const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const width = element_dom.clientWidth;
  
    // Get the stylesheet using checkCss
    const styleSheet = checkCss();
  
    for (let fly = 0; fly < flies; fly++) {
      const class_name = `a${fly}`;
      const animation_name = `k${fly}`;
      flyNodes.push(`<div class=${class_name}>&bull;</div>`);
      const size = 1 + Math.ceil(Math.random() * 15);
      const duration = `${5 + (Math.random() * 60)}s`;
      const x = Math.random() < 0.5 ? 0 : width;
      const y = Math.floor(Math.random() * height);
      styleSheet.insertRule(ruleFactory(class_name, duration, size, color, animation_name, x, y), 0);
      styleSheet.insertRule(keyframeFactory(animation_name, x, y, width, height), 0);
    }
  
    // Set the height of the #flies container to cover the entire page below the navbar
    element_dom.innerHTML += `<div id='flies' style='position: absolute; z-index: 999; top: 0; left: 0; overflow: hidden; width: ${width}px; height: ${height}px;'>${flyNodes.join('')}</div>`;
  }

  return function(config) {
    checkCss();
    hatchFlies(config);
    return;
  };

})();
