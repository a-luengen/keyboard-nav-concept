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
      this.switchToActive([this.curSelectionPos[0], 0]);
      this.navHandler =
        this.navigationType === 'jump-to-next'
          ? new JTNNotesNavHandler(this)
          : new LISNotesNavHandler(this);
    } else if (this.selectionType === 'note') {
      this.selectionType = 'noteHead';
      const [mIdx, nIdx] = this.curSelectionPos;
      this.switchToActive([mIdx, nIdx, 0]);
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
      this.switchToActive([this.curSelectionPos[0]]);
      this.navHandler = new MeasureNavHandler(this);
    } else if (this.selectionType === 'noteHead') {
      this.selectionType = 'note';
      this.switchToActive([this.curSelectionPos[0], this.curSelectionPos[1]]);
      this.navHandler =
        this.navigationType === 'jump-to-next'
          ? new JTNNotesNavHandler(this)
          : new LISNotesNavHandler(this);
    }
  };

  switchToActive = (
    newPos: [number] | [number, number] | [number, number, number]
  ) => {
    if (newPos.length > 3) {
      throw new Error(
        'Invalid new position length ' +
          this.curSelectionPos +
          newPos +
          this.selectionType
      );
    }
    if (this.curSelectionPos.length > 3) {
      throw new Error(
        'Invalid current position length' +
          this.curSelectionPos +
          newPos +
          this.selectionType
      );
    }
    const [mIdx, nIdx, nhIdx] = this.curSelectionPos;
    // deactivate current selection
    if (typeof mIdx === 'number') {
      this.measures[mIdx].isActive = false;
      if (typeof nIdx === 'number') {
        this.measures[mIdx].notes[nIdx].isActive = false;
        if (typeof nhIdx === 'number') {
          this.measures[mIdx].notes[nIdx].noteHeads[nhIdx].isActive = false;
        }
      }
    }
    const [newMeasureIdx, newNoteIdx, newNoteHeadIdx] = newPos;
    // activate new selection
    if (typeof newMeasureIdx === 'number') {
      if (typeof newNoteIdx === 'number') {
        if (typeof newNoteHeadIdx === 'number') {
          this.measures[newMeasureIdx].notes[newNoteIdx].noteHeads[
            newNoteHeadIdx
          ].isActive = true;
        } else {
          this.measures[newMeasureIdx].notes[newNoteIdx].isActive = true;
        }
      } else {
        this.measures[newMeasureIdx].isActive = true;
      }
    }

    this.curSelectionPos = newPos;
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
        [9, 7],
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
