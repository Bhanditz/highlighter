function getLink() {
  url = document.forms['get-link-form']['url'].value;
  quote = document.forms['get-link-form']['quote'].value;
  if (!(url && quote)) {
    alert('your form is bad');
  } else {
    link = window.location.host + '/q?u=' + encodeURIComponent(url) + '&s=' + encodeURIComponent(quote);
    if(link.length > 2000) {
      alert('quote + url too long, will fix this later');
    } else {
      alert(link);
    }
  }
}
