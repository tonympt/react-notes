import { Badge } from '@/components/ui/shadcn-ui/badge';
import { LabelsType } from '@/type/labelsType';

const NoteLabels = ({labels}: {labels: LabelsType[]}) => {
 
	return(
		<div className='flex flex-wrap gap-1'>
			{labels && labels.length > 0 
				? labels.slice(0, 3).map((label) => 
					<Badge className='text-neutral-800' variant="secondary" key={`${label.labelName}${label._id}`}>
						{label.labelName}
					</Badge>
				)
				: null
			}
			{labels && labels.length > 3 
				? <Badge className='text-neutral-800' variant="secondary"> 
					{`+ ${labels.length - 3}`}
				</Badge>
				: null
			}
		</div>
	);
};

export default NoteLabels;