# Javascript to capture UTM parameters

This will caputure the UTM parameters from the URL on a landing page, store these as a first-party cookie and then on a contact form page, pre-populate form fields with these values. 

Currently, this is configured to capture the following UTM parameters:
- utm_source
- utm_medium
- utm_campaign
- utm_term - not configured at this time
- utm_content - not configured at this time

I have not configured any specific cookie duration yet, but this can be added by modifying the `utm-capture.js`  file.

## Dependencies
This implementation has a single code dependency, the [Javascript Cookie library](https://github.com/js-cookie/js-cookie), a simple, lightweight JavaScript API for handling cookies, this is mature and well-maintained.

## Installation and use
I’m assuming a fairly simple deployment of this, and not integrating this with a CI/CD process, but instead using the CDN URL for the Javascript Cookie library, and then loading 2 javascript includes.

On all pages:
```html
  <script src="https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.js"></script>
  <script src="utm-capture.js"></script>
```
Place these two at the bottom of every page on the website. If needed, adjust the path to the `utm-capture.js `file.  This will allow for any landing page to capture and store the UTM Parameters to a cookie.

On the contact form page:
In addition to the two lines of code above, also add:
```html
<script src="utm2form.js"></script>
```
This small Javascript will write the cookie values to the form fields. Pay close attention to the HTML ID of the form fields.
```html
    document.getElementById("input_3_1").value = Cookies.get('utm_source');
    document.getElementById("input_3_5").value = Cookies.get('utm_medium');
    document.getElementById("input_3_6").value = Cookies.get('utm_campaign');
```

| UTM field    | Form field ID |
| ------------ | ------------- |
| utm_source   | input_3_1     |
| utm_medium   | input_3_5     |
| utm_campaign | input_3_6     |

If your form is using different values for the form field IDs, adjust the JS code.

> Note: The sample from HTML uses visible text form fields instead of hidden fields for easy testing. Change the input type from “text” to “hidden” when ready

You can use what ever method works best for you to deploy this code to your site, and do not have to use the 2 JS files I’ve created. If it is easier, you can add the code to the site wide JS scripts, or a short-code, etc… the key concepts are:
1. All pages need to link to the third-party Javascript Cookie file, per instructions from their [GitHub repo](https://github.com/js-cookie/js-cookie).
2. All pages that could be landing pages need to have the Javascript code found in the `utm-capture.js` file.
3. The contact form page also needs to have the Javascript code contained in the `utm2form.js` file.
	1. The `getElementById` values in this code need to match the hidden form field IDs in the contact form.

  ## Local testing
  In order for this to work, these pages will need to be served up by some sort of web server. You can open the files in VS Code, then use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) plug in.

  ## Setting a cookie expiration date

  to set an expiration date in days, you add `, { expires: 7 }` to the end of the "Cookies.set" command, per the example below. Please note, you need to do this for all 3 instances. In this example, the cookie will expire after 7 days. 

  ```
    if(Cookies.get('utm_source') == null || Cookies.get('utm_source') == "") {
        Cookies.set('utm_source', source, { expires: 7 });
        };
    if(Cookies.get('utm_medium') == null || Cookies.get('utm_medium') == "") {
        Cookies.set('utm_medium', medium, { expires: 7 });
        };
    if(Cookies.get('utm_campaign') == null || Cookies.get('utm_campaign') == "") {
        Cookies.set('utm_campaign', campaign, { expires: 7 });
        };
  ```

  ### How to test cookie expiration

  Check the cookie expiration date in your browser's developer tools. Here's an example from Firefox:
  [Firefox screenshot](https://res.cloudinary.com/usa2pt/image/upload/v1680167841/fileShare/cookieExpires_gwdqon.jpg)