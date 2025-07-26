import INavigationHandler from './INavigationHandler';
import { RootStore } from './RootStore';

export default class NoteHeadsNavHandler implements INavigationHandler {
  private readonly rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  handleNavUp = () => {
    // circular navigate to the note above or to bottom
    const { curSelectionPos, measures } = this.rootStore;

    const [mIdx, nIdx, nHIdx] = curSelectionPos;
    const curNoteHeads = measures[mIdx].notes[nIdx].noteHeads;

    const newHeadIdx = nHIdx === 0 ? curNoteHeads.length - 1 : nHIdx - 1;
    console.log(NoteHeadsNavHandler.name, 'up: ', nHIdx, '->', newHeadIdx);

    this.switchActive([mIdx, nIdx, nHIdx], [mIdx, nIdx, newHeadIdx]);
  };
  handleNavDown = () => {
    // circular navigate to the note below or to top
    const { curSelectionPos, measures } = this.rootStore;

    const [mIdx, nIdx, nHIdx] = curSelectionPos;
    const curNoteHeads = measures[mIdx].notes[nIdx].noteHeads;

    const newHeadIdx = nHIdx === curNoteHeads.length - 1 ? 0 : nHIdx + 1;
    console.log(NoteHeadsNavHandler.name, 'down: ', nHIdx, '->', newHeadIdx);
    this.switchActive([mIdx, nIdx, nHIdx], [mIdx, nIdx, newHeadIdx]);
  };
  handleNavLeft = () => {
    // todo: implement
  };
  handleNavRight = () => {
    // todo: navigate to the note on the right within the measure
  };

  private switchActive(
    from: [number, number, number],
    to: [number, number, number]
  ) {
    const [curMeasureIdx, curNoteIdx, curNoteHeadIdx] = from;
    const [newMeasureIdx, newNoteIdx, newNoteHeadIdx] = to;
    console.log(NoteHeadsNavHandler.name, 'switch: ', from, to);
    const { measures } = this.rootStore;
    this.rootStore.curSelectionPos = to;

    measures[curMeasureIdx].isActive = false;
    measures[curMeasureIdx].notes[curNoteIdx].isActive = false;
    measures[curMeasureIdx].notes[curNoteIdx].noteHeads[
      curNoteHeadIdx
    ].isActive = false;

    measures[newMeasureIdx].isActive = false;
    measures[newMeasureIdx].notes[newNoteIdx].isActive = false;
    measures[newMeasureIdx].notes[newNoteIdx].noteHeads[
      newNoteHeadIdx
    ].isActive = true;
  }
}
