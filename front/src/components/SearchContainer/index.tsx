import { LabelsType } from '@/type/labelsType';
import ItemFilter from './ItemFilter';
import { IoListSharp } from 'react-icons/io5';
import { MdOutlineTextFields } from 'react-icons/md';
import { MdLabel } from 'react-icons/md';
import ColorsFilter from './ColorsFilter';
import Loader from '../ui/Loader';
import { getAllLabels } from '@/queries/Labels/labels';
import { getAllNotes } from '@/queries/Notes/notes';
import { NoteType } from '@/zod-schema/notes';

const SearchContainer = () => {
	// get all labels
	const {data, isLoading} = getAllLabels();
	const labels: LabelsType[] = data || [];
	const labelsToUppercase = labels.map(label => label.labelName.toUpperCase().trim());
	// get all color notes
	const { data: allNotes, isLoading: loading } = getAllNotes();
	const notes: NoteType[] = allNotes || [];
	const colorsChip = Array.from(new Set(notes.map(note => note.color)));

	return(
		<div className='space-y-4'>
			<div className="mx-auto max-w-[70%] md:max-w-[50%]">
				<div className="shadow-[0_0px_2px_rgba(0,0,0,0.40)]">
					<h2 className="py-1 px-2 font-medium">Types</h2>
					<div className='grid grid-cols-4 gap-1 py-1'>
						<ItemFilter titleItem='Lists' itemTheme='types'><IoListSharp className='w-6 h-6 md:w-8 md:h-8'/></ItemFilter>
						<ItemFilter titleItem='Texts' itemTheme='types'><MdOutlineTextFields className='w-6 h-6 md:w-8 md:h-8'/></ItemFilter>
					</div>
				</div>
			</div>
			<div className="mx-auto max-w-[70%] md:max-w-[50%]">
				<div className="shadow-[0_0px_2px_rgba(0,0,0,0.40)]">
					<h2 className="py-1 px-2 font-medium">Labels</h2>
					<div className='grid grid-cols-4 gap-1 py-1'>
						{isLoading 
							? <Loader size='30' />
							: labelsToUppercase.map((label, index) => (
								<ItemFilter key={label + index} titleItem={label} itemTheme='labels'>
									<MdLabel className='w-6 h-6 md:w-8 md:h-8'/>
								</ItemFilter>
							))
						}
					</div>
				</div>
			</div>
			<div className="mx-auto max-w-[70%] md:max-w-[50%]">
				<div className="shadow-[0_0px_2px_rgba(0,0,0,0.40)]">
					<h2 className="py-1 px-2 font-medium">Colors</h2>
					<div className='flex flex-wrap gap-2 md:gap-8 px-5 py-3'>
						{loading 
							? <Loader size='30' />
							: colorsChip.map((color, index) => (
								<ColorsFilter key={color + index} color={color}></ColorsFilter>
							))
						}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchContainer;