import React from 'react';

const TaskCounterWidget = ({ data }) => {
	return (
		<div className="h-full flex flex-col w-217 h-348">
			<div className="flex items-center mb-3">
				<div className="bg-blue-100 w-6 h-6 rounded flex items-center justify-center text-blue-500 mr-2">
					<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
						<path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
					</svg>
				</div>
				<span className="font-medium text-gray-700">Open Tasks</span>
			</div>

			<div className="flex items-center justify-between mb-2 px-2">
				<div className="flex space-x-2">
					<button className="px-2 py-1 text-xs bg-white border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50">
						<svg className="h-4 w-4 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
						</svg>
						Settings
					</button>
				</div>
				<div className="flex space-x-1">
					<button className="px-2 py-1 text-xs bg-white border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50">
						Сегодня
					</button>
					<button className="px-2 py-1 text-xs bg-white border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50">
						Неделя
					</button>
				</div>
			</div>

			<div className="flex-grow flex flex-col items-center justify-center">
				<span className="task-counter">{data.count}</span>
				<span className="text-sm text-gray-500">открытых задач</span>
			</div>
		</div>
	);
};

export default TaskCounterWidget; 