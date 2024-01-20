import { FiTrash2 } from 'react-icons/fi';
import AnimatedTooltipOption from '@/components/ui/react-notes-ui/AnimatedTooltipOption';
import { NoteType } from '@/zod-schema/notes';
import { deleteNote } from '@/queries/Notes/notes';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/shadcn-ui/alert-dialog/alert-dialog';

const NoteRemove = ({noteId} : {noteId : NoteType['_id']}) => {
	const { mutate } = deleteNote();	
	const handleClick = () => {
		mutate(noteId);
	};
	return(
		<div>
			<AlertDialog>
				<AlertDialogTrigger>
					<AnimatedTooltipOption toolTipText='Delete' sideOffset={4}>
						<FiTrash2 className='w-5 h-5' />
					</AnimatedTooltipOption>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader className='text-neutral-950'>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription className='text-neutral-800'>
        This action cannot be undone. This will permanently delete your note
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction className='bg-neutral-950' onClick={handleClick}>Continue</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default NoteRemove;