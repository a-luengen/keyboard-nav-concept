import { makeAutoObservable } from 'mobx';
import MeasureNavHandler from './MeasureNavHandler';
import INavigationHandler from './INavigationHandler';
import LISNotesNavHandler from './LISNotesNavHandler';
import LISNoteHeadsNavHandler from './LISNoteHeadsNavHandler';
import JTNNotesNavHandler from './JTNNotesNavHandler';
import JTNNotesHeadsNavHandler from './JTNNotesHeadsNavHandler';

export interface NoteHeadData {
  id: string;
  isActive: boolean;
  value: number;
}

export interface NoteData {
  id: string;
  isActive: boolean;
  noteHeads: Array<NoteHeadData>;
}

export interface MeasureData {
  id: string;
  isActive: boolean;
  notes: Array<NoteData>;
}

export class RootStore {
  measures: Array<MeasureData> = [];
  selectionType: 'measure' | 'note' | 'noteHead' = 'measure';
  navigationType: 'loop-in-selection' | 'jump-to-next' = 'loop-in-selection';
  curSelectionPos: Array<number> = [0];
  MEASURES_PER_ROW = 4;

  navHandler: INavigationHandler = new MeasureNavHandler(this);

  setNavigationType = (
    newNavigationType: 'loop-in-selection' | 'jump-to-next'
  ) => {
    this.navigationType = newNavigationType;
    this.updateNavigationHandler();
  };

  private updateNavigationHandler = () => {
    if (this.selectionType === 'measure') {
      this.navHandler = new MeasureNavHandler(this);
    } else if (this.selectionType === 'note') {
      this.navHandler =
        this.navigationType === 'jump-to-next'
          ? new JTNNotesNavHandler(this)
          : new LISNotesNavHandler(this);
    } else if (this.selectionType === 'noteHead') {
      this.navHandler =
        this.navigationType === 'jump-to-next'
          ? new JTNNotesHeadsNavHandler(this)
          : new LISNoteHeadsNavHandler(this);
    }
  };

  constructor() {
    makeAutoObservable(this);
    this.initMeasures();
  }

  handleKeyDown = (event: KeyboardEvent) => {
    event.preventDefault();

    switch (event.key) {
      case 'ArrowUp':
        this.navHandler.handleNavUp();
        break;
      case 'ArrowDown':
        this.navHandler.handleNavDown();
        break;
      case 'ArrowLeft':
        this.navHandler.handleNavLeft();
        break;
      case 'ArrowRight':
        this.navHandler.handleNavRight();
        break;
      case 'Enter':
        this.handleSelect();
        break;
      case 'Escape':
        this.handleDeSelect();
        break;
      default:
        return;
    }
  };

  handleSelect = () => {
    if (this.selectionType === 'measure') {
      this.selectionType = 'note';
      const newSelectionPos = [this.curSelectionPos[0], 0];
      const [mIdx, nIdx] = newSelectionPos;
      this.measures[mIdx].isActive = false;
      this.measures[mIdx].notes[nIdx].isActive = true;
      this.curSelectionPos = newSelectionPos;
      this.navHandler =
        this.navigationType === 'jump-to-next'
          ? new JTNNotesNavHandler(this)
          : new LISNotesNavHandler(this);
    } else if (this.selectionType === 'note') {
      this.selectionType = 'noteHead';
      const [mIdx, nIdx] = this.curSelectionPos;
      this.measures[mIdx].isActive = false;
      this.measures[mIdx].notes[nIdx].isActive = false;
      this.measures[mIdx].notes[nIdx].noteHeads[0].isActive = true;
      this.curSelectionPos = [mIdx, nIdx, 0];
      this.navHandler =
        this.navigationType === 'jump-to-next'
          ? new JTNNotesHeadsNavHandler(this)
          : new LISNoteHeadsNavHandler(this);
    } else if (this.selectionType === 'noteHead') {
      return;
    }
  };

  handleDeSelect = () => {
    if (this.selectionType === 'measure') {
      return;
    } else if (this.selectionType === 'note') {
      this.selectionType = 'measure';
      const [mIdx, nIdx] = this.curSelectionPos;
      this.measures[mIdx].notes[nIdx].isActive = false;
      this.measures[mIdx].isActive = true;
      this.curSelectionPos = [mIdx];
      this.navHandler = new MeasureNavHandler(this);
    } else if (this.selectionType === 'noteHead') {
      this.selectionType = 'note';
      const [mIdx, nIdx, nhIdx] = this.curSelectionPos;
      this.measures[mIdx].isActive = false;
      this.measures[mIdx].notes[nIdx].isActive = true;
      this.measures[mIdx].notes[nIdx].noteHeads[nhIdx].isActive = false;
      this.curSelectionPos = [mIdx, nIdx];
      this.navHandler =
        this.navigationType === 'jump-to-next'
          ? new JTNNotesNavHandler(this)
          : new LISNotesNavHandler(this);
    }
  };

  switchToActive = (
    newPos: [number] | [number, number] | [number, number, number]
  ) => {
    const [mIdx, nIdx, nhIdx] = this.curSelectionPos;
    if (newPos.length !== this.curSelectionPos.length) {
      throw new Error(
        'Invalid new position length ' +
          this.curSelectionPos +
          newPos +
          this.selectionType
      );
    } else if (newPos.length === 1) {
      const [newMeasureIdx] = newPos;
      this.measures[mIdx].isActive = false;
      this.measures[newMeasureIdx].isActive = true;
      this.curSelectionPos = newPos;
    } else if (newPos.length === 2) {
      const [newMeasureIdx, newNoteIdx] = newPos;
      this.measures[mIdx].isActive = false;
      this.measures[mIdx].notes[nIdx].isActive = false;
      this.measures[newMeasureIdx].isActive = false;
      this.measures[newMeasureIdx].notes[newNoteIdx].isActive = true;
      this.curSelectionPos = newPos;
    } else if (newPos.length === 3) {
      const [newMeasureIdx, newNoteIdx, newNoteHeadIdx] = newPos;
      this.measures[mIdx].isActive = false;
      this.measures[mIdx].notes[nIdx].isActive = false;
      this.measures[mIdx].notes[nIdx].noteHeads[nhIdx].isActive = false;
      this.measures[newMeasureIdx].isActive = false;
      this.measures[newMeasureIdx].notes[newNoteIdx].isActive = false;
      this.measures[newMeasureIdx].notes[newNoteIdx].noteHeads[
        newNoteHeadIdx
      ].isActive = true;
      this.curSelectionPos = newPos;
    }
  };

  initMeasures = () => {
    this.measures = [];
    [
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      [
        [1, 2, 3],
        [4, 5, 6, 7],
        [7, 8, 9],
      ],
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      [[1, 2, 3]],
      [[1, 2, 3]],
      [
        [1, 2, 3],
        [13, 14],
      ],
      [[1, 2, 3, 16]],
      [[9, 4, 5]],
      [[0, 2, 3, 6]],
      [
        [1, 3, 4],
        [9, 8, 7],
        [4, 5, 6],
        [2, 4, 5],
        [1, 2],
      ],
      [
        [1, 2, 3],
        [6, 8, 6],
      ],
      [[1, 2, 3], [1, 2, 3], [1, 2, 3, 4], [1]],
      [[2], [4, 5, 6], [5, 6, 7], [1, 2, 3], [1, 2, 3, 4]],
      [[1, 2, 3], [1, 2, 3], [1, 2, 3, 4], [1]],
      [[1, 2, 3], [1, 2, 3], [1, 2, 3, 4], [1]],
    ].forEach((notes, idx) => {
      const notesCollection = Array<NoteData>();

      notes.forEach((noteVal, nIdx) => {
        const noteHeads = Array<NoteHeadData>();
        noteVal.forEach((noteHead, nhIdx) => {
          noteHeads.push({
            id: 'nh-' + nhIdx,
            isActive: false,
            value: noteHead,
          });
        });

        notesCollection.push({
          id: 'n-' + nIdx,
          isActive: false,
          noteHeads: noteHeads,
        });
      });

      this.measures.push({
        id: 'm-' + idx,
        isActive: false,
        notes: notesCollection,
      });
      this.measures[0].isActive = true;
    });
  };
}

// Create a singleton instance
const rootStore = new RootStore();

// React hook to use the root store
export const useRootStore = () => rootStore;
