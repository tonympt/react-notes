import { NoteType } from '@/zod-schema/notes';
import TextareaAutosize from 'react-textarea-autosize';
import { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { updateNote } from '@/queries/Notes/notes';
import { transformToPatch } from '@/utils/transformToPatch'; 
type NoteTitleProps = {
  title: NoteType['title'],
  id: NoteType['_id'],
}

const NoteTitle = ({ title, id }: NoteTitleProps) => {
	const [localTitle, setLocalTitle] = useState(title);
	const { mutate } = updateNote();

	const debounced = useDebouncedCallback((valueChange) => {
		setLocalTitle(valueChange);
	}, 1000);

	useEffect(() => {
		if (localTitle !== title) {
			const datasToPatch = transformToPatch({ title: localTitle });	
			mutate({id, datasToPatch});
		}
	}, [localTitle, title]);

	return (
		<TextareaAutosize
			defaultValue={title}
			placeholder='Title'
			name='title'
			id='title'
			rows={1}
			className='text-base outline-none font-medium w-full bg-transparent py-1 resize-none'
			onChange={(e) => debounced(e.target.value)}
		/>

	);
};

export default NoteTitle;