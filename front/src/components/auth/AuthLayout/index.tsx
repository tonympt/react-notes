import {ReactNode} from 'react';

const AuthLayout = ({children}: {children: ReactNode}) => {
	return(
		<div className="flex justify-center items-center min-h-screen">
			<div className="p-8 rounded-md border shadow-lg bg-slate-50 w-full max-w-md">
				{children}
			</div>
		</div>
	);
};

export default AuthLayout;
