import { ReloadIcon } from '@radix-ui/react-icons';

const Loader = ({ size }: { size: string }) => {
	const style = { width: size, height: size };
    
	return(
		<div className='grid justify-items-center'>
			<ReloadIcon className="animate-spin" style={style} />
		</div>
	);
};

export default Loader;