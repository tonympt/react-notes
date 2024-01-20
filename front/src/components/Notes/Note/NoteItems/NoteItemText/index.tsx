import { useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { NoteType } from '@/zod-schema/notes';
import { useDebounce } from 'use-debounce';
import { updateItem } from '@/queries/Items/items';
import { transformToPatch } from '@/utils/transformToPatch';
import { ScrollArea } from '@/components/ui/shadcn-ui/scroll-area';

type NoteItemType = {
	item: NoteType['items'][number],
	noteId: NoteType['_id']
}

const NoteItemtext = ({item, noteId}: NoteItemType) => {
	const [localText, setLocalText] = useState(item.text);
	const [textToFetch] = useDebounce(localText, 1000);
	const { mutate } = updateItem();

	const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) =>{
		setLocalText(e.target.value);
	};
	useEffect(() => {
		if (textToFetch !== item.text) {
			const itemId = item._id;
			const datasToPatch = transformToPatch({ text: textToFetch });	
			mutate({noteId, itemId, datasToPatch});
		}
	}, [textToFetch]);
	
	return (
		<ScrollArea className="flex items-center">
			<TextareaAutosize
				value={localText}
				onChange={handleChangeText}
				rows={1}
				className='bg-transparent outline-none w-full resize-none overflow-hidden'
			/>
		</ScrollArea >
	);
};

export default NoteItemtext;