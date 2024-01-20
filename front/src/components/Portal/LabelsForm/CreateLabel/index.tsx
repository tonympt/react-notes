import { useForm } from 'react-hook-form';
import AnimatedTooltipOption from '@/components/ui/react-notes-ui/AnimatedTooltipOption';
import { RxCross2 } from 'react-icons/rx';
import { RxCheck } from 'react-icons/rx';
import { createLabel } from '@/queries/Labels/labels';

export type FormValues = {
    labelName: string;
  };

const CreateLabel = () => {
	const {mutate} = createLabel();

	const {register, handleSubmit, reset} = useForm<FormValues>({
		defaultValues: {
			labelName: ''
		}
	});
	const onSubmit = (body: FormValues) => {      
		mutate(body);
		reset();
	};


	return(

		<form className='flex justify-center items-center gap-2 text-neutral-950' onSubmit={handleSubmit(onSubmit)}>
			<AnimatedTooltipOption toolTipText='Cancel' sideOffset={3} onClick={() => reset()}>
				<RxCross2 className='text-neutral-500 w-5 h-5'/>
			</AnimatedTooltipOption>
			<input
				{...register('labelName')}
				type='text'
				name='labelName'
				autoFocus
				placeholder='Create a label...'
				className='bg-transparent py-1 w-full focus:outline-none focus:border-b focus:border-b-slate-400'
				maxLength={20}
			/>
			<button type='submit'>
				<AnimatedTooltipOption toolTipText='Validate' sideOffset={3}>
					<RxCheck className='text-neutral-500 w-5 h-5' />
				</AnimatedTooltipOption>
			</button>
		</form>

	);
};

export default CreateLabel;