import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import ColorChip from './ColorChip';
import { MdOutlineColorLens } from 'react-icons/md';
import AnimatedTooltipOption from '@/components/ui/react-notes-ui/AnimatedTooltipOption';



const ColorPalette = () => {
	const colorPaletteRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLDivElement>(null);
	const [colorActive, setColorActive] = useState(0);
	const {register} = useFormContext();
	const colorsChip = ['bg-white', 'bg-red-200', 'bg-orange-200', 'bg-amber-200', 'bg-lime-200', 'bg-emerald-200', 'bg-slate-200', 'bg-cyan-200', 'bg-purple-200'];
	const [showPaletteColor, setShowPaletteColor] = useState(false);
	
	
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


	return(
		<div className='relative'>
			<div ref={buttonRef}>
				<AnimatedTooltipOption toolTipText='Background option' sideOffset={4}>
					<MdOutlineColorLens className='w-5 h-5' onClick={() => setShowPaletteColor(!showPaletteColor)}/>
				</AnimatedTooltipOption>
			</div>
			{showPaletteColor && (
				<div 
					ref={colorPaletteRef}
					className='absolute -left-14 bg-white z-10 flex flex-wrap justify-evenly gap-1 w-36 border rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-3'>
					<input {...register('color')} type="hidden" />
					{colorsChip.map((classColor, index) => (
						<ColorChip 
							index={index}
							key={`${classColor}-${index}`} 
							classColor={classColor} 
							isFisrstIndex={index === 0}
							isColorActive={colorActive === index}
							setColorActive={() =>setColorActive(index)}
						/>
                           
					))}
				</div>
			)}
		</div>
	);
};

export default ColorPalette;