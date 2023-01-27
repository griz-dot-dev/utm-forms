    // Parse the URL
    function getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
  // Give the URL parameters variable names
  var source = getParameterByName('utm_source');
  var medium = getParameterByName('utm_medium');
  var campaign = getParameterByName('utm_campaign');
  // set cookie values
  if(Cookies.get('utm_source') == null || Cookies.get('utm_source') == "") {
    Cookies.set('utm_source', source);
    };
if(Cookies.get('utm_medium') == null || Cookies.get('utm_medium') == "") {
    Cookies.set('utm_medium', medium);
    };
if(Cookies.get('utm_campaign') == null || Cookies.get('utm_campaign') == "") {
    Cookies.set('utm_campaign', campaign);
    };