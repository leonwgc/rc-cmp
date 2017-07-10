import React, { Component } from 'react';
import classNames from 'classnames';
import './Steps.scss';

function Steps({ step, children, cls }) {
  if (React.Children.count(children) === 0) {
    throw new Error('Steps must have a Step child');
  }
  return (
    <div className={'rc-steps ' + (cls ? cls : '')}>
      {React.Children.map(children, (item, index) => {
        return React.cloneElement(item, {
          key: index,
          index: index,
          step: step
        });
      })}
    </div>
  );
}
function Step({ step, index, title }) {
  var finished = step > index;
  var active = step >= index;
  return (
    <div className={classNames('step in', { finished: finished })}>
      <div className={classNames('circle in', { active: active })}>
        <span className={classNames('circle-number in', { finished: finished })}>
          {finished ? '' : index + 1}
        </span>
      </div>
      <div className={classNames({ 'active-text': active })}>
        {title}
      </div>
    </div>
  );
}

export default { Steps, Step };
export { Steps, Step };
