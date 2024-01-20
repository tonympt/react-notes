import { FaNoteSticky } from 'react-icons/fa6';
import SearchBar from './SearchBar';
import HamburgerMenu from './HamburgerMenu';
import OptionNavBar from './OptionsNavBar';
const NavBar = () => {
	return(
		<header className="fixed z-50 top-0 left-0 right-0 flex items-center p-2 border border-b bg-white text-neutral-900 dark:bg-[#202124]">
			<div className=' flex w-[3rem] justify-center'>
				<HamburgerMenu/>
			</div>
			<div className='w-[15%] font-semibold flex md:flex-col md:items-center lg:flex-row gap-2'>
				<FaNoteSticky className='w-9 h-9 text-amber-400'/>
				<h1 className='hidden lg:block lg:text-base'>React Notes</h1>
			</div>
			<div className='w-[70%] md:w-[40%]'>
				<SearchBar />
			</div>
			<div className='w-[15%] md:w-[45%]'>
				<OptionNavBar /> 
			</div>
		</header>
	);
};
export default NavBar;
