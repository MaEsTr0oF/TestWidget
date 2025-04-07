import React from 'react';

const TaskDeadlinesWidget = ({ data }) => {
	return (
		<div className="h-full flex flex-col">
			<div className="section-header mb-3">
				<div className="mr-2">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
					</svg>
				</div>
				<span className="text-lg font-medium">Task Deadlines</span>
			</div>

			<div className="flex-grow overflow-auto">
				<div className="space-y-1">
					<div className="flex items-center text-lg font-medium text-gray-700 mb-2">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
						</svg>
						Upcoming Tasks Deadlines
					</div>

					<div className="filter-row mb-3 flex items-center">
						<div className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 flex items-center mr-2">
							This Week
							<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
							</svg>
						</div>

						<button className="ml-auto px-3 py-1.5 bg-blue-500 text-white rounded-md text-sm font-medium flex items-center">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
							</svg>
							New Task
						</button>
					</div>

					<div className="progress-section mb-4 bg-indigo-100 p-4 rounded-lg">
						<div className="flex items-center mb-2">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
							</svg>
							<div className="text-indigo-700 font-medium">Progress</div>
							<div className="ml-auto text-indigo-700 font-medium">50% Completed</div>
						</div>
						<div className="w-full bg-indigo-200 rounded-full h-2">
							<div className="bg-indigo-500 h-2 rounded-full" style={{ width: '50%' }}></div>
						</div>
					</div>

					{data.tasks.map((task, index) => (
						<div key={index} className="task-item flex items-center p-2 hover:bg-gray-50 border-b border-gray-100">
							<input
								type="checkbox"
								checked={task.completed}
								className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3"
								readOnly
							/>
							<div className="flex-grow">
								<div className="text-sm font-medium text-gray-700">{task.title}</div>
								<div className="flex items-center mt-1">
									<div className={`h-2 w-2 rounded-full mr-1 ${task.completed ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
									<div className="text-xs text-gray-500">{task.dueDate}</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default TaskDeadlinesWidget; 