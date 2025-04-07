import React, { useState } from 'react';
import TaskCounterWidget from './widgets/TaskCounterWidget';
import ProjectWidget from './widgets/ProjectWidget';
import GenericWidget from './widgets/GenericWidget';
import TasksByHealthWidget from './widgets/TasksByHealthWidget';
import TaskCompletionByDepartmentWidget from './widgets/TaskCompletionByDepartmentWidget';
import TasksAwaitingApprovalWidget from './widgets/TasksAwaitingApprovalWidget';
import TaskDeadlinesWidget from './widgets/TaskDeadlinesWidget';
import TaskDashboardWidget from './widgets/TaskDashboardWidget';

const Widget = ({ title, type, isEditing, onRemove, data }) => {
	const [isHovered, setIsHovered] = useState(false);

	// Рендерим содержимое виджета в зависимости от типа
	const renderContent = () => {
		switch (type) {
			case 'task-counter':
				return <TaskCounterWidget data={data} />;
			case 'project-list':
				return <ProjectWidget data={data} />;
			case 'tasks-by-health':
				return <TasksByHealthWidget data={data} />;
			case 'task-completion-by-department':
				return <TaskCompletionByDepartmentWidget data={data} />;
			case 'tasks-awaiting-approval':
				return <TasksAwaitingApprovalWidget data={data} />;
			case 'task-deadlines':
				return <TaskDeadlinesWidget data={data} />;
			case 'task-dashboard':
				return <TaskDashboardWidget data={data} />;
			default:
				return <GenericWidget type={type} />;
		}
	};

	return (
		<div
			className="h-full flex flex-col"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{isEditing && (
				<div className="flex justify-between items-center mb-2 relative">
					<h3 className="font-medium text-gray-800 text-sm">{title}</h3>
					<button
						onClick={onRemove}
						className="text-gray-400 hover:text-red-500"
						aria-label="Remove widget"
					>
						<svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
						</svg>
					</button>
				</div>
			)}

			{/* Кнопка 'x', которая появляется при наведении */}
			{!isEditing && isHovered && (
				<button
					onClick={onRemove}
					className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-0.5 shadow-sm text-gray-400 hover:text-red-500"
					aria-label="Remove widget"
				>
					<svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
						<path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
					</svg>
				</button>
			)}

			<div className="flex-grow">
				{renderContent()}
			</div>
		</div>
	);
};

export default Widget; 