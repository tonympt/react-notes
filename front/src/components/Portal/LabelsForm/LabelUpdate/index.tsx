import { useForm } from 'react-hook-form';
import AnimatedTooltipOption from '@/components/ui/react-notes-ui/AnimatedTooltipOption';
import { RxCheck } from 'react-icons/rx';
import { MdLabel } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { RiPencilFill } from 'react-icons/ri';
import { useState } from 'react';
import { deleteLabel, updateLabel } from '@/queries/Labels/labels';
import { LabelsType } from '@/type/labelsType';


type FormValues = {
    labelName: LabelsType['labelName'];
	_id: LabelsType['_id'];
  };

type LabelUpdateprops = FormValues;

const LabelUpdate = ({labelName, _id: labelId}: LabelUpdateprops) => {
	const [isInputFocused, setIsInputFocused] = useState(false);
	const {mutate} = updateLabel();
	const {mutate: change} = deleteLabel();
	const {register, handleSubmit, setFocus} = useForm<FormValues>({
		defaultValues: {
			labelName,
		}
	});

	const onSubmit = (body: FormValues) => {
		mutate({labelId, body});
	};

	const handlePencilFocus = () => {
		setIsInputFocused(true);
		setFocus('labelName');
	};

	return(

		<form className='flex justify-center items-center gap-2 text-neutral-950' onSubmit={handleSubmit(onSubmit)}>
			<div className='group'>
				<div className='group-hover:hidden'>
					<AnimatedTooltipOption toolTipText='Cancel' sideOffset={3}>
						<MdLabel className='text-neutral-500 w-5 h-5 '/>
					</AnimatedTooltipOption>
				</div>
				<div className='hidden group-hover:block'>
					<AnimatedTooltipOption  toolTipText='Delete label' sideOffset={3} onClick={() => change(labelId)}>
						<FaTrash className='text-neutral-500 w-4 h-4 '/>
					</AnimatedTooltipOption>
				</div>
			</div>
			<input
				{...register('labelName')}
				type='text'
				name= 'labelName'
				placeholder='Modify the label...'
				className='bg-transparent py-1 w-full focus:outline-none focus:border-b focus:border-b-neutral-400'
				maxLength={20}
				onFocus={() => setIsInputFocused(true)}
			/>
			<div>
				{!isInputFocused 
					? (<AnimatedTooltipOption toolTipText='Rename label' sideOffset={3} onClick={handlePencilFocus}>
						<RiPencilFill className='text-neutral-500 w-5 h-5 cursor-pointer' />
					</AnimatedTooltipOption>)
					: null}
				{isInputFocused 
					? (
						<button type='submit'>
							<AnimatedTooltipOption toolTipText='Confirm rename' sideOffset={3}>
								<RxCheck className='text-neutral-500 w-5 h-5' />
							</AnimatedTooltipOption>
						</button>) 
					:null}
			</div>
		</form>

	);
};

export default LabelUpdate;
