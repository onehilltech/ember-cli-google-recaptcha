# ember-cli-google-recaptcha

[![Greenkeeper badge](https://badges.greenkeeper.io/onehilltech/ember-cli-google-recaptcha.svg)](https://greenkeeper.io/)

EmberJS add-on for using Google reCAPTCHA services

[![npm version](https://img.shields.io/npm/v/ember-cli-google-recaptcha.svg?maxAge=2592000)](https://www.npmjs.com/package/ember-cli-google-recaptcha)
[![Dependencies](https://david-dm.org/onehilltech/ember-cli-google-recaptcha.svg)](https://david-dm.org/onehilltech/ember-cli-google-recaptcha)
[![devDependencies Status](https://david-dm.org/onehilltech/ember-cli-google-recaptcha/dev-status.svg)](https://david-dm.org/onehilltech/ember-cli-google-recaptcha?type=dev)

## Features

* Supports multiple reCAPTCHA components on the same page, and across different pages.
* Designed to support seamless integration into an EmberJS application.
* Proper binding of attributes to options for real-time, dynamic updates.
* Handle events as actions for interactive designs.
* Auto-loading and configuring of scripts that correspond with appropriate lifecycle events.

## Installation

    ember install ember-cli-google-recaptcha
    
## Getting Started


### Configuring application for reCAPTCHA

Before you can use reCAPTCHA, you must first [sign up for the service](https://www.google.com/recaptcha), 
and register a new site. After you register the new site, add your `siteKey` from the client-side integration
settings to `config/environment.js`.

```javascript 1.6
let ENV = {
  // ...
  
  'ember-cli-google': {
    recaptcha: {
      siteKey: 'This is where my siteKey goes'
    }
  }
};
```

If you do not configur the environment variables correctly, then the add-on will 
fail.

### Adding reCAPTCHA to your application

To add reCAPTCHA support to any form, just add desired reCAPTCHA component (either v2 
or invisible) inside the form html tags:

```handlebars
<form>
  <!-- other form elements -->
  
  {{g-recaptcha-invisible verified=(action (mut recaptcha)) expired=(action "expired") reset=reset}}
</form>
```

The example above will insert an invisible reCAPTCHA component into the form. When the
user is verified to not be a robot, the `verified` action is called. It will mutate the
`recaptcha` property so that it contains the reCAPTCHA response. This value must be 
uploaded to the server with any other additional form data so your server is able to 
verify the submission is not from a robot.

The `expired` action is called when the current reCAPTCHA response expires. Lastly, the
`reset` attribute, which only applies to invisible, notifies the component to reset itself.
This is important if the reCAPTCHA fails or expires, or the server request fails and needs
a new reCAPTCHA value for subsequent requests.

Happy Coding!
