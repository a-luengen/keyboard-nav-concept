import INavigationHandler from './INavigationHandler';
import { RootStore } from './RootStore';

export default class MeasureNavHandler implements INavigationHandler {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  handleNavUp = () => {
    const { curSelectionPos, measures, MEASURES_PER_ROW } = this.rootStore;
    const [mIdx] = curSelectionPos;

    let newMeasureIdx = 0;
    if (mIdx >= MEASURES_PER_ROW) {
      newMeasureIdx = mIdx - MEASURES_PER_ROW;
    } else {
      const lastFullRowIdx = Math.floor(measures.length / MEASURES_PER_ROW) - 1;
      const maxRowIdxInLastRow = (measures.length % MEASURES_PER_ROW) - 1;
      if (maxRowIdxInLastRow >= mIdx) {
        // we can use the last row to navigate
        newMeasureIdx = (lastFullRowIdx + 1) * MEASURES_PER_ROW + mIdx;
      } else {
        // we need to jump in the second-last row
        newMeasureIdx = lastFullRowIdx * MEASURES_PER_ROW + mIdx;
      }
    }

    this.rootStore.switchToActive([newMeasureIdx]);
  };

  handleNavDown = () => {
    const { curSelectionPos, measures, MEASURES_PER_ROW } = this.rootStore;
    const [mIdx] = curSelectionPos;
    let newMeasureIdx = mIdx + MEASURES_PER_ROW;
    if (newMeasureIdx > measures.length - 1)
      newMeasureIdx = newMeasureIdx % MEASURES_PER_ROW;
    this.rootStore.switchToActive([newMeasureIdx]);
  };

  handleNavLeft = () => {
    const { curSelectionPos } = this.rootStore;
    const [mIdx] = curSelectionPos;
    const newMeasureIdx = Math.max(mIdx - 1, 0);
    this.rootStore.switchToActive([newMeasureIdx]);
  };

  handleNavRight = () => {
    const { curSelectionPos, measures } = this.rootStore;
    const [mIdx] = curSelectionPos;
    const newMeasureIdx = Math.min(mIdx + 1, measures.length - 1);
    this.rootStore.switchToActive([newMeasureIdx]);
  };
}
