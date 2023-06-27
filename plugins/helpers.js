export default ({app}, inject) => {
  inject('validateEmail', email => /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
  inject('debounce', (method, delay) => {
    clearTimeout(method._tId);
    method._tId = setTimeout(function () {
      method();
    }, delay);
  })
  inject('slugify', (str) => {
    str = str.replace(/^\s+|\s+$/g, '');
    str = str.toLowerCase();
    str = str.replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    return str;
  })
}
