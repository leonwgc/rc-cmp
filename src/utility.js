function addClass(el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    if (el.className.indexOf(className) === -1) {
      el.className = el.className.trim() + ' ' + className;
    }
  }
}

function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    if (el.className.indexOf(className) > -1) {
      el.className = el.className.replace(new RegExp(className, 'g'), '');
    }
  }
}

function reflow(element) {
  return element.offsetHeight;
}

export default {
  addClass,
  removeClass,
  reflow
};
