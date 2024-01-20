import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/shadcn-ui/accordion';
import TextareaAutosize from 'react-textarea-autosize';
import { PlusIcon } from '@radix-ui/react-icons';
import NoteItemList from './NoteItemList';
import { ItemType, NoteType } from '@/zod-schema/notes';
import { useCallback, useState } from 'react';
import { addItem } from '@/queries/Items/items';
import Loader from '@/components/ui/Loader';
import { ScrollArea } from '@/components/ui/shadcn-ui/scroll-area';

type NoteItemsListsProps = {
    items: ItemType[];
    noteId: NoteType['_id'];
};

const NoteItemsLists = ({ items, noteId }: NoteItemsListsProps) => {
	const [textInput, setTextInput] = useState('');
	const { mutate, isLoading } = addItem();
	const checkedTask = items.filter(task => task.isCompleted);
	const uncheckedTasks = items.filter(task => !task.isCompleted);

	const handleCreateItemWithInput = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			const body = {'text' : textInput};
			mutate({body, noteId});
			setTextInput('');
		}
	}, [textInput]);

	return (
		<ScrollArea className="flex items-center">
			<ul className="flex flex-col">
				{
					!isLoading 
						? uncheckedTasks.map((item) => (
							<NoteItemList 
								key={item._id}
								itemId={item._id}
								noteId={noteId}
								{...item} />
						))
						: <Loader size='20' />
				}
				<div className='flex items-center w-full hover:border-y focus-within:border-y border-neutral-400'>
					<PlusIcon className='w-5 h-5 text-neutral-500'/> 
					<TextareaAutosize
						value={textInput}
						className='bg-transparent outline-none py-1 px-2 resize-none w-full overflow-hidden'
						rows={1}
						onChange={(e)=> setTextInput(e.target.value)}
						onKeyDown={(e) => handleCreateItemWithInput(e)}
						placeholder='Press Enter to add task'
					/>
				</div>
				{checkedTask.length > 0 
					? <Accordion type='single'collapsible className="w-full">
						<AccordionItem value='item'>
							<AccordionTrigger className='text-neutral-500'>
								{`${checkedTask.length} ${checkedTask.length === 1 ? 'completed item' : 'completed items'}`}
							</AccordionTrigger>
							<AccordionContent>
								{checkedTask.map((item) => (
									<NoteItemList 
										key={item._id} 
										itemId={item._id}
										noteId={noteId}	
										{...item}/>
								))}
				
							</AccordionContent>
						</AccordionItem>
					</Accordion> 
					: null}
			</ul>
		</ScrollArea>
	);
};

export default NoteItemsLists;