/* eslint-disable @typescript-eslint/no-unused-vars */
import { MdOutlineContentCopy } from 'react-icons/md';
import AnimatedTooltipOption from '@/components/ui/react-notes-ui/AnimatedTooltipOption';
import { useQueryClient } from 'react-query';
import { ItemType, NoteType } from '@/zod-schema/notes';
import { createNote } from '@/queries/Notes/notes';
import { toast } from '@/components/ui/shadcn-ui/toast/use-toast';

type ItemWithoutIdType = Omit<ItemType, '_id'>;

const NoteCopy = ({noteId}: {noteId: NoteType['_id']}) => {
	const queryClient = useQueryClient();
	const {mutate} = createNote();

	const handleClick = () => {
		const notes = queryClient.getQueryData<NoteType[]>(['notes']);
		if (notes) {
			const note = notes.find(note => note._id === noteId);
			if (note) {
				const prepareNoteForFetch = ({ _id, __v, items, ...rest }: NoteType) => {
					const itemWithoutId: ItemWithoutIdType[] = items.map(({ _id, ...itemRest }) => itemRest);
					return { ...rest, items: itemWithoutId };
				};
				const notePreparedToFetch = prepareNoteForFetch(note);
				mutate(notePreparedToFetch);
			} else {
				toast({
					variant: 'destructive',
					title: 'Note not found',
					description: 'The requested note could not be found for copying.'
				});
			}
		} else {
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong.',
				description: 'The copy of the note could not be made'
			});
		}
	};
	
	return(
		<div>
			<AnimatedTooltipOption toolTipText='Copy' sideOffset={4} onClick={handleClick}>
				<MdOutlineContentCopy className='w-5 h-5'/>
			</AnimatedTooltipOption>
		</div>
	);
};

export default NoteCopy;