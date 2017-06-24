import { observable, action, useStrict, computed } from 'mobx';

useStrict(true);

export default class AppStore {
  @observable name = '';
  @observable pageCount = 20;
  @observable page = 1;

  @observable isOpen = false;

  @computed
  get formIsValid() {
    return this.name === 'wgc';
  }

  @action
  setData = obj => {
    Object.keys(obj).forEach(key => {
      this[key] = obj[key];
    });
  };

  @action
  onChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this[event.target.name] = value;
  };

  @action
  onPageChange = page => {
    this.page = page;
  };
}