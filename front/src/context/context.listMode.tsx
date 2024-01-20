import { createContext, useContext, useEffect, useState } from 'react';
type ListModeType = boolean;

type ListModeProviderProps = {
  children: React.ReactNode;
  default?: ListModeType;
  storageKey?: string;
};

type ListModeProviderState = {
  listMode: ListModeType;
  setListMode: (listMode: ListModeType) => void;
  toggleListMode: () => void;
};

const initialState: ListModeProviderState = {
	listMode: false,
	setListMode: () => null,
	toggleListMode: () => null,
};

const ListModeContext = createContext<ListModeProviderState>(initialState);

export function ListModeProvider({
	children,
	default: defaultListMode = false,
	storageKey = 'listMode',
}: ListModeProviderProps) {


	const [listMode, setListMode] = useState<ListModeType>(
		() => JSON.parse(localStorage.getItem(storageKey) || String(defaultListMode))
	);

	useEffect(() => {
		localStorage.setItem(storageKey, JSON.stringify(listMode));
	}, [listMode, storageKey]);

	const value = {
		listMode,
		setListMode,
		toggleListMode: () => setListMode(prevListMode => !prevListMode),
	};

	return (
		<ListModeContext.Provider value={value}>
			{children}
		</ListModeContext.Provider>
	);
}

export const useListMode = () => {
	const context = useContext(ListModeContext);

	if (context === undefined) {
		throw new Error('useListMode must be used within a ListModeProvider');
	}

	return context;
};