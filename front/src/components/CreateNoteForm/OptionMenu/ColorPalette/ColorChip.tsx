import { useFormContext } from 'react-hook-form';
import { MdInvertColorsOff } from 'react-icons/md';
import { CheckIcon } from '@radix-ui/react-icons';

type ColorsChipProps = {
    index: number,
    classColor: string,
    isFisrstIndex: boolean,
    isColorActive: boolean,
    setColorActive: (index: number) => void
}

const ColorChip = ({ classColor, isFisrstIndex, index, isColorActive, setColorActive }: ColorsChipProps) => {
	const { setValue } = useFormContext();
	const handleClick = () => {
		setValue('color', classColor);
		setColorActive(index);
	}; 

	return (
		<button 
			type='button'
			className={`relative w-7 h-7 flex justify-center items-center ${isFisrstIndex && !isColorActive ? 'border-2 border-slate-300' : ''} ${isColorActive ? 'border-purple-500 border-2' : ''} rounded-full ${classColor}`}
			onClick={handleClick}
		>
			{isFisrstIndex && <MdInvertColorsOff className="w-4 h-4" />}
			{isColorActive ? <CheckIcon className='bg-purple-500 w-3 h-3 text-slate-50 rounded-full absolute -top-1 -right-1'/> : null}
		</button>
	);
};

export default ColorChip;