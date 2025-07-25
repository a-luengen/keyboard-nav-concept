import { observer } from 'mobx-react-lite';
import Note from './Note';
import { MeasureData } from '../stores/RootStore';

export type MeasureProps = {
  measureData: MeasureData;
};

const Measure: React.FC<MeasureProps> = ({ measureData }) => {
  return (
    <div
      id={measureData.id}
      key={measureData.id}
      className={'nav-measure' + (measureData.isActive ? ' nav-active' : '')}
    >
      {measureData.notes.map(noteEntry => (
        <Note noteData={noteEntry} />
      ))}
    </div>
  );
};

export default observer(Measure);
