import { makeAutoObservable } from 'mobx';
import { CounterStore } from './CounterStore';

export class RootStore {
  counterStore: CounterStore;

  constructor() {
    this.counterStore = new CounterStore();
    makeAutoObservable(this);
  }
}

// Create a singleton instance
const rootStore = new RootStore();

// React hook to use the root store
export const useRootStore = () => rootStore;
