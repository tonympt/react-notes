import  {Outlet} from 'react-router-dom';
import { Toaster } from '../shadcn-ui/toast/toaster';

const App = () => {
	return(
		<>
			<Outlet />
			<Toaster />
		</>
	);
};

export default App;