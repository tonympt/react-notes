import NoteColorPalette from './NoteColorPalette';
import NoteCheckMode from './NoteCheckMode';
import NoteCopy from './NoteCopy';
import NoteLabels from './NoteLabels';
import NoteRemove from './NoteRemove';	
import { NoteType } from '@/zod-schema/notes';
import NoteArchive from './NoteArchive';
import { LabelsType } from '@/type/labelsType';

type NoteOptionsMenuProps = {
	color: NoteType['color'],
	isCheckBoxMode: NoteType['isCheckBoxMode'],
	id: NoteType['_id']
	isArchived: NoteType['isArchived']
	labels: LabelsType[];
};

const NoteOptionsMenu = ({color, isCheckBoxMode, id, isArchived, labels}: NoteOptionsMenuProps) => {	
	const arrayOfLabelsChecked = labels.map(label=> label._id) || [];
	return(
		<>
			<NoteCheckMode isCheckBoxMode={isCheckBoxMode} />
			<NoteColorPalette color={color} noteId={id}/>
			<NoteLabels labels={arrayOfLabelsChecked} noteId={id}/>
			<NoteCopy noteId={id}/>
			<NoteArchive noteId={id} isArchived={isArchived}/>
			<NoteRemove noteId={id}/>
		</>
	);
};

export default NoteOptionsMenu;