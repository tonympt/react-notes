// import method librairies
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQueryClient } from 'react-query';
// ui  component
import { MdLabelOutline } from 'react-icons/md';
import AnimatedTooltipOption from '@/components/ui/react-notes-ui/AnimatedTooltipOption';
import { Checkbox } from '@/components/ui/shadcn-ui/checkbox';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { LabelsType } from '@/type/labelsType';
import { ScrollArea } from '@/components/ui/shadcn-ui/scroll-area-labels';

const LabelsOption = () => {

	const [showLabels, setShowLabels] = useState(false);
	const [checkedLabels, setCheckedLabels] = useState<string[]>([]);
	// labels cache in react query recovery for use
	const queryClient = useQueryClient();
	const labelsCacheInReactQuery: LabelsType[] | [] = queryClient.getQueryData(['labels']) || [];
	// handle of the display of labels
	const [labelsDisplayed, setLabelsDisplayed] = useState(labelsCacheInReactQuery);
	// labels ref
	const labelsSelectedRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLDivElement>(null);
	// update state labels of react hook form
	const {setValue} = useFormContext();

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchValue = e.target.value.toLowerCase();
		const newLabels = labelsCacheInReactQuery.filter(label => 
			label.labelName.toLowerCase().includes(searchValue)
		);
		setLabelsDisplayed(newLabels);
	};

	/* === HANDLE OF SET UP LABELS IN REACT HOOK FORM == */	

	const handleChange = (checked: boolean | string, labelId: LabelsType['_id']) => {
		setCheckedLabels((currentCheckedLabels) => {
			if (checked) {
				return currentCheckedLabels.includes(labelId) ? currentCheckedLabels : [...currentCheckedLabels, labelId];
			} else {
				return currentCheckedLabels.filter((id) => id !== labelId);
			}
		});
	};

	useEffect(() => {
		setValue('labels', checkedLabels);
	}, [checkedLabels, setValue]);

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
		<div className='relative z-20'>
			<div ref={buttonRef}>
				<AnimatedTooltipOption toolTipText='Labels option' sideOffset={4}>
					<MdLabelOutline className='w-5 h-5 ' onClick={() => setShowLabels(!showLabels)} />
				</AnimatedTooltipOption>
			</div>
			{showLabels && (
				
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
					<ScrollArea className='flex items-center'>
						<div className='overflow-hidden'>
							{labelsDisplayed.map((label) => (
								<div key={label._id}>
									<Checkbox
										onCheckedChange={(checked) => {handleChange(checked, label._id);}}
										value={label._id}
										checked={checkedLabels.includes(label._id)} 
									/>
									<span className=' text-sm ml-5'>{label.labelName}</span>
								</div>
							))}
						</div>
					</ScrollArea>
				</div>
			)}
		</div>
	);
};



export default LabelsOption;
