import { useFormContext } from 'react-hook-form';
import AnimatedTooltipOption from '@/components/ui/react-notes-ui/AnimatedTooltipOption';
import { TbPinned } from 'react-icons/tb';
import { TbPinnedFilled } from 'react-icons/tb';

const PinnedInput = () => {
	const {setValue, register, watch} = useFormContext();
	const isPinnedState = watch('isPinned');
	const handleClick = () => {
		setValue('isPinned', !isPinnedState);
	};
	return(
		<div className="">
			<input {...register('isPinned')} type='hidden'/>
			<AnimatedTooltipOption toolTipText={isPinnedState ? 'Unpin note' : 'Pin note'} sideOffset={4} onClick={handleClick}>
				{isPinnedState 
					? <TbPinnedFilled type='button' className='w-5 h-5'/> 
					: <TbPinned type='button' className='w-5 h-5'/>}
			</AnimatedTooltipOption>
		</div>
	);
};

export default PinnedInput;