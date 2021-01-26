import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @tracked colors = ['#fcb851', '#e64053', '#55bcb6', '#77edb2']
}
