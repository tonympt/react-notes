import TextareaAutosize from 'react-textarea-autosize';
import AnimatedTooltipOption from '@/components/ui/react-notes-ui/AnimatedTooltipOption';
import { Checkbox } from '@/components/ui/shadcn-ui/checkbox';
import { Cross1Icon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { ItemType, NoteType } from '@/zod-schema/notes';
import { useDebounce } from 'use-debounce';
import { transformToPatch } from '@/utils/transformToPatch';
import { updateItem, deleteItem } from '@/queries/Items/items';

type ItemTypeListProps = {
	isCompleted: ItemType['isCompleted'],
	text: ItemType['text'],
	itemId: ItemType['_id']
	noteId: NoteType['_id']
}

const NoteItemList = (({ isCompleted, text, itemId, noteId }: ItemTypeListProps) => {
	const [isChecked, setIsChecked] = useState(isCompleted);
	const [localText, setLocalText] = useState(text);
	const [textToFetch] = useDebounce(localText, 1000);
	const { mutate, isLoading } = updateItem();
	const { mutate: change } = deleteItem();

	const handleChecked = () => {
		const datasToPatch = transformToPatch({ isCompleted: !isChecked });
		setIsChecked(!isChecked);
		mutate({noteId, itemId, datasToPatch});
	};

	useEffect(() => {
		if (textToFetch !== text) {
			const datasToPatch = transformToPatch({ text: textToFetch });	
			mutate({noteId, itemId, datasToPatch});
		}
	}, [textToFetch]);
	

	const handleDelete = () => {
		change({noteId, itemId});
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
		}
	};

	return (
		<li className="flex items-center group/items hover:border-y focus-within:border-y border-neutral-400">
			<Checkbox
				disabled={isLoading}
				onCheckedChange={handleChecked}
				checked={isChecked}
			/>
			<TextareaAutosize
				disabled={isChecked}
				value={localText}
				onKeyDown={handleKeyDown} 
				onChange={(e) => setLocalText(e.target.value)}
				rows={1}
				className={`bg-transparent outline-none ml-2 py-1 px-2 w-full resize-none ${isChecked ? 'line-through' : ''} overflow-hidden`}
			/>
			<AnimatedTooltipOption toolTipText='Delete' sideOffset={4} onClick={handleDelete}>
				<Cross1Icon className="opacity-0 group-focus-within/items:opacity-100 group-hover/items:opacity-100"/>
			</AnimatedTooltipOption>
		</li>
	);
});


export default NoteItemList;