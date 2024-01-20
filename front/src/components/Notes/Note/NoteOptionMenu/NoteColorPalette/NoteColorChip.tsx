import { NoteType } from '@/zod-schema/notes';
import { CheckIcon } from '@radix-ui/react-icons';
import { MdInvertColorsOff } from 'react-icons/md';


type ColorsChipProps = {
	isFirstIndex: boolean,
    classColor: string,
    isColorActive: boolean,
	isLoading: boolean
	handleChangeColor: (classColor: NoteType['color']) => void
}

const NoteColorChip = ({ classColor, isColorActive, isFirstIndex, handleChangeColor, isLoading}: ColorsChipProps) => {

	return (
		<button 
			type='button'
			className={`relative w-7 h-7 flex justify-center items-center ${isFirstIndex && !isColorActive ? 'border-2 border-slate-300' : ''} ${isColorActive ? 'border-purple-500 border-2' : ''} 
			rounded-full ${classColor}`}
			onClick={() => handleChangeColor(classColor)}
			disabled= {isLoading}
		>
			{isFirstIndex && <MdInvertColorsOff className="w-4 h-4" />}
			{isColorActive ? <CheckIcon className='bg-purple-500 w-3 h-3 text-slate-50 rounded-full absolute -top-1 -right-1'/> : null}
		</button>
	);
};

export default NoteColorChip;

