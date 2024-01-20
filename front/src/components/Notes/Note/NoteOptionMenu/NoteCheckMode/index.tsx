import { RiCheckboxIndeterminateLine } from 'react-icons/ri';
import { RiCheckboxLine } from 'react-icons/ri';
import AnimatedTooltipOption from '@/components/ui/react-notes-ui/AnimatedTooltipOption';
import { NoteType } from '@/zod-schema/notes';

const NoteCheckMode = ({isCheckBoxMode}: {isCheckBoxMode: NoteType['isCheckBoxMode']}) => {
	const isDisabled = true;
	return(
		<div>
			<AnimatedTooltipOption
				disabled={isDisabled}
				toolTipText={isCheckBoxMode ? 'Check mode' : ' Text mode'} 
				sideOffset={4}>
				{isCheckBoxMode 
					? <RiCheckboxLine className='w-5 h-5' />
					: <RiCheckboxIndeterminateLine className='w-5 h-5'/> }
			</AnimatedTooltipOption>
		</div>
	);
};

export default NoteCheckMode;