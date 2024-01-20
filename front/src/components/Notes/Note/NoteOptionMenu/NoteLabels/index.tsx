// import method librairies
import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
// ui  component
import { MdLabelOutline } from 'react-icons/md';
import AnimatedTooltipOption from '@/components/ui/react-notes-ui/AnimatedTooltipOption';
import { Checkbox } from '@/components/ui/shadcn-ui/checkbox';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { LabelsType } from '@/type/labelsType';
import { NoteType } from '@/zod-schema/notes';
import { updateLabelOnNote } from '@/queries/Labels/labels';
import { ScrollArea } from '@/components/ui/shadcn-ui/scroll-area-labels';

const NoteLabels = ({labels, noteId}: {labels: string[], noteId: NoteType['_id']}) => {
	const {mutate, isLoading} = updateLabelOnNote();
	const [showLabels, setShowLabels] = useState(false);
	const [checkedLabels, setCheckedLabels] = useState<string[]>(labels);
	// labels cache in react query recovery for use
	const queryClient = useQueryClient();
	// handle of the display of labels
	const [labelsDisplayed, setLabelsDisplayed] = useState<LabelsType[] | []>([]);
	// labels ref
	const labelsSelectedRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const cachedLabels: LabelsType[] | [] = queryClient.getQueryData(['labels']) || [];
		setLabelsDisplayed(cachedLabels);
	}, [labels]);

	/* === HANDLE OF SET UP LABELS WITH FETCH == */	

	const handleChange = (checked: boolean | string, labelId: LabelsType['_id']) => {
		setCheckedLabels((currentCheckedLabels) => {
			let updatedCheckedLabels;
			if (checked) {
				updatedCheckedLabels = currentCheckedLabels.includes(labelId) ? currentCheckedLabels : [...currentCheckedLabels, labelId];
			} else {
				updatedCheckedLabels = currentCheckedLabels.filter((id) => id !== labelId);
			}
			mutate({ checkedLabels: updatedCheckedLabels, noteId });
			return updatedCheckedLabels;
		});
	};


	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchValue = e.target.value.toLowerCase();
		// Get the full label cache for searching
		const fullLabelCache: LabelsType[] | [] = queryClient.getQueryData(['labels']) || [];
		// Filter the full label cache based on search input
		const newLabels = fullLabelCache.filter(label => 
			label.labelName.toLowerCase().includes(searchValue)
		);
		// Update displayed labels based on search
		setLabelsDisplayed(newLabels);};
	
	/* === HANDLE OF CLICK OUTSIDE == */
	const handleClickOutside = (event: MouseEvent) => {
		const target = event.target as HTMLElement;

		if (labelsSelectedRef.current && !labelsSelectedRef.current.contains(target) &&
            buttonRef.current && !buttonRef.current.contains(target)) {
			setShowLabels(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);
	
	
	return (
		<div className='relative z-20 '>
			<div ref={buttonRef}>
				<AnimatedTooltipOption toolTipText='Labels option' sideOffset={4}>
					<MdLabelOutline className='w-5 h-5' onClick={() => setShowLabels(!showLabels)} />
				</AnimatedTooltipOption>
			</div>
			{showLabels && (
				<div>
					<div ref={labelsSelectedRef} 
						className='absolute bg-white flex flex-col gap-1 border rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-3'>
						<h4 className='text-sm'>Note associated with a label</h4>
						<div className='flex items-center mb-2'>
							<input
								className='text-xs bg-transparent py-1 w-44 focus:outline-none focus:border-b focus:border-b-neutral-400'
								autoFocus
								placeholder='Enter the name of the label'
								type='text' 
								onChange={handleSearch} />
							<MagnifyingGlassIcon className='w-4 h-4'/>
						</div>
						<ScrollArea>
							{labelsDisplayed.map((label) => (
								<div className='flex items-center overflow-hidden'key={label._id}>
								
									<Checkbox
										onCheckedChange={(checked) => {handleChange(checked, label._id);}}
										value={label._id}
										checked={checkedLabels.includes(label._id)}
										className= {isLoading ? 'cursor-wait' : ''}
									/>
									<span className=' text-sm ml-5'>{label.labelName}</span>
								
								</div>
							))}
						</ScrollArea>
					</div>
				</div>
			)}
		</div>
	);
};



export default NoteLabels;
