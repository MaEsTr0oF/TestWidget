import React from 'react';
import Button from './Button';
import Icon from './Icon';

/**
 * Компонент заголовка дашборда
 * @param {boolean} isEditing - Находится ли дашборд в режиме редактирования
 * @param {function} onStartEditing - Обработчик начала редактирования
 * @param {function} onCancelEditing - Обработчик отмены редактирования
 * @param {function} onSaveChanges - Обработчик сохранения изменений
 * @param {function} onCheckStorage - Обработчик проверки хранилища
 * @param {function} onResetDashboard - Обработчик сброса дашборда
 */
const DashboardHeader = ({
	isEditing,
	onStartEditing,
	onCancelEditing,
	onSaveChanges,
	onCheckStorage,
	onResetDashboard
}) => {
	return (
		<div className="bg-white border-b border-gray-200 shadow-sm">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16 items-center">
					<h1 className="text-2xl font-bold text-gray-900">LIQN Dashboard</h1>

					<div className="flex items-center space-x-4">
						<span className="text-sm font-mono text-gray-400">LIQN</span>

						{!isEditing ? (
							<>
								<Button
									variant="outline"
									size="sm"
									onClick={onCheckStorage}
									title="Check localStorage"
								>
									Check Storage
								</Button>

								<Button
									variant="outline"
									size="sm"
									onClick={onResetDashboard}
									title="Reset Dashboard"
								>
									Reset Dashboard
								</Button>

								<Button
									variant="primary"
									onClick={onStartEditing}
									leftIcon={<Icon name="edit" size="sm" />}
								>
									Edit Dashboard
								</Button>
							</>
						) : (
							<div className="flex space-x-2">
								<Button
									variant="outline"
									onClick={onCancelEditing}
								>
									Cancel
								</Button>

								<Button
									variant="primary"
									onClick={onSaveChanges}
									leftIcon={<Icon name="save" size="sm" />}
								>
									Save Changes
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardHeader; 