import React, { Component } from 'react';
import PagerDemo from './demo/Pager';
import DialogDemo from './demo/Dialog';
import UploadDemo from './demo/Upload';
import PlaceholderInputDemo from './demo/Input';
import TabDemo from './demo/Tab';
import StepDemo from './demo/Step';
import Spinner from './src/Spinner';
import './App.scss';

// import Avatar from './ref/Avatar';

const App = () => {
  return (
    <div>
      <Spinner/>
      <PagerDemo />
      <PlaceholderInputDemo />
      <DialogDemo />
      <UploadDemo />
      <TabDemo />
      <StepDemo />
    </div>
  );
};

export default App;
