import INavigationHandler from './INavigationHandler';
import { RootStore } from './RootStore';

export default class MeasureNavHandler implements INavigationHandler {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  handleNavUp = () => {
    const [curMeasureIdx] = this.rootStore.curSelectionPos;

    let newMeasureIdx = 0;
    if (curMeasureIdx >= this.rootStore.MEASURES_PER_ROW) {
      newMeasureIdx = curMeasureIdx - this.rootStore.MEASURES_PER_ROW;
    } else {
      const lastFullRowIdx =
        Math.floor(
          this.rootStore.measures.length / this.rootStore.MEASURES_PER_ROW
        ) - 1;
      const maxRowIdxInLastRow =
        (this.rootStore.measures.length % this.rootStore.MEASURES_PER_ROW) - 1;
      if (maxRowIdxInLastRow >= curMeasureIdx) {
        // we can use the last row to navigate
        newMeasureIdx =
          (lastFullRowIdx + 1) * this.rootStore.MEASURES_PER_ROW +
          curMeasureIdx;
      } else {
        // we need to jump in the second-last row
        newMeasureIdx =
          lastFullRowIdx * this.rootStore.MEASURES_PER_ROW + curMeasureIdx;
      }
    }

    this.rootStore.curSelectionPos = [newMeasureIdx];
    this.switchActive(curMeasureIdx, newMeasureIdx);
  };

  handleNavDown = () => {
    const { curSelectionPos, measures, MEASURES_PER_ROW } = this.rootStore;
    const [curMeasureIdx] = curSelectionPos;
    let newMeasureIdx = curMeasureIdx + MEASURES_PER_ROW;
    if (newMeasureIdx > measures.length - 1)
      newMeasureIdx = newMeasureIdx % MEASURES_PER_ROW;
    this.rootStore.curSelectionPos = [newMeasureIdx];
    this.switchActive(curMeasureIdx, newMeasureIdx);
  };

  handleNavLeft = () => {
    const [curMeasureIdx] = this.rootStore.curSelectionPos;
    const newMeasureIdx = Math.max(curMeasureIdx - 1, 0);
    this.rootStore.curSelectionPos = [newMeasureIdx];
    this.switchActive(curMeasureIdx, newMeasureIdx);
  };

  handleNavRight = () => {
    const [curMeasureIdx] = this.rootStore.curSelectionPos;
    const newMeasureIdx = Math.min(
      curMeasureIdx + 1,
      this.rootStore.measures.length - 1
    );
    this.rootStore.curSelectionPos = [newMeasureIdx];
    this.switchActive(curMeasureIdx, newMeasureIdx);
  };

  private switchActive(curMeasureIdx: number, newMeasureIdx: number) {
    const { measures } = this.rootStore;
    measures[curMeasureIdx].isActive = false;
    measures[newMeasureIdx].isActive = true;
  }
}
