import React from 'react';
import Button from './Button';
import Icon from './Icon';

/**
 * Компонент для управления виджетами дашборда
 * @param {boolean} show - Отображать ли панель
 * @param {Array} availableWidgets - Список доступных виджетов
 * @param {Array} currentWidgets - Список текущих виджетов
 * @param {function} onAddWidget - Обработчик добавления виджета
 * @param {function} onRemoveWidget - Обработчик удаления виджета
 */
const WidgetManager = ({
	show,
	availableWidgets,
	currentWidgets,
	onAddWidget,
	onRemoveWidget
}) => {
	if (!show) return null;

	// Находим ID текущих виджетов для проверки, добавлен ли виджет
	const currentWidgetIds = currentWidgets.map(widget => widget.id);

	return (
		<div className="bg-white shadow rounded-lg p-4 mb-6 border border-gray-200">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-lg font-medium text-gray-900">Manage Widgets</h2>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{availableWidgets.map(widget => {
					const isActive = currentWidgetIds.includes(widget.id);

					return (
						<div
							key={widget.id}
							className={`
                p-4 rounded-lg border transition-all
                ${isActive
									? 'border-blue-500 bg-blue-50'
									: 'border-gray-200 hover:border-gray-300 bg-white'
								}
              `}
						>
							<div className="flex justify-between items-start">
								<div>
									<h3 className="font-medium text-gray-900">{widget.title}</h3>
									<p className="text-sm text-gray-500 mt-1">{widget.description}</p>
								</div>
								{isActive ? (
									<Button
										variant="danger"
										size="sm"
										onClick={() => onRemoveWidget(widget.id)}
										title="Remove widget"
										leftIcon={<Icon name="remove" size="sm" />}
									>
										Remove
									</Button>
								) : (
									<Button
										variant="primary"
										size="sm"
										onClick={() => onAddWidget(widget.id)}
										title="Add widget"
										leftIcon={<Icon name="add" size="sm" />}
									>
										Add
									</Button>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default WidgetManager; 