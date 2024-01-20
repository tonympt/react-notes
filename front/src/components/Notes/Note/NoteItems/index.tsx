import { getAllItemByNote } from '@/queries/Notes/notes';
import NoteItemsLists from './NoteItemsLists';
import NoteItemtext from './NoteItemText';
import { NoteType } from '@/zod-schema/notes';

import Loader from '@/components/ui/Loader';

type NoteItemsProps = {
    items: NoteType['items'],
    isCheckBoxMode: NoteType['isCheckBoxMode']
	noteId: NoteType['_id']
};

const NoteItems = ({ isCheckBoxMode, noteId }: NoteItemsProps) => {
	const { data: items, isLoading } = getAllItemByNote(noteId);

	return (!isLoading 
		? (isCheckBoxMode 
			? <NoteItemsLists items={items} noteId={noteId} />
			: <NoteItemtext item={items && items.length > 0 ? items[0] : null} noteId={noteId}/>)
		: <Loader size='20' />
	);
};
  
export default NoteItems;