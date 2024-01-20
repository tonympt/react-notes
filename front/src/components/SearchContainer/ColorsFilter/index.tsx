import { Link } from 'react-router-dom';

const ColorsFilter = ({color}: {color: string}) => {
	return(
		<Link to={`${color.toLowerCase()}`} state={{some: 'colors'}}>
			<div className={`rounded-full border border-neutral-400 w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 hover:border-black ${color}`}></div>
		</Link>
	);
};
export default ColorsFilter;