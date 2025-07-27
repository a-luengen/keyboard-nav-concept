import React from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../stores/RootStore';

const NavigationTypeDropDown: React.FC = observer(() => {
  const rootStore = useRootStore();

  const handleNavigationTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newNavigationType = event.target.value as
      | 'loop-in-selection'
      | 'jump-to-next';
    rootStore.setNavigationType(newNavigationType);
  };

  return (
    <div className="navigation-type-dropdown">
      <label htmlFor="navigation-type-select">Navigation Type:</label>
      <select
        id="navigation-type-select"
        value={rootStore.navigationType}
        onChange={handleNavigationTypeChange}
        className="nav-dropdown-select"
      >
        <option value="loop-in-selection">Loop in Selection</option>
        <option value="jump-to-next">Jump to Next</option>
      </select>
    </div>
  );
});

export default NavigationTypeDropDown;
