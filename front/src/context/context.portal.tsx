import { createContext, ReactNode, useEffect, useState, useRef } from 'react';

type PortalContextType = {
    isClose: boolean | null;
    toggleIsClose: () => void;
};

const defaultContextValue: PortalContextType = {
	isClose: null,
	toggleIsClose: () => {},
};
  
export const PortalContext = createContext<PortalContextType>(defaultContextValue);

const PortalContextProvider = ({ children }: { children: ReactNode }) => {
	const [isClose, setIsClose] = useState<boolean>(window.innerWidth < 640);
	const prevWidth = useRef(window.innerWidth);

	useEffect(() => {
		const checkSize = () => {
			const currentWidth = window.innerWidth;
			if (currentWidth <= 640 && prevWidth.current > 640) {
				setIsClose(true);
			} else if (currentWidth > 640 && prevWidth.current <= 640) {
				setIsClose(false);
			}
			prevWidth.current = currentWidth;
		};

		window.addEventListener('resize', checkSize);
        
		return () => {
			window.removeEventListener('resize', checkSize);
		};
	}, []);

	return (
		<PortalContext.Provider value={{ isClose, toggleIsClose: () => setIsClose(!isClose) }}>
			{children}
		</PortalContext.Provider>
	);
};

export { PortalContextProvider };