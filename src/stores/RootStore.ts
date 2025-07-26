import { makeAutoObservable } from 'mobx';
import MeasureNavHandler from './MeasureNavHandler';
import INavigationHandler from './INavigationHandler';
import NotesNavHandler from './NotesNavHandler';
import NoteHeadsNavHandler from './NoteHeadsNavHandler';

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
  curSelectionPos: Array<number> = [0];
  MEASURES_PER_ROW = 4;

  navHandler: INavigationHandler = new MeasureNavHandler(this);

  constructor() {
    makeAutoObservable(this);
    this.initMeasures();
  }

  handleKeyDown = (event: KeyboardEvent) => {
    event.preventDefault();
    if (event.repeat) return;
    console.log('Pressed', event);

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
      this.navHandler = new NotesNavHandler(this);
    } else if (this.selectionType === 'note') {
      this.selectionType = 'noteHead';
      const [mIdx, nIdx] = this.curSelectionPos;
      this.measures[mIdx].isActive = false;
      this.measures[mIdx].notes[nIdx].isActive = false;
      this.measures[mIdx].notes[nIdx].noteHeads[0].isActive = true;
      this.curSelectionPos = [mIdx, nIdx, 0];
      this.navHandler = new NoteHeadsNavHandler(this);
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
      this.navHandler = new NotesNavHandler(this);
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
