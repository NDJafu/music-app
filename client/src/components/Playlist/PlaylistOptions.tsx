import { BsThreeDots } from 'react-icons/bs';
import PlaylistEditModal from './PlaylistEditModal';
import { FullPlaylist } from '../../app/types';
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
} from '../ui/Dropdown';
import PlaylistDeleteDialog from './PlaylistDeleteDialog';

const PlaylistOptions = (playlist: FullPlaylist) => {
  return (
    <Dropdown>
      <DropdownTrigger className="flex items-center">
        <BsThreeDots size={32} />
      </DropdownTrigger>
      <DropdownContent rightSide>
        <DropdownItem onClick={() => {}}>Add to queue</DropdownItem>
        <DropdownSeparator />
        <PlaylistEditModal {...playlist} />
        <PlaylistDeleteDialog {...playlist} />
      </DropdownContent>
    </Dropdown>
  );
};

export default PlaylistOptions;
