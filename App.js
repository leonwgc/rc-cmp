import React, { Component } from 'react';
import Pager from './src/Pager';
import PlaceholderInput from './src/PlaceholderInput';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
export default class App extends Component {
  render() {
    return (
      <div>
        <Pager pageCount={this.props.store.pageCount} onPageChange={this.props.store.onPageChange} />
        <div>current page is: {this.props.store.page}</div>
        <div>
          <PlaceholderInput placeholder="type here" name="name" value={this.props.store.name} onChange={this.props.store.onChange} />
          <button disabled={!this.props.store.formIsValid}>submit</button>
        </div>
      </div>
    );
  }
}
