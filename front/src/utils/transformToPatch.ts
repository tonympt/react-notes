export const transformToPatch = (valuesToFormat: { [key: string]: string | boolean }): { propName: string; value: string }[] => {
	return Object.entries(valuesToFormat).map(([propName, value]) => {
		return { propName, value: String(value) };
	});
};