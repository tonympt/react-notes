import { FaMagnifyingGlass } from 'react-icons/fa6';
import AnimatedTooltipOption from '@/components/ui/react-notes-ui/AnimatedTooltipOption';
import { Link, useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { useEffect, useState } from 'react';
import { Cross1Icon } from '@radix-ui/react-icons';

const SearchBar = () => {
	const  navigate = useNavigate();
	const [textQuery, setTextQuery] = useState('');
	const [isInputFocused, setIsInputFocused] = useState(false);
	const [searchQuery] = useDebounce(textQuery, 500);
	
	useEffect(() => {
		if (textQuery != '') {
			navigate(`/search/${searchQuery}`, { state: { some: 'searchQuery' } });
		}
	}, [searchQuery]);
	return(
	
		<div className="bg-neutral-100 rounded-md p-1 focus-within:bg-white focus-within:shadow-md py-2">
			<Link to="/search" className='ml-2 flex items-center justify-between'>
				<AnimatedTooltipOption toolTipText='Search' sideOffset={9}>
					<FaMagnifyingGlass />
				</AnimatedTooltipOption>
				<input type='text'
					className='bg-transparent focus:outline-none px-2 focus:bg-white w-full'
					placeholder='Search...'
					value={textQuery}
					onChange={(e) => setTextQuery(e.target.value)}
					onFocus={() => setIsInputFocused(true)}
					onBlur={() => setIsInputFocused(false)}
				/>
				<div className={`${isInputFocused ? 'opacity-100' : 'opacity-0'}`}>
					<AnimatedTooltipOption toolTipText='Delete search' sideOffset={9} onClick={() => setTextQuery('')}>
						<Cross1Icon />
					</AnimatedTooltipOption>
				</div>
			</Link>
		
		</div>
	);
};
export default SearchBar;