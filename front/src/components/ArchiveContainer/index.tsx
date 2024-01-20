import Note from '../Notes/Note';
import InfoDisplay from '../InfoDisplay';
import { PiArchiveBox } from 'react-icons/pi';
import { FaRegNoteSticky } from 'react-icons/fa6';
import { getAllNotes } from '@/queries/Notes/notes';
import { NoteType } from '@/zod-schema/notes';
import Loader from '../ui/Loader';
import { useListMode } from '@/context/context.listMode';


const ArchiveContainer = () => {
	const { data, isLoading } = getAllNotes();
	const notes: NoteType[] = data || [];
	const {listMode} = useListMode();

	if (notes.length === 0) {
		return <InfoDisplay message={'You haven\'t created a note yet!'}><FaRegNoteSticky className='w-20 h-20 opacity-70 text-neutral-400' /></InfoDisplay>;
	}
	const notesArchived = notes.filter(note => note.isArchived === true);

	if (notesArchived.length <= 0) {
		return <InfoDisplay message='No notes have been archived yet'><PiArchiveBox className='w-20 h-20 opacity-70 text-neutral-400' /></InfoDisplay>;
	}
	

	return (
		<div className={`flex flex-col mx-auto max-w-[70%] md:max-w-[85%] mt-10 ${listMode ? 'md:items-center' : ''}`}>
			<div className={`${listMode ? 'grid grid-cols-1 gap-7' : 'flex flex-wrap gap-7'}`}>
				{isLoading 
					? <Loader size='30'/> 
					: notesArchived.map(note => <Note key={note._id} {...note}/>)
				}
			</div>
		</div>
	);
};


export default ArchiveContainer;