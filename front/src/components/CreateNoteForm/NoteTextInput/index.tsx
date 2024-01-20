import TextareaAutosize from 'react-textarea-autosize';
import { useFieldArray, useFormContext } from 'react-hook-form';

const NoteTextInput = () => {
	const { control } = useFormContext();
	const { update } = useFieldArray({
		name: 'items',
		control
	});

	const handleChangeArrayValue = (index: number, e: React.ChangeEvent<HTMLTextAreaElement>) => {
		update(index, { text: e.target.value, isCompleted: false });
	};

	return (
		<TextareaAutosize
			rows={1}
			placeholder='Create a note...'
			className='bg-transparent outline-none w-full resize-none'
			onChange={(e) => handleChangeArrayValue(0, e)}
		/>

	);
};

export default NoteTextInput;