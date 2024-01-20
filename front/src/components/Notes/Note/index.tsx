import NoteTitle from './NoteTitle';
import { NoteType } from '@/zod-schema/notes';
import NoteItems from './NoteItems';
import NotePin from './NotePin';
import NoteOptionsMenu from './NoteOptionMenu';
import NoteUpdateAt from './NoteUpdateAt';
import NoteLabels from './NoteLabels';

import { FaCircleCheck } from 'react-icons/fa6';
import { useListMode } from '@/context/context.listMode';


const Note = ({title, items, isCheckBoxMode, isPinned, color, updatedAt, _id, isArchived, labels}: NoteType) => {
	const {listMode} = useListMode();
	return(

		<div 
			className={`relative group/notes border h-min rounded-md text-neutral-800 px-5 py-3 hover:shadow-[rgba(0,_0,_0,_0.20)_0px_2px_8px] 
			${color}
			${listMode ? 'w-full md:w-[32rem]' : 'w-full md:w-64'}
			`}>
			<div className='flex items-center justify-center'>
				<NoteTitle title={title} id={_id} />
				<NotePin isPinned={isPinned} id={_id}/>
			</div>
			<div>
				<NoteItems items={items} isCheckBoxMode={isCheckBoxMode} noteId={_id}/>
				<div className='flex justify-end mt-5 mb-1'>
					<NoteUpdateAt updatedAt={updatedAt} />
				</div>
			</div>
			<NoteLabels labels={labels}/>
			<div className="grid grid-cols-6 place-items-center opacity-0 group-hover/notes:opacity-100 transition-opacity duration-300">
				<NoteOptionsMenu color={color} isCheckBoxMode={isCheckBoxMode} id={_id} isArchived={isArchived} labels={labels}/>
			</div>
			<FaCircleCheck className='w-5 h-5 text-neutral-950 bg-white rounded-full opacity-0 group-hover/notes:opacity-100 transition-opacity duration-300 absolute -top-3 -left-2' />
		</div>
			
	);
};



export default Note;