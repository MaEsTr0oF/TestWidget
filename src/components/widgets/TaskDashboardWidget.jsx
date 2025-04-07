import React, { useState } from 'react';
import InitialsAvatar from './InitialsAvatar';

const TaskDashboardWidget = ({ data }) => {
	const [activeTab, setActiveTab] = useState('list');
	const [activeSection, setActiveSection] = useState('preliminary');

	return (
		<div className="h-full flex flex-col">
			<div className="section-header mb-3">
				<div className="mr-2">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
					</svg>
				</div>
				<span className="text-lg font-medium">Task Dashboard</span>
			</div>

			<div className="flex-grow flex flex-col overflow-hidden">
				<div className="dashboard-header flex justify-between items-center mb-4">
					<div className="flex items-center">
						<div className="text-lg font-medium text-gray-800 mr-2">Dashboard</div>
						<div className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium">5</div>
					</div>

					<div className="flex space-x-2">
						<div className="relative">
							<input
								type="text"
								placeholder="Search"
								className="pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
							/>
							<svg className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
						</div>

						<button className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
							</svg>
							Export xlsx
						</button>

						<button className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded">
							Multi-assign Tasks
						</button>

						<button className="flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
							<svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
							</svg>
							Add New Task
						</button>
					</div>
				</div>

				<div className="tab-navigation mb-2 flex border-b border-gray-200">
					<button
						className={`px-4 py-2 text-sm font-medium ${activeTab === 'list' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
						onClick={() => setActiveTab('list')}
					>
						List View
					</button>
					<button
						className={`px-4 py-2 text-sm font-medium ${activeTab === 'gantt' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
						onClick={() => setActiveTab('gantt')}
					>
						Gantt View
					</button>
					<button
						className={`px-4 py-2 text-sm font-medium ${activeTab === 'kanban' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
						onClick={() => setActiveTab('kanban')}
					>
						Kanban View
					</button>

					<div className="ml-auto flex items-center">
						<div className="relative">
							<input
								type="text"
								placeholder="Start date"
								className="w-28 pl-3 pr-8 py-1 text-sm border border-gray-300 rounded-l focus:outline-none"
							/>
							<svg className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>
						</div>
						<div className="px-2 py-1 bg-gray-100 text-gray-500 text-sm">→</div>
						<div className="relative">
							<input
								type="text"
								placeholder="End date"
								className="w-28 pl-3 pr-8 py-1 text-sm border border-gray-300 rounded-r focus:outline-none"
							/>
							<svg className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>
						</div>
					</div>
				</div>

				<div className="filters mb-4 flex">
					<button className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded mr-2">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
						</svg>
						Add Filter
					</button>
				</div>

				<div className="task-sections flex-grow overflow-auto">
					<div className="section mb-4">
						<div
							className="section-title flex items-center cursor-pointer p-2 hover:bg-gray-50 rounded"
							onClick={() => setActiveSection(activeSection === 'preliminary' ? '' : 'preliminary')}
						>
							<div className="text-base font-medium text-gray-800 mr-2">Preliminary</div>
							<div className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium">3</div>
							<svg
								className={`h-5 w-5 ml-2 text-gray-400 transform transition-transform ${activeSection === 'preliminary' ? 'rotate-180' : ''}`}
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
							</svg>
						</div>

						{activeSection === 'preliminary' && (
							<div className="section-content">
								<table className="min-w-full">
									<thead className="bg-gray-50">
										<tr>
											<th className="px-3 py-2 text-left">
												<input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
											</th>
											<th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
											<th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
											<th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
											<th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
											<th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
											<th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{data.tasks.map((task, index) => (
											<tr key={index} className="hover:bg-gray-50">
												<td className="px-3 py-2 whitespace-nowrap">
													<input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
												</td>
												<td className="px-3 py-2 whitespace-nowrap">
													<div className="flex space-x-2">
														<button className="text-blue-500 hover:text-blue-700">
															<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
																<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
																<path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
															</svg>
														</button>
														<button className="text-blue-500 hover:text-blue-700">
															<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
																<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
															</svg>
														</button>
														<button className="text-blue-500 hover:text-blue-700">
															<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
																<path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clipRule="evenodd" />
															</svg>
														</button>
													</div>
												</td>
												<td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{task.title}</td>
												<td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{task.project}</td>
												<td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{task.startDate}</td>
												<td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{task.endDate}</td>
												<td className="px-3 py-2 whitespace-nowrap">
													<div className="flex space-x-1">
														{task.assignees.map((assignee, idx) => (
															<InitialsAvatar
																key={idx}
																initials={assignee.initials}
																backgroundColor={assignee.color}
															/>
														))}
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</div>

					<div className="section mb-4">
						<div
							className="section-title flex items-center cursor-pointer p-2 hover:bg-gray-50 rounded"
							onClick={() => setActiveSection(activeSection === 'open' ? '' : 'open')}
						>
							<div className="text-base font-medium text-gray-800 mr-2">Open</div>
							<div className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium">2</div>
							<svg
								className={`h-5 w-5 ml-2 text-gray-400 transform transition-transform ${activeSection === 'open' ? 'rotate-180' : ''}`}
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
							</svg>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TaskDashboardWidget; 