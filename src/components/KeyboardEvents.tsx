import { observer } from 'mobx-react-lite';
import { useRootStore } from '../stores/RootStore';
import { useEffect } from 'react';

const KeyboardEvents = () => {
  const rootStore = useRootStore();

  useEffect(() => {
    window.addEventListener('keydown', rootStore.handleKeyDown);

    return () => {
      window.removeEventListener('keydown', rootStore.handleKeyDown);
    };
  });

  return null;
};

export default observer(KeyboardEvents);
