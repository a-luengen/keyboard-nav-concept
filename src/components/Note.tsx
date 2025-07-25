import { observer } from 'mobx-react-lite';
import React from 'react';
import { NoteData } from '../stores/RootStore';

export type NoteProps = {
  noteData: NoteData;
};

const Note: React.FC<NoteProps> = ({ noteData }) => {
  return (
    <div
      id={noteData.id}
      key={noteData.id}
      className={'nav-note' + (noteData.isActive ? ' nav-active' : '')}
    >
      {noteData.noteHeads.map(notehead => {
        return (
          <div
            className={
              'nav-notehead' + (notehead.isActive ? ' nav-active' : '')
            }
            key={notehead.id}
            id={notehead.id}
          >
            {notehead.value}
          </div>
        );
      })}
    </div>
  );
};

export default observer(Note);
