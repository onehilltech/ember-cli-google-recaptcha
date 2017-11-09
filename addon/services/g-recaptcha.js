import Ember from 'ember';

/**
 * Ember.js service for g-recaptcha. The service is the preferred approach because
 * we need to ensure the recaptcha script is not loaded multiple times, while allowing
 * the components to invoke methods on the grecaptcha window object.
 *
 * The service is used by reCAPTCHA-v2 and reCAPTCHA-invisible.
 */
export default Ember.Service.extend ({
  init () {
    this._super (...arguments);

    const ENV = Ember.getOwner (this).resolveRegistration ('config:environment');
    let siteKey = Ember.get (ENV, 'ember-cli-google.recaptcha.siteKey');

    Ember.assert ('Missing ember-cli-google.recaptcha.siteKey in config/environment.', !!siteKey);

    this.set ('_siteKey', siteKey);
  },

  /// Site key for the application.
  siteKey: Ember.computed.readOnly ('_siteKey'),

  /**
   * Renders the container as a reCAPTCHA widget and returns the ID of the newly
   * created widget.
   *
   * @param container
   * @param params
   * @returns {RSVP.Promise|*}
   */
  render (container, params) {
    let siteKey = this.get ('_siteKey');
    let options = Ember.merge ({sitekey: siteKey}, params);

    return new Ember.RSVP.Promise ((resolve, reject) => {
      this.get ('_instance').then (grecaptcha => {
        const widgetId = grecaptcha.render (container, options);

        Ember.run (null, resolve, widgetId);
      }).catch (reject);
    });
  },

  /**
   * Manually invoke the reCAPTCHA check. Used if the invisible reCAPTCHA is on a
   * div instead of a button.
   *
   * @param widgetId
   * @returns {RSVP.Promise|*}
   */
  execute (widgetId) {
    return new Ember.RSVP.Promise ((resolve, reject) => {
      this.get ('_instance').then (grecaptcha => {
        grecaptcha.execute (widgetId);

        Ember.run (null, resolve);
      }).catch (reject);
    });
  },

  /**
   * Resets the reCAPTCHA widget.
   *
   * @param widgetId
   * @returns {RSVP.Promise|*}
   */
  reset (widgetId) {
    return new Ember.RSVP.Promise ((resolve, reject) => {
      this.get ('_instance').then (grecaptcha => {
        grecaptcha.reset (widgetId);

        Ember.run (null, resolve);
      }).catch (reject);
    });
  },

  /**
   * Gets the response for the reCAPTCHA widget.
   *
   * @param widgetId
   * @returns {RSVP.Promise|*}
   */
  getResponse (widgetId) {
    return new Ember.RSVP.Promise ((resolve, reject) => {
      this.get ('_instance').then (grecaptcha => {
        const res = grecaptcha.getResponse (widgetId);
        Ember.run (null, resolve, res);
      }).catch (reject);
    });
  },

  /**
   * Get the singleton grecaptha instance from the window. If the instance does
   * not exist, it is installed by downloading the recaptcha script from online.
   */
  _instance: new Ember.RSVP.Promise ((resolve, reject) => {
    // Install the global callback.
    window._grecaptcha_onload = () => {
      Ember.run (null, resolve, window.grecaptcha);
    };

    Ember.$ (window).ready (() => {
      Ember.$.getScript ('https://www.google.com/recaptcha/api.js?onload=_grecaptcha_onload&render=explicit').fail (xhr => {
        Ember.run (null, reject, xhr);
      });
    });
  })
});
