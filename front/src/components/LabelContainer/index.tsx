import { useParams } from 'react-router-dom';
import Note from '../Notes/Note';
import InfoDisplay from '../InfoDisplay';
import { MdErrorOutline } from 'react-icons/md';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { FaRegNoteSticky } from 'react-icons/fa6';
import { getAllNotes } from '@/queries/Notes/notes';
import { NoteType } from '@/zod-schema/notes';
import Loader from '../ui/Loader';
import { useQueryClient } from 'react-query';
import { LabelsType } from '@/type/labelsType';
import { useListMode } from '@/context/context.listMode';

const LabelContainer = () => {
	const { data, isLoading } = getAllNotes();
	const { labelToUrl } = useParams();
	const notes: NoteType[] = data || [];
	const {listMode} = useListMode();

	// state of cache labels (react queries)
	const queryClient = useQueryClient();
	const labelsOnCache: LabelsType[] = queryClient.getQueryData(['labels']) || [];
	const isExistingLabel = labelsOnCache.map(label => label.labelName.toLocaleLowerCase().trim()).some(label => label === labelToUrl);
	
	if (!isExistingLabel || labelToUrl === undefined) {
		return <InfoDisplay message='This label does not exist'><MdErrorOutline className='w-20 h-20 opacity-70 text-neutral-400' /></InfoDisplay>;
	}

	if (notes.length === 0) {
		return <InfoDisplay message={'You haven\'t created a note yet!'}><FaRegNoteSticky className='w-20 h-20 opacity-70 text-neutral-400' /></InfoDisplay>;
	}

	const processedLabel = labelToUrl.toLowerCase().trim();
	const notesWithMatchingLabels = notes.filter(note => 
		note.labels.some(labelObj => 
			labelObj.labelName.toLowerCase().trim() === processedLabel
		)
	);

	if (notesWithMatchingLabels.length <= 0) {
		return <InfoDisplay message='No notes found for this label'><FaMagnifyingGlass className='w-20 h-20 opacity-70 text-neutral-400' /></InfoDisplay>;
	}
	

	return (
		<div className={`flex flex-col mx-auto max-w-[70%] md:max-w-[85%] mt-10 ${listMode ? 'md:items-center' : ''}`}>
			<div className={`${listMode ? 'grid grid-cols-1 gap-7' : 'flex flex-wrap gap-7'}`}>
				{isLoading 
					? <Loader size='30'/> 
					: notesWithMatchingLabels.map(note => <Note key={note._id} {...note}/>)
				}
			</div>
		</div>
	);
};


export default LabelContainer;