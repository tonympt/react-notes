import { useFormContext } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';

const TitleInput = () => {
	const {register} = useFormContext();
	return(
		<TextareaAutosize
			{...register('title')}
			placeholder='Title'
			name='title'
			id='title'
			rows={1}
			className='text-base outline-none font-medium w-full bg-transparent py-1 resize-none'
		>
		</TextareaAutosize>
	);
};

export default TitleInput;