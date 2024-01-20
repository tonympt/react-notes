import ColorPalette from './ColorPalette';
import InputCheckMode from './InputCheckMode';
import LabelsOption from './LabelsOption';

const OptionsMenu = () => {
	return(
		<div className="flex items-center">
			<ColorPalette />
			<InputCheckMode/>
			<LabelsOption />
		</div>
	);
};

export default OptionsMenu;