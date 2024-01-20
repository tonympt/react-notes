import React from 'react';
import { Link } from 'react-router-dom';

type ItemFilterProps = {
  children: React.ReactNode;
  titleItem: string;
  itemTheme: string;
};

const ItemFilter: React.FC<ItemFilterProps> = ({ children, titleItem, itemTheme }) => {
	return (
		<Link to={`${titleItem.toLowerCase()}`} state={{some: itemTheme}}>
			<div className={`py-[25%] flex flex-col items-center gap-2
		${itemTheme === 'types' ? 'bg-blue-500 text-white' : ''}
		${itemTheme === 'labels' ? 'bg-neutral-100 text-neutral-500 ' : ''}
		`}>
				{children}
				<h3 className={`text-xs md:text-sm ${itemTheme === 'labels' ? 'text-black ' : ''}`}>{titleItem}</h3>
			</div>
		</Link>
	);
};

export default ItemFilter;