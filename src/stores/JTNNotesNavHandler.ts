import INavigationHandler from './INavigationHandler';
import { RootStore } from './RootStore';

export default class JTNNotesNavHandler implements INavigationHandler {
  private readonly rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  handleNavUp = () => {
    this.checkNavigationTypeAndThrow();
    // jump to next note
    // new measure position
    const { curSelectionPos, measures, MEASURES_PER_ROW } = this.rootStore;
    const [mIdx, nIdx] = curSelectionPos;
    let newMeasureIdx = mIdx;

    if (mIdx >= MEASURES_PER_ROW) {
      newMeasureIdx -= MEASURES_PER_ROW;
    } else {
      const lastFullRowIdx = Math.floor(measures.length / MEASURES_PER_ROW) - 1;
      const maxRowIdxInLastRow = (measures.length % MEASURES_PER_ROW) - 1;
      if (maxRowIdxInLastRow >= mIdx) {
        newMeasureIdx = (lastFullRowIdx + 1) * MEASURES_PER_ROW + mIdx;
      } else {
        newMeasureIdx = lastFullRowIdx * MEASURES_PER_ROW + mIdx;
      }
    }

    const newMeasure = measures[newMeasureIdx];

    // new note position
    const newNoteIdx =
      nIdx > newMeasure.notes.length - 1 ? newMeasure.notes.length - 1 : nIdx;

    this.rootStore.switchToActive([newMeasureIdx, newNoteIdx]);
  };

  handleNavDown = () => {
    this.checkNavigationTypeAndThrow();

    // jump to next measure
    const { curSelectionPos, measures, MEASURES_PER_ROW } = this.rootStore;
    const [mIdx, nIdx] = curSelectionPos;
    let newMeasureIdx = mIdx + MEASURES_PER_ROW;
    if (newMeasureIdx > measures.length - 1)
      newMeasureIdx = newMeasureIdx % MEASURES_PER_ROW;

    const newNotes = measures[newMeasureIdx].notes;
    const newNoteIdx = Math.min(nIdx, newNotes.length - 1);

    this.rootStore.switchToActive([newMeasureIdx, newNoteIdx]);
  };

  handleNavLeft = () => {
    this.checkNavigationTypeAndThrow();
    const { curSelectionPos, measures } = this.rootStore;
    const [mIdx, nIdx] = curSelectionPos;
    let newMeasureIdx = mIdx;
    let newNoteIdx = nIdx;

    if (nIdx === 0) {
      if (mIdx === 0) return; // cannot navigate out of sheet

      newMeasureIdx = mIdx - 1;
      const newNotes = measures[newMeasureIdx].notes;
      newNoteIdx = newNotes.length - 1;
    } else {
      newNoteIdx = nIdx - 1;
    }

    this.rootStore.switchToActive([newMeasureIdx, newNoteIdx]);
  };
  handleNavRight = () => {
    this.checkNavigationTypeAndThrow();

    const { curSelectionPos, measures } = this.rootStore;
    const [mIdx, nIdx] = curSelectionPos;
    const curNotes = measures[mIdx].notes;
    let newMeasureIdx = mIdx;
    let newNoteIdx = nIdx;
    if (nIdx + 1 >= curNotes.length) {
      newMeasureIdx = Math.min(mIdx + 1, measures.length - 1);
      newNoteIdx = 0;
    } else {
      newNoteIdx = nIdx + 1;
    }

    this.rootStore.switchToActive([newMeasureIdx, newNoteIdx]);
  };

  private checkNavigationTypeAndThrow() {
    if (this.rootStore.navigationType !== 'jump-to-next')
      throw new Error('Invalid navigation type');
  }
}
