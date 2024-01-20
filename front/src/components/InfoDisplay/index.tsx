type InfoDisplayProps = {
    children: React.ReactNode,
    message: string,
}

const InfoDisplay = ({children, message}: InfoDisplayProps) => {
	return(
		<div className="grid justify-items-center mt-[20vh] gap-10">
			{children} {/* SVG icon */}
			<h5 className="text-2xl text-semibold text-neutral-600">
				{message} {/* Text */}
			</h5>
		</div>
	);
};

export default InfoDisplay;