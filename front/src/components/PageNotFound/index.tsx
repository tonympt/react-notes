import { Link } from 'react-router-dom';
import { Button } from '../ui/shadcn-ui/button';

const PageNotFound = () => {
	return(
		<div className="flex flex-col items-center justify-center h-screen space-y-6">
			<p className="text-center text-9xl font-bold px-2 bg-gradient-to-r from-orange-600 to-yellow-500 text-transparent "
				style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>
    Oops !
			</p>
			<h1 className="text-center font-bold text-xl">404 - PAGE NOT FOUND ⛔</h1>
			<p className="text-center">The page you are looking for might have been removed,<br/>
            had its name changed, or is temporarily unavailable.</p>
			<Button><Link to={'/notes'}>GO TO HOME</Link></Button>
		</div>
	);
};

export default PageNotFound;