// Fade In //
function fadeIn(target, duration, callback) {
  target.style.removeProperty('display');
  let display = window.getComputedStyle(target).display;

  if (display === 'none') {
    display = 'block';
  }

  target.style.display = display;
  target.transitionProperty = 'opacity';
  target.style.transitionDuration = duration + 'ms';
  target.style.opacity = 1;

  window.setTimeout(() => {
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');

    if (callback) {
      callback();
    }
  }, duration);
}

// Fade Out //
function fadeOut(target, duration, callback) {
  target.transitionProperty = 'opacity';
  target.style.transitionDuration = duration + 'ms';
  target.style.opacity = 0;

  window.setTimeout(() => {
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');

    if (callback) {
      callback();
    }
  }, duration);
}

// Slide Collapse //
function slideCollapse(target, direction = 'vertical', desnitation = 0, duration = 500, callback) {
  if (direction === 'vertical') {
    target.style.transitionProperty = 'height, margin, padding opacity';
    target.style.height = target.offsetHeight + 'px';
  }
  else if (direction === 'horizontal') {
    target.style.transitionProperty = 'width, margin, padding opacity';
    target.style.width = target.offsetWidth + 'px';
  }

  target.style.transitionDuration = duration + 'ms';
  target.style.boxSizing = 'border-box';
  target.style.opacity = 1;
  target.style.overflow = 'hidden';
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;

  window.setTimeout(() => {
    if (direction === 'vertical') {
      target.style.height = desnitation;
    }
    else if (direction === 'horizontal') {
      target.style.width = desnitation;
    }

    target.style.opacity = 0;
  }, 0);

  window.setTimeout(() => {
    target.style.display = 'none';
    if (direction === 'vertical') {
      target.style.removeProperty('height');
    }
    else if (direction === 'horizontal') {
      target.style.removeProperty('width');
    }
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    target.style.removeProperty('overflow');
    target.style.removeProperty('opacity');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');

    if (callback) {
      callback();
    }
  }, duration);
}
// Slide Expand //
function slideExpand(target, direction = 'vertical', starting = 0, duration = 500, callback) {
  target.style.removeProperty('display');
  let display = window.getComputedStyle(target).display;

  if (display === 'none') {
    display = 'block';
  }

  target.style.display = display;
  let width = target.offsetWidth;
  let height = target.offsetHeight;

  if (direction === 'vertical') {
    target.style.width = starting;
    target.style.transitionProperty = "width, margin, padding opacity";
  }
  else if (direction === 'horizontal') {
    target.style.width = starting;
    target.style.transitionProperty = "width, margin, padding opacity";
  }

  target.style.overflow = 'hidden';
  target.style.opacity = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.style.boxSizing = 'border-box';
  target.style.transitionDuration = duration + 'ms';
  target.style.removeProperty('padding-top');
  target.style.removeProperty('padding-bottom');
  target.style.removeProperty('margin-top');
  target.style.removeProperty('margin-bottom');

  window.setTimeout(() => {
    if (direction === 'vertical') {
      target.style.height = height + 'px';
    }
    else if (direction === 'horizontal') {
      target.style.width = width + 'px';
    }
    target.style.opacity = 1;
  }, 0);

  window.setTimeout(() => {
    if (direction === 'vertical') {
      target.style.removeProperty('height');
    }
    else if (direction === 'horizontal') {
      target.style.removeProperty('width');
    }

    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');

    if (callback) {
      callback();
    }
  }, duration);
}

// Slide Up //
function slideUp(target, duration = 500, callback) {
  target.style.transitionProperty = 'height, margin, padding, opacity';
  target.style.transitionDuration = duration + 'ms';
  target.style.boxSizing = 'border-box';
  target.style.height = target.offsetHeight + 'px';
  target.style.opacity = 1;
  target.style.overflow = 'hidden';
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;

  window.setTimeout(() => {
    target.style.height = 0;
  }, 0);

  window.setTimeout(() => {
    target.style.display = 'none';
    target.style.removeProperty('height');
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    target.style.removeProperty('overflow');
    target.style.removeProperty('opacity');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    //alert("!");
    if (callback) {
      callback();
    }

  }, duration);
}

// Slide Down //
function slideDown(target, duration = 300, callback) {
  target.style.removeProperty('display');
  let display = window.getComputedStyle(target).display;

  if (display === 'none') {
    display = 'block';
  }

  target.style.display = display;
  let height = target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.opacity = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.style.boxSizing = 'border-box';
  target.style.transitionProperty = "height, margin, padding, opacity";
  target.style.transitionDuration = duration + 'ms';
  target.style.removeProperty('padding-top');
  target.style.removeProperty('padding-bottom');
  target.style.removeProperty('margin-top');
  target.style.removeProperty('margin-bottom');

  window.setTimeout(() => {
    target.style.height = height + 'px';
    target.style.opacity = 1;
  }, 0);

  window.setTimeout(() => {

  }, duration);

  window.setTimeout(() => {
    target.style.removeProperty('height');
    target.style.removeProperty('overflow');

    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');

    if (callback) {
      callback();
    }
  }, duration);

  window.setTimeout(() => {
    target.style.removeProperty('opacity');
  }, duration * 2);
}

function slideToggle(target, duration = 300) {
  if (window.getComputedStyle(target).display === 'none') {
    slideDown(target, duration);
    return true;
  } else {
    slideUp(target, duration);
    return false;
  }
}

export { fadeIn, fadeOut, slideCollapse, slideExpand, slideUp, slideDown, slideToggle }