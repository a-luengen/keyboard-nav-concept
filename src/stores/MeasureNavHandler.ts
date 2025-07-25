import INavigationHandler from './INavigationHandler';
import { RootStore } from './RootStore';

export default class MeasureNavHandler implements INavigationHandler {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  handleNavUp = () => {
    const [curMeasureIdx] = this.rootStore.curSelectionPos;

    let newMeasureIdx =
      curMeasureIdx < this.rootStore.MEASURES_PER_ROW
        ? this.rootStore.measures.length - (this.rootStore.MEASURES_PER_ROW - 2)
        : curMeasureIdx - this.rootStore.MEASURES_PER_ROW;

    this.rootStore.curSelectionPos = [newMeasureIdx];
    this.rootStore.measures[curMeasureIdx].isActive = false;
    this.rootStore.measures[newMeasureIdx].isActive = true;
  };

  handleNavDown = () => {
    const { curSelectionPos, measures, MEASURES_PER_ROW } = this.rootStore;
    const [curMeasureIdx] = curSelectionPos;
    console.log('Cur Measure', curMeasureIdx);
    let newMeasureIdx = curMeasureIdx + MEASURES_PER_ROW;
    if (newMeasureIdx > measures.length - 1)
      newMeasureIdx = newMeasureIdx % MEASURES_PER_ROW;
    this.rootStore.curSelectionPos = [newMeasureIdx];
    console.log('New Measure', newMeasureIdx);
    console.log('Old Measure', curMeasureIdx);
    measures[curMeasureIdx].isActive = false;
    measures[newMeasureIdx].isActive = true;
  };

  handleNavLeft = () => {
    const [curMeasureIdx] = this.rootStore.curSelectionPos;
    const newMeasureIdx = Math.max(curMeasureIdx - 1, 0);
    this.rootStore.curSelectionPos = [newMeasureIdx];
    this.rootStore.measures[curMeasureIdx].isActive = false;
    this.rootStore.measures[newMeasureIdx].isActive = true;
  };
  handleNavRight = () => {
    const [curMeasureIdx] = this.rootStore.curSelectionPos;
    const newMeasureIdx = Math.min(
      curMeasureIdx + 1,
      this.rootStore.measures.length - 1
    );
    this.rootStore.curSelectionPos = [newMeasureIdx];
    this.rootStore.measures[curMeasureIdx].isActive = false;
    this.rootStore.measures[newMeasureIdx].isActive = true;
  };
}
