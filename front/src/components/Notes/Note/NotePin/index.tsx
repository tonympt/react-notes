import AnimatedTooltipOption from '@/components/ui/react-notes-ui/AnimatedTooltipOption';
import { TbPinned } from 'react-icons/tb';
import { TbPinnedFilled } from 'react-icons/tb';
import { NoteType } from '@/zod-schema/notes';
import { updateNote } from '@/queries/Notes/notes';
import { transformToPatch } from '@/utils/transformToPatch';

type NotePinProps = {
	isPinned : NoteType['isPinned'],
	id: NoteType['_id']
}

const NotePin = ({isPinned, id}: NotePinProps) => {
	const { mutate } = updateNote();

	const handleClick= () =>{
		const datasToPatch = transformToPatch({ isPinned: !isPinned });
		mutate({id, datasToPatch});
	};

	return(
		<div className="opacity-0 group-hover/notes:opacity-100 transition-opacity duration-300">
			<AnimatedTooltipOption toolTipText={isPinned ? 'Unpin note' : 'Pin note'} sideOffset={4} onClick={handleClick}>
				{isPinned 
					? <TbPinnedFilled type='button' className='w-5 h-5'/>
					: <TbPinned type='button' className='w-5 h-5'/>  }
			</AnimatedTooltipOption>
		</div>
	);
};

export default NotePin;