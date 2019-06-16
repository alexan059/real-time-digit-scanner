/**
 * Executes Callback after DOM is loaded
 * Doesn't work in IE8 or lower
 *
 * @param cb Callback
 */
export const ready = cb => document.addEventListener('DOMContentLoaded', cb);

/**
 * jQuery style query selector
 *
 * @param el Element ID or class
 */
export const $ = el => document.querySelector(el);
