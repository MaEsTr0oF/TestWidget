import React, { useState, useEffect, useRef } from 'react';
import Widget from '../Widget';
import Icon from './Icon';

/**
 * Компонент-обертка для виджетов в сетке
 * @param {object} widget - Данные виджета
 * @param {boolean} isEditing - Находится ли дашборд в режиме редактирования
 * @param {function} onRemoveWidget - Функция для удаления виджета
 */
const GridWidget = ({ widget, isEditing, onRemoveWidget }) => {
	console.log('Rendering widget:', widget); // Логируем пропсы виджета

	const [isHovered, setIsHovered] = useState(false);
	const contentRef = useRef(null);
	const [dimensions, setDimensions] = useState({
		minHeight: null,
		minWidth: null
	});

	// Устанавливаем минимальные размеры для разных типов виджетов
	useEffect(() => {
		// Установка значений по умолчанию в зависимости от типа виджета
		let minHeight = null;
		let minWidth = null;

		switch (widget.type) {
			case 'tasks-by-health':
				minHeight = 300; // px
				minWidth = 250; // px
				break;
			case 'task-counter':
				minHeight = 150; // px
				break;
			case 'project-list':
				minHeight = 240; // px
				break;
			case 'task-completion-by-department':
				minHeight = 280; // px
				break;
			default:
				// Для других типов оставляем авто-размер
				break;
		}

		setDimensions({ minHeight, minWidth });

		// Дополнительная проверка при изменении размеров
		if (contentRef.current && widget.type === 'tasks-by-health') {
			// Даем время компоненту отрендериться
			setTimeout(() => {
				const height = contentRef.current.offsetHeight;
				if (height > 50 && (!minHeight || height > minHeight)) {
					setDimensions(prev => ({ ...prev, minHeight: height }));
				}
			}, 300);
		}
	}, [widget.type]);

	const handleMouseEnter = () => {
		if (isEditing) {
			setIsHovered(true);
		}
	};

	const handleMouseLeave = () => {
		if (isEditing) {
			setIsHovered(false);
		}
	};

	// Определяем, требуется ли для этого типа виджета специальный класс
	const getWidgetTypeClass = () => {
		switch (widget.type) {
			case 'tasks-by-health':
				return 'flex-auto'; // Более гибкое распределение пространства
			default:
				return '';
		}
	};

	// Определяем стили для контента в зависимости от типа виджета
	const getContentStyle = () => {
		const styles = {};

		if (dimensions.minHeight) {
			styles.minHeight = `${dimensions.minHeight}px`;
		}

		if (dimensions.minWidth) {
			styles.minWidth = `${dimensions.minWidth}px`;
		}

		return styles;
	};

	return (
		<div
			className={`
				relative h-full w-full bg-white rounded-lg shadow-sm border transition-all
				${isEditing ? 'cursor-move' : ''}
				${isHovered && isEditing ? 'border-blue-400 shadow-md' : 'border-gray-200'}
				flex flex-col
			`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{/* Кнопка удаления (отображается только в режиме редактирования при наведении) */}
			{isEditing && isHovered && (
				<button
					className="absolute -top-3 -right-3 bg-red-500 text-white p-1 rounded-full 
						shadow-sm hover:bg-red-600 transition-colors z-10"
					onClick={(e) => {
						e.stopPropagation();
						e.preventDefault();
						onRemoveWidget(widget.id);
					}}
					title="Remove widget"
				>
					<Icon name="remove" size="sm" />
				</button>
			)}

			{/* Заголовок виджета */}
			<div className="px-4 py-3 border-b border-gray-100 bg-gray-50 rounded-t-lg flex justify-between items-center flex-shrink-0">
				<h3 className="font-medium text-gray-800 text-sm">{widget.title}</h3>

				{isEditing && isHovered && (
					<div className="text-xs text-gray-500 bg-white px-2 py-1 rounded-md border border-gray-200">
						Drag to move
					</div>
				)}
			</div>

			{/* Содержимое виджета */}
			<div
				className={`p-4 flex-grow overflow-auto ${getWidgetTypeClass()}`}
				ref={contentRef}
				style={getContentStyle()}
			>
				<Widget type={widget.type} data={widget.data} />
			</div>
		</div>
	);
};

export default GridWidget; 