import InfoDisplay from '@/components/InfoDisplay';
import Note from '@/components/Notes/Note';
import Loader from '@/components/ui/Loader';
import { useListMode } from '@/context/context.listMode';
import { getAllNotes } from '@/queries/Notes/notes';
import { filterNotes } from '@/utils/filterNotes';
import { NoteType } from '@/zod-schema/notes';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { useLocation, useParams } from 'react-router-dom';

const FilteredNotes = () => {
	const {listMode} = useListMode();
	// get all color notes
	const { data: allNotes, isLoading } = getAllNotes();
	const notes: NoteType[] = allNotes || [];
	// URL params
	const { state: filter } = useLocation();
	const { textParams } = useParams();
	// get filtered notes
	const notesToDisplay = filterNotes(notes, filter.some, textParams);

	if (notesToDisplay.length <= 0) {
		return <InfoDisplay message='No notes found for this filter'><FaMagnifyingGlass className='w-20 h-20 opacity-70 text-neutral-400' /></InfoDisplay>;
	}
    
	return(
		isLoading 
			? <Loader size='30'/> 
			: <div className={`flex flex-col mx-auto max-w-[70%] md:max-w-[85%] mt-10 ${listMode ? 'md:items-center' : ''}`}>
				<div className={`${listMode ? 'grid grid-cols-1 gap-7' : 'flex flex-wrap gap-7'}`}>
					{notesToDisplay.map(note => <Note key={note._id} {...note} />)}
				</div>
			</div>
	);
};

export default FilteredNotes;