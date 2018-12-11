export function isInViewport (elem, root = window) {
  let elemBox = elem.getBoundingClientRect()
  return elemBox.top < root.offsetHeight
};
