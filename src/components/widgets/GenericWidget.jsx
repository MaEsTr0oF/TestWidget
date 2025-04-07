import React from 'react';

const GenericWidget = ({ type }) => {
	return (
		<div className="flex flex-col h-full">
			<div className="flex items-center justify-center h-16 mb-2">
				<div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
					<svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
						<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v2a1 1 0 102 0V5zm-1 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
					</svg>
				</div>
			</div>
			<div className="text-center text-gray-400 text-sm">
				Виджет "{type}" не реализован
			</div>
		</div>
	);
};

export default GenericWidget; 