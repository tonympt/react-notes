import { useCallback, useEffect, useRef, useState } from 'react';
import ColorChip from './NoteColorChip';
import { MdOutlineColorLens } from 'react-icons/md';
import AnimatedTooltipOption from '@/components/ui/react-notes-ui/AnimatedTooltipOption';
import { NoteType } from '@/zod-schema/notes';
import { updateNote } from '@/queries/Notes/notes';
import { transformToPatch } from '@/utils/transformToPatch';
import { useQueryClient } from 'react-query';

type NoteColorPaletteProps = {
	color: NoteType['color'],
	noteId: NoteType['_id']
}

const NoteColorPalette = ({color, noteId} : NoteColorPaletteProps) => {
	const colorPaletteRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLDivElement>(null);
	const colorsChip = ['bg-white', 'bg-red-200', 'bg-orange-200', 'bg-amber-200', 'bg-lime-200', 'bg-emerald-200', 'bg-slate-200', 'bg-cyan-200', 'bg-purple-200'];
	const [showPaletteColor, setShowPaletteColor] = useState(false);
	const queryClient = useQueryClient();
	const {mutate, isLoading} = updateNote();
	
	const handleClickOutside = (event: MouseEvent) => {
		const target = event.target as HTMLElement;
		if (colorPaletteRef.current && !colorPaletteRef.current.contains(target) &&
            buttonRef.current && !buttonRef.current.contains(target)) {
			setShowPaletteColor(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleChangeColor = useCallback((classColorChange: NoteType['color']) => {
		const notes = queryClient.getQueryData<NoteType[]>(['notes']);
		const note = notes?.find(note => note._id === noteId);
		const previousColor = note?.color;
		// Fetch only if the new color is not the same as the previous one
		if (previousColor != classColorChange) {
			const datasToPatch = transformToPatch({ color: classColorChange });
			mutate({ id: noteId, datasToPatch });
		}
	}, [noteId]);

	return(
		<div className='relative z-20'>
			<div ref={buttonRef}>
				<AnimatedTooltipOption toolTipText='Background option' sideOffset={4}>
					<MdOutlineColorLens className='w-5 h-5' onClick={() => setShowPaletteColor(!showPaletteColor)}/>
				</AnimatedTooltipOption>
			</div>
			{showPaletteColor && (
				<div 
					ref={colorPaletteRef}
					className='absolute -left-14 bg-white flex flex-wrap justify-evenly gap-1 w-36 border rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-3'>
					{colorsChip.map((classColor, index) => (
						<ColorChip
							isFirstIndex={index === 0}
							classColor={classColor}
							key={`${classColor}-${index}`} 
							isColorActive={color === classColor}
							handleChangeColor={handleChangeColor}
							isLoading={isLoading}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default NoteColorPalette;

