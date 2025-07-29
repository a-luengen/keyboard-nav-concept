import INavigationHandler from './INavigationHandler';
import { RootStore } from './RootStore';

export default class LISNoteHeadsNavHandler implements INavigationHandler {
  private readonly rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  handleNavUp = () => {
    this.checkNavigationTypeAndThrow();
    // circular navigate to the note above or to bottom
    const { curSelectionPos, measures } = this.rootStore;

    const [mIdx, nIdx, nHIdx] = curSelectionPos;
    const curNoteHeads = measures[mIdx].notes[nIdx].noteHeads;

    const newHeadIdx = nHIdx === 0 ? curNoteHeads.length - 1 : nHIdx - 1;

    this.rootStore.switchToActive([mIdx, nIdx, newHeadIdx]);
  };
  handleNavDown = () => {
    this.checkNavigationTypeAndThrow();
    // circular navigate to the note below or to top
    const { curSelectionPos, measures } = this.rootStore;

    const [mIdx, nIdx, nHIdx] = curSelectionPos;
    const curNoteHeads = measures[mIdx].notes[nIdx].noteHeads;

    const newHeadIdx = nHIdx === curNoteHeads.length - 1 ? 0 : nHIdx + 1;
    this.rootStore.switchToActive([mIdx, nIdx, newHeadIdx]);
  };
  handleNavLeft = () => {
    this.checkNavigationTypeAndThrow();
  };
  handleNavRight = () => {
    this.checkNavigationTypeAndThrow();
  };

  private checkNavigationTypeAndThrow() {
    if (this.rootStore.navigationType !== 'loop-in-selection')
      throw new Error('Invalid navigation type');
  }
}
