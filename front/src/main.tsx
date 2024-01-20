import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import router from './router';
import { QueryClient, QueryClientProvider} from 'react-query';
import { PortalContextProvider } from './context/context.portal';
import { ListModeProvider } from './context/context.listMode';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') disableReactDevTools();

const queryClient = new QueryClient({
	defaultOptions:{
		queries: {
			refetchOnWindowFocus: false,
		}
	}
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<PortalContextProvider>
				<ListModeProvider>
					<RouterProvider router={router} />
				</ListModeProvider>
			</PortalContextProvider>
		</QueryClientProvider>
	</React.StrictMode>,
);
