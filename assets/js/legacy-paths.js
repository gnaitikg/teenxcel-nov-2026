/*
 * TeenXcel legacy path helper.
 * Course and mentor images are stored by the backend API with their old paths
 * (for example "/teenxcel/asset/courses/WEB SECURITY.png"). The site now lives
 * at the domain root and images moved into /assets/images/, so this maps the
 * old stored values to the new locations. Unknown values pass through unchanged.
 */
(function (w) {
  var RULES = [
    ['asset/courses/', 'assets/images/courses/'],
    ['course-page/Mentor/', 'assets/images/mentors/']
  ];
  w.txAsset = function (u) {
    if (typeof u !== 'string' || !u) return u;
    var p = u.trim().replace(/^https?:\/\/(www\.)?teenxcel\.in/i, '');
    if (/^(https?:|data:|blob:|\/\/)/i.test(p)) return u;
    p = p.replace(/^\/+/, '').replace(/^teenxcel\//i, '');
    for (var i = 0; i < RULES.length; i++) {
      if (p.indexOf(RULES[i][0]) === 0) return '/' + RULES[i][1] + p.slice(RULES[i][0].length);
    }
    return u;
  };
})(window);
