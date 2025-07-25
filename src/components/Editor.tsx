import React from 'react';
import { useRootStore } from '../stores/RootStore';
import { observer } from 'mobx-react-lite';
import Measure from './Measure';
import KeyboardEvents from './KeyboardEvents';

const Editor = () => {
  const rootStore = useRootStore();

  return (
    <>
      <KeyboardEvents />
      {rootStore.measures.map(measureData => {
        return <Measure measureData={measureData} />;
      })}
    </>
  );
};

export default observer(Editor);
