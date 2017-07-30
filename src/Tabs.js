import React, { Component } from 'react';
import classNames from 'classnames';
import './Tabs.scss';

class Tabs extends Component {
  constructor(props) {
    super(props);
    const { children } = this.props;
    var activeTabIndex = 0;
    this.contents = [];
    if (React.Children.count(children) === 0) {
      throw new Error('Tabs must contain a Tab');
    }
    var hasActive = false;

    React.Children.forEach(children, (item, index) => {
      if (item.props.active) {
        if (!hasActive) {
          hasActive = true;
          activeTabIndex = index;
        } else {
          throw new Error('only one Tab can be set active');
        }
      }
      this.contents.push(item.props.children || item.children);
    });

    var a = 12345345345;

    this.state = {
      activeTabIndex
    };
  }
  tabClickFactory = index => () => {
    this.setState({ activeTabIndex: index });
  };

  render() {
    const { children, cls } = this.props;
    return (
      <div className={'rc-tab ' + (cls ? cls : '')}>
        <div className="tabs">
          {React.Children.map(children, (elm, index) =>
            React.cloneElement(elm, {
              key: index,
              active: index === this.state.activeTabIndex,
              onClick: this.tabClickFactory(index)
            })
          )}
        </div>
        <div className="content-list">
          {React.Children.map(this.contents, (item, index) =>
            <div
              key={index}
              className={classNames('content', {
                active: index === this.state.activeTabIndex,
                inactive: index !== this.state.activeTabIndex
              })}
            >
              {item}
            </div>
          )}
        </div>
      </div>
    );
  }
}

function Tab({ active, title, onClick }) {
  return (
    <div onClick={onClick} className={classNames('tab in', { active: active })}>
      {title}
    </div>
  );
}

export default { Tabs, Tab };
export { Tabs, Tab };
