function makeLink(url, highlighted) {
  var link = 'http://highlighter-io.herokuapp.com/q?';
  link += 'u=' + encodeURIComponent(url);
  if (link.length + encodeURIComponent(highlighted).length > 2000) {
    var partLength = (2000 - link.length - 6) / 2;
    var start = encodeURIComponent(highlighted.slice(0, partLength));
    var end = encodeURIComponent(highlighted.slice(-1 * partLength));
    link += '&s=' + start + '&e=' + end;
    alert('this is probably too long and probably won\'t work...');
  } else {
    link += '&s=' + encodeURIComponent(highlighted);
  }
  return link;
}

function getLink() {
  url = document.forms['get-link-form']['url'].value.trim();
  quote = document.forms['get-link-form']['quote'].value.trim();
  if (!(url && quote)) {
    alert('your form is bad');
  } else {
    link = makeLink(url, quote);
    prompt('Here\'s a link to your highlight for sharing!', link);
  }
}
