import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('g-recaptcha-v2', 'Integration | Component | g recaptcha v2', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{g-recaptcha-v2}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#g-recaptcha-v2}}
      template block text
    {{/g-recaptcha-v2}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
