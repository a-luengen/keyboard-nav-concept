import INavigationHandler from './INavigationHandler';
import { RootStore } from './RootStore';

export default class NoteHeadsNavHandler implements INavigationHandler {
  private readonly rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  handleNavUp = () => {
    // todo: implement
  };
  handleNavDown = () => {
    // todo: implement
  };
  handleNavLeft = () => {
    // todo: implement
  };
  handleNavRight = () => {
    // todo: implement
  };
}
