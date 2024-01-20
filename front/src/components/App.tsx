import NavBar from './NavBar';
import Portal from './Portal';
import { Outlet } from 'react-router-dom';
import { PortalContext } from '../context/context.portal';
import { useContext } from 'react';

const App = () => {
	const { isClose } = useContext(PortalContext);

	return (
		<div>
			<NavBar />
			<div className="flex flex-col md:flex-row">
				<Portal />
				<div className={`flex-1 mt-28 ${!isClose && 'md:ml-[304px]'} transition-margin`}>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default App;
