// Доступные виджеты для добавления
export const AVAILABLE_WIDGETS = [
	{
		id: 'open-tasks',
		title: 'Open Tasks',
		type: 'task-counter',
		data: {
			count: 5
		}
	},
	{
		id: 'task-projects',
		title: 'Task Projects',
		type: 'project-list',
		data: {
			projects: [
				{
					id: 1,
					title: 'Conversion from Sheraton',
					completionDate: '15 Dec 2023',
					warrantyExpiryDate: '15 Dec 2024',
					director: {
						name: 'David Orlov',
						initials: 'DO',
						color: '#f97316'
					}
				},
				{
					id: 2,
					title: 'Marriott Green Initiative',
					completionDate: '30 Jan 2024',
					warrantyExpiryDate: '30 Jan 2025',
					director: {
						name: 'Nikita Petrov',
						initials: 'NP',
						color: '#eab308'
					}
				}
			]
		}
	},
	{
		id: 'tasks-by-health',
		title: 'Open Tasks by Health',
		type: 'tasks-by-health',
		data: {
			tasksByHealth: [
				{ status: 'HEALTHY', count: 3, color: '#1e40af' },
				{ status: 'OVERDUE', count: 1, color: '#8b5cf6' },
				{ status: 'WARNING', count: 1, color: '#3730a3' }
			]
		}
	},
	{
		id: 'task-completion-by-department',
		title: 'Task Completion by Department',
		type: 'task-completion-by-department',
		data: {
			departments: [
				{ name: 'Above Property', done: 1, total: 2, due: 1 },
				{ name: 'Accounting', done: 1, total: 2, due: 0 },
				{ name: 'Culinary', done: 0, total: 1, due: 0 }
			]
		}
	},
	{
		id: 'tasks-awaiting-approval',
		title: 'My Tasks Awaiting Completion Approval',
		type: 'tasks-awaiting-approval',
		data: {
			tasks: [
				{
					id: 1,
					title: 'Request facility criteria',
					project: 'Conversion from Sheraton',
					assignees: [
						{ initials: 'OD', color: '#f97316' },
						{ initials: 'DC', color: '#3b82f6' },
						{ initials: 'NP', color: '#eab308' }
					]
				},
				{
					id: 2,
					title: 'Marriott VPN / SDWAN',
					project: 'Marriott Green Initiative',
					assignees: [
						{ initials: 'OD', color: '#f97316' }
					]
				}
			]
		}
	},
	{
		id: 'task-deadlines',
		title: 'Task Deadlines',
		type: 'task-deadlines',
		data: {
			tasks: [
				{
					id: 1,
					title: 'Request facility criteria (FC) from Developer',
					dueDate: 'April 6, 2025',
					completed: true
				},
				{
					id: 2,
					title: 'Share IT due-diligent check list with Developer',
					dueDate: 'April 8, 2025',
					completed: false
				}
			]
		}
	},
	{
		id: 'task-dashboard',
		title: 'Task Dashboard',
		type: 'task-dashboard',
		data: {
			tasks: [
				{
					id: 1,
					title: 'Request facility criteria',
					project: 'Conversion from Sheraton',
					startDate: '2025-04-06',
					endDate: '2025-04-06',
					assignees: [
						{ initials: 'OD', color: '#f97316' },
						{ initials: 'DC', color: '#3b82f6' },
						{ initials: 'NP', color: '#eab308' }
					]
				},
				{
					id: 2,
					title: 'POS Delivered',
					project: 'Marriott Green Initiative',
					startDate: '2025-04-01',
					endDate: '2025-04-05',
					assignees: [
						{ initials: 'NP', color: '#eab308' },
						{ initials: 'KR', color: '#84cc16' }
					]
				},
				{
					id: 3,
					title: 'Marriott VPN / SDWAN',
					project: 'Marriott Green Initiative',
					startDate: '2025-04-03',
					endDate: '2025-04-14',
					assignees: [
						{ initials: 'OD', color: '#f97316' }
					]
				}
			]
		}
	}
];

// Дефолтное расположение виджетов
export const DEFAULT_LAYOUT = {
	lg: []
};

// Настройки сетки для различных размеров экрана
export const GRID_BREAKPOINTS = {
	lg: 1200,
	md: 996,
	sm: 768,
	xs: 480,
	xxs: 0
};

export const GRID_COLUMNS = {
	lg: 12,
	md: 10,
	sm: 6,
	xs: 4,
	xxs: 2
};

// Ключи для localStorage
export const STORAGE_KEYS = {
	LAYOUTS: 'dashboardLayouts',
	WIDGETS: 'dashboardWidgets'
}; 