import { RiCheckboxIndeterminateLine } from 'react-icons/ri';
import { RiCheckboxLine } from 'react-icons/ri';
import AnimatedTooltipOption from '@/components/ui/react-notes-ui/AnimatedTooltipOption';
import { useFormContext } from 'react-hook-form';

const InputCheckMode = () => {
	const {register, setValue, watch, resetField} = useFormContext();
	const checkModeState = watch('isCheckBoxMode');

	const handleClick = () => {
		setValue('isCheckBoxMode', !checkModeState);
		resetField('items');
	};

	return(
		<div>
			<input {...register('isCheckBoxMode')} type='hidden'/> 
			<AnimatedTooltipOption 
				toolTipText={checkModeState ? 'Text Mode' : 'Check mode'} 
				sideOffset={4} 
				onClick={handleClick}>
				{checkModeState 
					? <RiCheckboxIndeterminateLine className='w-5 h-5'/> 
					: <RiCheckboxLine className='w-5 h-5' />}
			</AnimatedTooltipOption>
		</div>
	);
};

export default InputCheckMode;