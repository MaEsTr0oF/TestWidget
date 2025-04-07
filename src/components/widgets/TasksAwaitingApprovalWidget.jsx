import React from 'react';
import InitialsAvatar from './InitialsAvatar';

const TasksAwaitingApprovalWidget = ({ data }) => {
	return (
		<div className="h-full flex flex-col">
			<div className="section-header mb-2">
				<div className="bg-blue-100 w-6 h-6 rounded flex items-center justify-center text-blue-500 mr-2">
					<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
					</svg>
				</div>
				<span>My Tasks Awaiting Completion Approval</span>
			</div>

			<div className="flex-grow overflow-auto">
				<table className="w-full">
					<thead className="text-xs text-gray-500 border-b border-gray-200">
						<tr>
							<th className="px-2 py-2 w-8">
								<input
									type="checkbox"
									className="w-4 h-4 text-blue-600 border-gray-300 rounded"
								/>
							</th>
							<th className="text-left py-2 px-2 font-medium">Actions</th>
							<th className="text-left py-2 px-2 font-medium">Task Title</th>
							<th className="text-left py-2 px-2 font-medium">Project</th>
							<th className="text-left py-2 px-2 font-medium">Assignee</th>
							<th className="text-left py-2 px-2 font-medium">Approve</th>
						</tr>
					</thead>
					<tbody className="text-sm">
						{data.tasks.map((task, index) => (
							<tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
								<td className="px-2 py-2">
									<input
										type="checkbox"
										className="w-4 h-4 text-blue-600 border-gray-300 rounded"
									/>
								</td>
								<td className="py-2 px-2">
									<button className="text-blue-500 hover:text-blue-700">
										<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
											<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
											<path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
										</svg>
									</button>
								</td>
								<td className="py-2 px-2 font-medium">{task.title}</td>
								<td className="py-2 px-2">{task.project}</td>
								<td className="py-2 px-2">
									<div className="flex space-x-1">
										{task.assignees.map((assignee, idx) => (
											<InitialsAvatar
												key={idx}
												initials={assignee.initials}
												backgroundColor={assignee.color}
											/>
										))}
										{task.assignees.length > 3 && (
											<div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-medium">
												+{task.assignees.length - 3}
											</div>
										)}
									</div>
								</td>
								<td className="py-2 px-2">
									<button className="px-3 py-1 bg-green-500 text-white rounded-md text-xs hover:bg-green-600 transition-colors">
										Approve
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default TasksAwaitingApprovalWidget; 