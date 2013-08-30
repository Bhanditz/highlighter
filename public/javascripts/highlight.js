var escapeRegExp;
(function () {
    var specials = [
        // order matters for these
          "-", "[", "]"
        // order doesn't matter for any of these
        , "/", "{", "}", "(", ")", "*", "+", "?", ".", "\\", "^", "$", "|"
      ]
    , regex = RegExp('[' + specials.join('\\') + ']', 'g');
  escapeRegExp = function (str) {
    return str.replace(regex, "\\$&");
  };
}());

$(function() {
  $('#hiframe').load(function() {
    var $this = $(this);
    
    // highlight that shit
    var fullText = $this.contents().find('body').text();
    
    var startText = _.unescape(window.__highlighter.start);
    if (window.__highlighter.end) {
      var endText = _.unescape(window.__highlighter.end)
      var htext = fullText.match(RegExp(startText + '(.|\n)*' + endText));
    } else {
      var htext = startText;
    }
    $bodyWithText = $this.contents().find('body:contains(\'' + htext + '\')');
    
      // for debugging
    console.log('highlighter is matching:\n' + htext)
    if ($bodyWithText) {
      console.log('highlighter has found the text');
    } else {
      console.log('highlighter has not found the text');
    }
    
    $bodyWithText.highlight(htext);
    $htext = $bodyWithText.find('.highlight');
    $htext.css('background-color', 'yellow');
    $this.contents().find('body').animate({scrollTop: $htext[0].offsetTop});
  });
});
