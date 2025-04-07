import React from 'react';

const TaskCompletionByDepartmentWidget = ({ data }) => {
	return (
		<div className="h-full flex flex-col w-457 h-257">
			<div className="section-header mb-2">
				<div className="bg-blue-100 w-6 h-6 rounded flex items-center justify-center text-blue-500 mr-2">
					<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
					</svg>
				</div>
				<span>Task Completion by</span>
				<select className="ml-2 px-2 py-1 text-xs bg-white border border-gray-200 rounded-md text-gray-600 font-medium">
					<option>Department</option>
					<option>Team</option>
					<option>User</option>
				</select>
			</div>

			<div className="flex-grow overflow-auto">
				<table className="w-full">
					<thead className="text-xs text-gray-500 border-b border-gray-200">
						<tr>
							<th className="text-left py-2 px-3 font-medium">Department</th>
							<th className="text-right py-2 px-3 w-16">
								<div className="flex items-center justify-end">
									<div className="w-3 h-3 bg-green-300 rounded-sm mr-1"></div>
									<span>Done</span>
								</div>
							</th>
							<th className="text-right py-2 px-3 w-16">
								<div className="flex items-center justify-end">
									<div className="w-3 h-3 bg-gray-300 rounded-sm mr-1"></div>
									<span>Total</span>
								</div>
							</th>
							<th className="text-right py-2 px-3 w-16">
								<div className="flex items-center justify-end">
									<div className="w-3 h-3 bg-yellow-300 rounded-sm mr-1"></div>
									<span>Due</span>
								</div>
							</th>
						</tr>
					</thead>
					<tbody className="text-sm">
						{data.departments.map((dept, index) => (
							<tr key={index} className="border-b border-gray-100">
								<td className="py-2 px-3 font-medium">{dept.name}</td>
								<td className="text-right py-2 px-3">
									<span className="px-2 py-1 bg-green-100 text-green-800 rounded-sm text-xs">
										{dept.done}
									</span>
								</td>
								<td className="text-right py-2 px-3">
									<span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-sm text-xs">
										{dept.total}
									</span>
								</td>
								<td className="text-right py-2 px-3">
									<span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-sm text-xs">
										{dept.due}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default TaskCompletionByDepartmentWidget; 