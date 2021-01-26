import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { Keypair } from 'stellar-sdk';
import StellarAuthClient from 'stellar-auth-client';

const errors = {
  'stellar-auth.errors.invalid-secret': 'Invalid Stellar secret key',
  'stellar-auth.errors.toml.unavailable': 'Stellar TOML file unavailable',
  'stellar-auth.errors.invalid-auth-endpoint': 'Invalid auth endpoint',
  'stellar-auth.errors.invalid-endpoint': 'Invalid auth endpoint',
  'stellar-auth.errors.invalid-auth-account': 'Invalid auth account',
  'stellar-auth.errors.challenge.invalid-response': 'Invalid challenge response',
  'stellar-auth.errors.token.invalid-response': 'Invalid token response',
}

export default class IndexController extends Controller {
  queryParams = ['homeDomain', 'secretKey', 'authEndpoint','authAccount'];

  @tracked homeDomain = 'k.tempocrypto.com';
  @tracked secretKey = Keypair.random().secret();
  @tracked authAccount = '';
  @tracked authEndpoint = '';

  @tracked lastRequest = {};

  @computed('secretKey')
  get publicKey() {
    try {
      const kp = Keypair.fromSecret(this.secretKey);
      return kp.publicKey();
    } catch {
      return 'Invalid client account (secret)'
    }
  }

  @action
  async authenticate(btn) {
    let $btn = btn ? $(btn).attr('disabled', 'disabled') : null;
    // this.loading = true;
    this.set('loading', true);
    this.set('error', null);
    const clientKeyPair = Keypair.random();
    const { authEndpoint, authAccount } = this;
    const allowHttp = authEndpoint && authEndpoint.toLowerCase().startsWith("http://");
    const opts = {
      authAccount,
      authEndpoint,
      allowHttp,
    }
    const auth = new StellarAuthClient(this.homeDomain, opts);
    try {
      const token = await auth.loginWithSecret(this.secretKey)
    } catch (e) {
      const err = errors[e.message] || e.message
      this.set('error', err);
      this.lastRequest = {};
      console.error('Auth error', JSON.stringify(e));
    } finally {
      this.lastRequest = auth.lastRequest;
      if (this.lastRequest) {
        this.lastRequest.challengeEncoded = encodeURIComponent(this.lastRequest.challenge);
        this.lastRequest.signedChallengeEncoded = encodeURIComponent(this.lastRequest.signedChallenge);
        this.authEndpoint = this.lastRequest.authEndpoint;
        this.authAccount = this.lastRequest.authAccount;
      }
      if ($btn) {
        $btn.removeAttr('disabled');
      }
      this.set('loading', false);
    }
  }
}
