import INavigationHandler from './INavigationHandler';
import { RootStore } from './RootStore';

/**
 * Keeps navigation to loop within the selected Measure.
 */
export default class LISNotesNavHandler implements INavigationHandler {
  private readonly rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  handleNavUp = () => {
    this.checkNavigationTypeAndThrow();
  };

  handleNavDown = () => {
    this.checkNavigationTypeAndThrow();
  };
  handleNavLeft = () => {
    this.checkNavigationTypeAndThrow();
    const { curSelectionPos, measures } = this.rootStore;
    const curMeasure = measures[curSelectionPos[0]];
    const [mIdx, nIdx] = curSelectionPos;
    let newNoteIdx = nIdx - 1;
    if (newNoteIdx < 0) newNoteIdx = curMeasure.notes.length - 1;
    this.rootStore.switchToActive([mIdx, newNoteIdx]);
  };
  handleNavRight = () => {
    this.checkNavigationTypeAndThrow();
    const { curSelectionPos, measures } = this.rootStore;
    const curMeasure = measures[curSelectionPos[0]];
    const [mIdx, nIdx] = curSelectionPos;
    const newNoteIdx = (nIdx + 1) % curMeasure.notes.length;
    this.rootStore.switchToActive([mIdx, newNoteIdx]);
  };

  private checkNavigationTypeAndThrow() {
    if (this.rootStore.navigationType !== 'loop-in-selection')
      throw new Error('Invalid navigation type');
  }
}
