import React from 'react';

const InitialsAvatar = ({ initials, backgroundColor }) => {
	return (
		<div
			className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm"
			style={{ backgroundColor }}
		>
			{initials}
		</div>
	);
};

export default InitialsAvatar; 