export const touchState = { moveX: 0, moveY: 0, jump: false, fire: false };
export function isTouchDevice() { return 'ontouchstart' in window || navigator.maxTouchPoints > 0; }
export function setupTouchControls() { if (isTouchDevice()) document.body.classList.add('touch'); }
