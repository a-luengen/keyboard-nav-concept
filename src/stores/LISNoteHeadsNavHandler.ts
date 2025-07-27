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
    // navigate to the note on the left within the measure
    const { curSelectionPos } = this.rootStore;

    // jump to next note
    const [mIdx, nIdx, nHIdx] = curSelectionPos;
    const curMeasure = this.rootStore.measures[mIdx];

    let newMeasureIdx = mIdx;
    let newNoteIdx = nIdx;
    let newNoteHeadIdx = nHIdx;

    if (nIdx === 0) {
      if (mIdx === 0) return;
      // jump to notes in next measure and adjust note head index if needed
      newMeasureIdx = Math.max(mIdx - 1, 0);
      const newMeasureNotes = this.rootStore.measures[newMeasureIdx].notes;
      newNoteIdx = newMeasureNotes.length - 1;
    } else {
      // jump to left note and adjust note head index if needed
      newNoteIdx = nIdx - 1;
      const newNote = curMeasure.notes[newNoteIdx];
      const newNoteHeads = newNote.noteHeads;
      if (newNoteHeads.length - 1 < nHIdx) {
        newNoteHeadIdx = newNoteHeads.length - 1;
      }
    }
    this.rootStore.switchToActive([
      newMeasureIdx,
      newNoteHeadIdx,
      newNoteHeadIdx,
    ]);
  };
  handleNavRight = () => {
    this.checkNavigationTypeAndThrow();
  };

  private checkNavigationTypeAndThrow() {
    if (this.rootStore.navigationType !== 'loop-in-selection')
      throw new Error('Invalid navigation type');
  }
}
