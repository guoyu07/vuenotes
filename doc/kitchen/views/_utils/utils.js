export default {
  debounce: function(func, wait, immediate) {
    let timeout, result;
    return function() {
      let context = this;
      let args = arguments;
      let later = function() {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(context, args);
      return result;
    };
  },
  throttle: function(func, wait) {
    let context, args, timeout, result;
    let previous = 0;
    let later = function() {
      previous = new Date();
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      let now = new Date();
      let remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    }
  }
}
