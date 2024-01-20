import NoteTitle from '../Note/NoteTitle';
import { NoteType } from '@/zod-schema/notes';
import NoteItems from '../Note/NoteItems';
import NotePin from '../Note/NotePin';
import NoteOptionsMenu from '../Note/NoteOptionMenu';
import NoteUpdateAt from '../Note/NoteUpdateAt';
import NoteLabels from '../Note/NoteLabels';
import {CSS} from '@dnd-kit/utilities';
import { TbArrowsMove } from 'react-icons/tb';
import AnimatedTooltipOption from '@/components/ui/react-notes-ui/AnimatedTooltipOption';
import { FaCircleCheck } from 'react-icons/fa6';
import { useSortable } from '@dnd-kit/sortable';
import { useListMode } from '@/context/context.listMode';


const SortableNotes = ({title, items, isCheckBoxMode, isPinned, color, updatedAt, _id, isArchived, labels}: NoteType) => {
	const {listMode} = useListMode();
	const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id:_id});
	const style = {
		transition,
		transform: CSS.Translate.toString(transform)
	};

	
	return(
		<div
			ref={setNodeRef}
			style={style}
			className={`relative group/notes w-full md:w-64 border h-min rounded-md text-neutral-800 px-5 py-3 hover:shadow-[rgba(0,_0,_0,_0.20)_0px_2px_8px] ${color}
			${color}
			${listMode ? 'w-full md:w-[32rem]' : 'w-full md:w-64'}
			`}
		>
			<div className='flex items-center justify-center'>
				<NoteTitle title={title} id={_id} />
				<NotePin isPinned={isPinned} id={_id}/>
			</div>
			<div
			>
				<NoteItems
					items={items} isCheckBoxMode={isCheckBoxMode} noteId={_id}/>
				<div className='flex justify-end mt-5 mb-1'>
					<NoteUpdateAt 
						updatedAt={updatedAt} />
				</div>
			</div>
			<NoteLabels labels={labels}/>

			<div className="grid grid-cols-7 place-items-center opacity-0 group-hover/notes:opacity-100 transition-opacity duration-300">
				<AnimatedTooltipOption toolTipText='Move'>
					<TbArrowsMove
						{...attributes}
						{...listeners}
						className='outline-none w-5 h-5 cursor-grab'/>
				</AnimatedTooltipOption>
				<NoteOptionsMenu color={color} isCheckBoxMode={isCheckBoxMode} id={_id} isArchived={isArchived} labels={labels}/>
			</div>
			<FaCircleCheck className='w-5 h-5 text-neutral-950 bg-white rounded-full opacity-0 group-hover/notes:opacity-100 transition-opacity duration-300 absolute -top-3 -left-2' />
		</div>
	);
};

export default SortableNotes;