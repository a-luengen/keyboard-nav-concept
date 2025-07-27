import INavigationHandler from './INavigationHandler';
import { RootStore } from './RootStore';

export default class JTNNotesHeadsNavHandler implements INavigationHandler {
  private readonly rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  handleNavUp = () => {
    this.checkNavigationTypeAndThrow();
    const { curSelectionPos, measures, MEASURES_PER_ROW } = this.rootStore;
    // jump to next note head or to top measure
    const [mIdx, nIdx, nHIdx] = curSelectionPos;

    let newMeasureIdx = mIdx;
    let newNoteIdx = nIdx;
    let newHeadIdx = nHIdx;
    if (nHIdx === 0) {
      // jump to last note head of next measure
      if (mIdx < MEASURES_PER_ROW) return; // there is no measure on top
      newMeasureIdx = mIdx - MEASURES_PER_ROW;
      const newNotes = measures[newMeasureIdx].notes;
      newNoteIdx = Math.min(nIdx, newNotes.length - 1);
      newHeadIdx = newNotes[newNoteIdx].noteHeads.length - 1;
    } else {
      newHeadIdx = nHIdx - 1;
    }
    this.rootStore.switchToActive([newMeasureIdx, newNoteIdx, newHeadIdx]);
  };

  handleNavDown = () => {
    this.checkNavigationTypeAndThrow();
    const { curSelectionPos, measures, MEASURES_PER_ROW } = this.rootStore;
    const [mIdx, nIdx, nHIdx] = curSelectionPos;

    let newMeasureIdx = mIdx;
    let newNoteIdx = nIdx;
    let newHeadIdx = nHIdx;
    if (nHIdx === measures[mIdx].notes[nIdx].noteHeads.length - 1) {
      // jump to first note head of next measure
      if (mIdx + MEASURES_PER_ROW >= measures.length) return; // there is no measure on bottom
      newMeasureIdx = mIdx + MEASURES_PER_ROW;
      const newNotes = measures[newMeasureIdx].notes;
      newNoteIdx = Math.min(nIdx, newNotes.length - 1);
      newHeadIdx = 0;
    } else {
      newHeadIdx = nHIdx + 1;
    }
    this.rootStore.switchToActive([newMeasureIdx, newNoteIdx, newHeadIdx]);
  };

  handleNavLeft = () => {
    this.checkNavigationTypeAndThrow();

    const { curSelectionPos, measures } = this.rootStore;
    const [mIdx, nIdx, nHIdx] = curSelectionPos;

    let newMeasureIdx = mIdx;
    let newNoteIdx = nIdx;
    let newHeadIdx = nHIdx;
    if (nIdx === 0) {
      // check left measure
      if (mIdx === 0) return; // there is no measure on left
      newMeasureIdx = mIdx - 1;
      const newNotes = measures[newMeasureIdx].notes;
      newNoteIdx = newNotes.length - 1;
      newHeadIdx = Math.min(nHIdx, newNotes[newNoteIdx].noteHeads.length - 1);
    } else {
      newNoteIdx = nIdx - 1;
      const newNotes = measures[newNoteIdx].notes;
      newHeadIdx = Math.min(nHIdx, newNotes[newNoteIdx].noteHeads.length - 1);
    }
    this.rootStore.switchToActive([newMeasureIdx, newNoteIdx, newHeadIdx]);
  };

  handleNavRight = () => {
    this.checkNavigationTypeAndThrow();
    const { curSelectionPos, measures } = this.rootStore;

    const [mIdx, nIdx, nHIdx] = curSelectionPos;
    const curNotes = measures[mIdx].notes;
    let newMeasureIdx = mIdx;
    let newNoteIdx = nIdx;
    let newHeadIdx = nHIdx;
    if (nIdx === curNotes.length - 1) {
      if (mIdx === measures.length - 1) return; // there is no more measure left
      newMeasureIdx = mIdx + 1;
      newNoteIdx = 0;
      const newNoteHeads = measures[newMeasureIdx].notes[newNoteIdx].noteHeads;
      newHeadIdx = Math.min(nHIdx, newNoteHeads.length - 1);
    } else {
      newNoteIdx = nIdx + 1;
      const newNotes = measures[newNoteIdx].notes;
      newHeadIdx = Math.min(nHIdx, newNotes[newNoteIdx].noteHeads.length - 1);
    }

    this.rootStore.switchToActive([newMeasureIdx, newNoteIdx, newHeadIdx]);
  };

  private checkNavigationTypeAndThrow() {
    if (this.rootStore.navigationType !== 'jump-to-next')
      throw new Error('Invalid navigation type');
  }
}
