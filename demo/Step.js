import { Steps, Step } from '../src/Steps';
import { observer, inject } from 'mobx-react';
import React from 'react';

const StepDemo = ({ store }) => {
  return (
    <div>
      <h1>Steps</h1>
      <Steps step={store.step}>
        <Step title="step1" />
        <Step title="step2" />
        <Step title="step3" />
        <Step title="step4" />
      </Steps>
      <div>
        <button
          type="button"
          onClick={e => {
            if (store.step < 3) {
              store.step++;
            } else {
              store.step = 0;
            }
          }}>
          Next Step
        </button>
      </div>
    </div>
  );
};

export default inject('store')(observer(StepDemo));
