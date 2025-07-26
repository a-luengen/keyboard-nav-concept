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

    // new measure position
    let newMeasureIdx = mIdx - MEASURES_PER_ROW;
    if (newMeasureIdx < 0) newMeasureIdx = newMeasureIdx + measures.length;

    const newMeasure = measures[newMeasureIdx];

    // new note position
    const newNoteIdx =
      nIdx > newMeasure.notes.length - 1 ? newMeasure.notes.length - 1 : nIdx;

    this.rootStore.curSelectionPos = [newMeasureIdx, newNoteIdx];
    this.switchActive([mIdx, nIdx, newMeasureIdx, newNoteIdx]);
  };
  handleNavDown = () => {
    const { curSelectionPos, measures, MEASURES_PER_ROW } = this.rootStore;
    const [mIdx, nIdx] = curSelectionPos;

    let newMeasureIdx = mIdx + MEASURES_PER_ROW;
    if (newMeasureIdx > measures.length - 1)
      newMeasureIdx = newMeasureIdx % MEASURES_PER_ROW;

    const newNoteIdx = 0;

    this.rootStore.curSelectionPos = [newMeasureIdx, newNoteIdx];
    this.switchActive([mIdx, nIdx, newMeasureIdx, newNoteIdx]);
  };
  handleNavLeft = () => {
    const { curSelectionPos, measures } = this.rootStore;
    const curMeasure = measures[curSelectionPos[0]];
    const [mIdx, nIdx] = curSelectionPos;
    let newNoteIdx = nIdx - 1;
    if (newNoteIdx < 0) newNoteIdx = curMeasure.notes.length - 1;
    this.rootStore.curSelectionPos = [mIdx, newNoteIdx];
    this.switchActive([mIdx, nIdx, mIdx, newNoteIdx]);
  };
  handleNavRight = () => {
    const { curSelectionPos, measures } = this.rootStore;
    const curMeasure = measures[curSelectionPos[0]];
    const [mIdx, nIdx] = curSelectionPos;
    const newNoteIdx = (nIdx + 1) % curMeasure.notes.length;
    this.rootStore.curSelectionPos = [mIdx, newNoteIdx];
    this.switchActive([mIdx, nIdx, mIdx, newNoteIdx]);
  };

  private switchActive(vals: [number, number, number, number]) {
    const [curMeasureIdx, curNoteIdx, newMeasureIdx, newNoteIdx] = vals;
    const { measures } = this.rootStore;
    measures[curMeasureIdx].isActive = false;
    measures[curMeasureIdx].notes[curNoteIdx].isActive = false;
    measures[newMeasureIdx].isActive = false;
    measures[newMeasureIdx].notes[newNoteIdx].isActive = true;
  }
}
