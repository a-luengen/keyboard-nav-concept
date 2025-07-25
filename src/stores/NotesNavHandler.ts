import INavigationHandler from './INavigationHandler';
import { RootStore } from './RootStore';

export default class NotesNavHandler implements INavigationHandler {
  private readonly rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  handleNavUp = () => {
    const { curSelectionPos, measures, MEASURES_PER_ROW } = this.rootStore;
    const [mIdx, nIdx] = curSelectionPos;

    console.log('Cur Pos: ', mIdx, nIdx);

    // new measure position
    let newMeasureIdx = mIdx - MEASURES_PER_ROW;
    if (newMeasureIdx < 0) newMeasureIdx = newMeasureIdx + measures.length;

    const newMeasure = measures[newMeasureIdx];

    // new note position
    const newNoteIdx =
      nIdx > newMeasure.notes.length - 1 ? newMeasure.notes.length - 1 : nIdx;

    console.log('new Pos: ', newMeasureIdx, newNoteIdx);

    this.rootStore.curSelectionPos = [newMeasureIdx, newNoteIdx];
    measures[mIdx].isActive = false;
    measures[mIdx].notes[nIdx].isActive = false;
    measures[newMeasureIdx].isActive = false;
    measures[newMeasureIdx].notes[newNoteIdx].isActive = true;
  };
  handleNavDown = () => {
    const { curSelectionPos, measures, MEASURES_PER_ROW } = this.rootStore;
    const [mIdx, nIdx] = curSelectionPos;

    let newMeasureIdx = mIdx + MEASURES_PER_ROW;
    if (newMeasureIdx > measures.length - 1)
      newMeasureIdx = newMeasureIdx % MEASURES_PER_ROW;

    const newNoteIdx = 0;

    this.rootStore.curSelectionPos = [newMeasureIdx, newNoteIdx];
    measures[mIdx].isActive = false;
    measures[mIdx].notes[nIdx].isActive = false;
    measures[newMeasureIdx].isActive = false;
    measures[newMeasureIdx].notes[newNoteIdx].isActive = true;
  };
  handleNavLeft = () => {
    const { curSelectionPos, measures } = this.rootStore;
    const curMeasure = measures[curSelectionPos[0]];
    const [mIdx, nIdx] = curSelectionPos;
    let newNoteIdx = nIdx - 1;
    if (newNoteIdx < 0) newNoteIdx = curMeasure.notes.length - 1;
    this.rootStore.curSelectionPos = [mIdx, newNoteIdx];
    this.rootStore.measures[mIdx].notes[nIdx].isActive = false;
    this.rootStore.measures[mIdx].notes[newNoteIdx].isActive = true;
  };
  handleNavRight = () => {
    const { curSelectionPos, measures } = this.rootStore;
    const curMeasure = measures[curSelectionPos[0]];
    const [mIdx, nIdx] = curSelectionPos;
    const newNoteIdx = (nIdx + 1) % curMeasure.notes.length;
    this.rootStore.curSelectionPos = [mIdx, newNoteIdx];
    this.rootStore.measures[mIdx].notes[nIdx].isActive = false;
    this.rootStore.measures[mIdx].notes[newNoteIdx].isActive = true;
  };
}
