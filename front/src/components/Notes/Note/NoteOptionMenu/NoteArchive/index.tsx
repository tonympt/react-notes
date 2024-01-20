import AnimatedTooltipOption from '@/components/ui/react-notes-ui/AnimatedTooltipOption';
import { NoteType } from '@/zod-schema/notes';
import { updateNote } from '@/queries/Notes/notes';
import { transformToPatch } from '@/utils/transformToPatch';
import { MdOutlineArchive } from 'react-icons/md';


type NoteArchiveProps = {
	noteId: NoteType['_id'],
    isArchived: NoteType['isArchived']
}

const NoteArchive = ({isArchived, noteId}: NoteArchiveProps) => {
	const { mutate, isLoading } = updateNote();

	const handleClick= () =>{
		const datasToPatch = transformToPatch({ isArchived: !isArchived });
		mutate({id: noteId, datasToPatch});
	};

	return(
		<div className="">
			<AnimatedTooltipOption toolTipText={isArchived ? 'Unarchive' : 'Archive'} sideOffset={4} disabled={isLoading} onClick={handleClick}>
				<MdOutlineArchive 
					type='button'
					className='w-5 h-5'/> 
			</AnimatedTooltipOption>
		</div>
	);
};

export default NoteArchive;