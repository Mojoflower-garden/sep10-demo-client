/* eslint-disable */
import Component from '@ember/component';
import { assign } from '@ember/polyfills';
import { later } from '@ember/runloop';
import { action } from '@ember/object';
// import validateCrypto from 'nequi-anchor-admin/utils/crypto-validator';

export default Component.extend({
  didUpdateAttrs() {
    this._super();
    if (this.reset != this._reset) {
      this.resetForm();
      this.set('_reset', this.reset);
    }
  },

  didInsertElement() {
    this._super(...arguments);
    window.Parsley.options = assign(window.Parsley.options, {
      errorClass: 'is-invalid',
      successClass: 'is-valid',
      errorsWrapper: '<div class="invalid-feedback">',
      errorTemplate: '<span></span>',
    });

    // if (!window.Parsley.hasValidator('cryptoAddress')) {
    //   window.Parsley.addValidator('cryptoAddress', {
    //     requirementType: 'string',
    //     validateString: function(value, requirement) {
    //       return validateCrypto(requirement, value);
    //     },
    //     messages: {
    //       en: 'Invalid %s address.',
    //       es: 'Dirección %s invalida.'
    //     }
    //   });
    // }
  },

  resetForm() {
    let form = this.$(this.element).find('form');
    let parsleyForm = form.parsley();
    parsleyForm.reset();
    form.trigger('reset');
    later(function () {
      form.find('input[type!=hidden]:not([disabled]):first').focus();
    }, 300);
  },

  @action
  submit() {
    let form = this.$(this.element).find('form');
    let parsleyForm = form.parsley();
    let validatedForm = parsleyForm.validate();

    if (validatedForm) {
      this.action(this.$(this.element).find('form :submit'));
    }
    return false;
  },

  @action
  reset() {
    this.resetForm();
  },
});
