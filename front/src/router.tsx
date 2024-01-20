import { createBrowserRouter } from 'react-router-dom';
import SignUp from './components/auth/SignUp';
import AppLayout from './components/ui/AppLayout';
import SignIn from './components/auth/SignIn';
import App from './components/App';
import PrivateRoutes from './components/PrivatesRoutes';
import LabelContainer from './components/LabelContainer';
import MainNotesContainer from './components/MainNotesContainer';
import ArchiveContainer from './components/ArchiveContainer';
import SearchContainer from './components/SearchContainer';
import FilteredNotes from './components/SearchContainer/FilteredNotes';
import PageNotFound from './components/PageNotFound';
const router = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		errorElement: <PageNotFound/>,
		children: [
			{
				path: '/sign-up',
				element: <SignUp />,
			},
			{
				path: '/sign-in',
				element: <SignIn />,
			},
			{
				path: '/',
				element: <PrivateRoutes />,
				children: [
					{
						path: '',
						element: <App />,
						children: [
							{
								path: 'notes',
								element: <MainNotesContainer />,
							},
							{
								path: ':labelToUrl',
								element: <LabelContainer />,
							},
							{
								path: 'archive',
								element: <ArchiveContainer />,
							},
							{
								path: 'search',
								element: <SearchContainer />,
							},
							{
								path: 'search/:textParams',
								element: <FilteredNotes />,
							},
						]
					},
					
				]
			}

		]
	},
]);

export default router;