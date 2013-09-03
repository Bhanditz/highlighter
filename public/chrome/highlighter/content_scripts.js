//debugging
var console = chrome.extension.getBackgroundPage().console

chrome.contextMenus.create({
  title: 'Share a highlight of this!',
  contexts: ['all'],
  onclick: highlightCb
});

function highlightCb(info, tab) {
  var link = makeLink(info.pageUrl, info.selectionText.trim());
  prompt('Here\'s a link to your highlight for sharing!', link);
}

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
