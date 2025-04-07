import React from 'react';
import Button from './Button';
import Icon from './Icon';

/**
 * Компонент для отображения пустого состояния дашборда
 * @param {string} title - Заголовок пустого состояния
 * @param {string} description - Описание пустого состояния
 * @param {function} onAction - Обработчик действия
 * @param {string} actionLabel - Текст кнопки действия
 */
const EmptyState = ({
	title = 'No widgets added yet',
	description = 'Click "Edit Dashboard" to add a new widget',
	onAction,
	actionLabel = 'Edit Dashboard'
}) => {
	return (
		<div className="flex flex-col items-center justify-center h-[70vh] text-center p-4">
			<div className="mb-6 bg-blue-50 p-8 rounded-lg border-2 border-dashed border-blue-200">
				<div className="w-16 h-16 mx-auto flex items-center justify-center text-blue-500 mb-2">
					<Icon name="dashboard" size="xl" />
				</div>
			</div>

			<h2 className="text-xl font-semibold text-gray-800 mb-2">
				{title}
			</h2>

			<p className="text-gray-500 mb-6 max-w-md">
				{description}
			</p>

			<Button
				variant="primary"
				onClick={onAction}
				leftIcon={<Icon name="edit" size="sm" />}
			>
				{actionLabel}
			</Button>
		</div>
	);
};

export default EmptyState; 