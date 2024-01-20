import { useEffect, useMemo, useState } from 'react';
// components 
import InfoDisplay from '../InfoDisplay';
import Note from './Note';
import Loader from '../ui/Loader';
// ui icon
import { FaRegNoteSticky } from 'react-icons/fa6';
// type
import { NoteType } from '@/zod-schema/notes';
// handle external Hook DndKit
import {DndContext, DragEndEvent, closestCenter, DragOverlay, DragStartEvent} from '@dnd-kit/core';
import {SortableContext, arrayMove, rectSwappingStrategy} from '@dnd-kit/sortable';
import SortableNotes from './SortableNotes';
// queries for 
import { getAllNotes } from '@/queries/Notes/notes';
import { sortedNotPinnedNote } from '@/queries/Notes/notes';
import { useListMode } from '@/context/context.listMode';

const Notes = () => {
	const { data, isLoading } = getAllNotes();

	const notes: NoteType[] = data || [];
	const notesPinned = notes.filter(note => note.isPinned === true && note.isArchived === false);
	const notesNotPinned = notes.filter(note => note.isPinned === false && note.isArchived === false);

	const [localNotesNotPinned, setlocalNotesNotPinned] = useState<NoteType[] |[]>([]);
	const [isSorted, setIsSorted] = useState(false);
	
	const {mutate, isLoading: loading} = sortedNotPinnedNote();
	const [activeId, setActiveId] = useState<string | number | null>(null);

	const {listMode} = useListMode();

	const noteOverlay: NoteType | null | undefined = useMemo(() => {
		return activeId ? localNotesNotPinned.find(note => note._id === activeId) : null;
	}, [activeId]);

	useEffect(() => {
		if (data) {
			setlocalNotesNotPinned(notesNotPinned);
		}
	}, [data]);	

	useEffect(() => {
		if (isSorted === true && localNotesNotPinned.length > 0) {
			mutate(localNotesNotPinned);
			setIsSorted(false);
		}
	}, [isSorted, localNotesNotPinned]);
	
	
	if (notes.length === 0) {
		if (isLoading) {
			return <Loader size='30'/>; 
		}
		return <InfoDisplay message={'You haven\'t created a note yet!'}><FaRegNoteSticky className='w-20 h-20 opacity-70 text-neutral-400' /></InfoDisplay>;
	}
	
	const onDragEnd = (event: DragEndEvent) => {	
		const {active, over} = event;
		if (!active || !over || active.id === over.id) {
			return;
		}
		setlocalNotesNotPinned((notes) => {
			const oldIndex = notes.findIndex((note) => note._id === active.id);
			const newIndex = notes.findIndex((note) => note._id === over.id);
			if (oldIndex === -1 || newIndex === -1) {
				return notes;
			}
			return arrayMove(notes, oldIndex, newIndex);
		});
		setIsSorted(true);
	};

	function handleDragStart(event: DragStartEvent) {
		const {active} = event;
		setActiveId(active.id);
	}

	return (
		<div className={`flex flex-col mx-auto max-w-[70%] md:max-w-[85%] my-10 ${listMode ? 'md:items-center' : ''}`}>
			{isLoading ? <Loader size='30'/> : (
				<>
					{notesPinned && notesPinned.length > 0 && (
						<div>
							<h3 className='text-neutral-500 text-xs font-medium uppercase my-3 ml-8'>PINNED NOTES</h3>
							<div className={`${listMode ? 'grid grid-cols-1 gap-7' : 'flex flex-wrap gap-7'}`}>
								{notesPinned.map(note => <Note key={note._id} {...note} />)}
							</div>
						</div>
					)}
					<div className='mt-10'>
						{loading ? (
							<Loader size='30'/>
						) : (
							<>
								{notesPinned.length > 0 && notesNotPinned.length > 0 && (
									<h3 className='text-neutral-500 text-xs font-medium uppercase my-3 ml-8'>OTHERS</h3>
								)}
								<div className={`${listMode ? 'grid grid-cols-1 gap-7' : 'flex flex-wrap gap-7'}`}>
									<DndContext 
										collisionDetection={closestCenter} 
										onDragEnd={onDragEnd}
										onDragStart={handleDragStart}
									>
										<SortableContext items={localNotesNotPinned.map(note => note._id)} strategy={rectSwappingStrategy}>
											{localNotesNotPinned.map(note => <SortableNotes key={note._id} {...note} />)}
										</SortableContext>
										<DragOverlay>
											{activeId ? <SortableNotes {...(noteOverlay as NoteType)} /> : null}
										</DragOverlay>
									</DndContext>
								</div>
							</>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default Notes;