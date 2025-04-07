import React from 'react';
import InitialsAvatar from './InitialsAvatar';

const ProjectWidget = ({ data }) => {
	return (
		<div className="h-full flex flex-col">
			<div className="section-header">
				<div className="bg-blue-100 w-6 h-6 rounded flex items-center justify-center text-blue-500 mr-2">
					<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
					</svg>
				</div>
				<span>Projects Related to the Displayed Tasks</span>
				<span className="ml-2 badge badge-blue">{data.projects.length}</span>
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
						&larr;
					</button>
					<button className="px-2 py-1 text-xs bg-white border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50">
						&rarr;
					</button>
				</div>
			</div>

			<div className="flex-grow overflow-auto border rounded-lg border-gray-200">
				{data.projects.map(project => (
					<div key={project.id} className="project-item">
						<div className="flex justify-between items-center mb-3">
							<div className="flex items-center">
								<svg className="h-5 w-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm8 8v2h1v1H4v-1h1v-2H4v-1h16v1h-1zm-2 2H7v-2h6v2z" clipRule="evenodd" />
								</svg>
								<span className="font-medium text-gray-800">{project.title}</span>
							</div>
							<button className="text-gray-400 hover:text-gray-600">
								<svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
								</svg>
							</button>
						</div>

						<div className="space-y-2 text-sm">
							<div className="flex justify-between">
								<span className="text-gray-500">Completion Date</span>
								<span className="text-gray-700">{project.completionDate}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-500">Warranty Expiry Date</span>
								<span className="text-gray-700">{project.warrantyExpiryDate}</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-gray-500">Project Director</span>
								<div className="flex items-center">
									<InitialsAvatar
										initials={project.director.initials}
										backgroundColor={project.director.color}
									/>
									<span className="ml-2 text-gray-700">{project.director.name}</span>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProjectWidget; 