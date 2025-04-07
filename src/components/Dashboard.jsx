import React, { useState, useEffect, useMemo } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import Widget from './Widget';
import DashboardHeader from './ui/DashboardHeader';
import WidgetManager from './ui/WidgetManager';
import EmptyState from './ui/EmptyState';
import GridWidget from './ui/GridWidget';
import { AVAILABLE_WIDGETS, DEFAULT_LAYOUT, STORAGE_KEYS, GRID_COLUMNS, GRID_BREAKPOINTS } from '../config/dashboardConfig';
import {
	saveToStorage,
	loadFromStorage,
	saveDashboardSettings,
	loadDashboardSettings,
	resetDashboardSettings
} from '../utils/storageUtils';

const ResponsiveGridLayout = WidthProvider(Responsive);

// --- Конфигурация размеров и минимальных размеров --- 
// (Вынесено для наглядности, можно оставить в dashboardConfig.js)
const initialWidgetSizesConfig = {
	lg: { w: 5, h: 5 },
	md: { w: 4, h: 4 },
	sm: { w: 3, h: 3 },
	xs: { w: Math.min(GRID_COLUMNS.xs, 3), h: 3 },
	xxs: { w: Math.min(GRID_COLUMNS.xxs, 2), h: 2 },
};
const widgetMinDimensionsConfig = {
	'open-tasks': { minW: 2, minH: 2 },
	'task-projects': { minW: 3, minH: 3 },
	'tasks-by-health': { minW: 3, minH: 3 },
	'task-completion-by-department': { minW: 4, minH: 3 },
	'tasks-awaiting-approval': { minW: 4, minH: 3 },
	'task-deadlines': { minW: 4, minH: 4 },
	'task-dashboard': { minW: 5, minH: 4 },
	default: { minW: 1, minH: 1 },
};
// ----------------------------------------------------

const Dashboard = () => {
	// Состояние для режима редактирования
	const [isEditing, setIsEditing] = useState(false);

	// Состояние для текущего набора виджетов
	const [currentWidgets, setCurrentWidgets] = useState([]);

	// Функция для получения лэйаута из localStorage или использования значения по умолчанию
	const loadLayout = () => {
		return loadFromStorage(STORAGE_KEYS.LAYOUTS, DEFAULT_LAYOUT);
	};

	// Состояние layouts
	const [layouts, setLayouts] = useState(loadLayout());

	// Показать панель управления виджетами
	const [showWidgetPanel, setShowWidgetPanel] = useState(false);

	// Эффект для логирования изменений в layouts
	useEffect(() => {
		console.log('Current layouts in state:', layouts);
	}, [layouts]);

	// Загружаем сохраненное расположение при монтировании
	useEffect(() => {
		const { layouts: savedLayouts, widgets: savedWidgets } = loadDashboardSettings(DEFAULT_LAYOUT, []);

		console.log('Loading saved layouts:', savedLayouts);
		console.log('Loading saved widgets:', savedWidgets);

		if (savedLayouts) {
			const validatedLayouts = { ...savedLayouts };
			const breakpoints = Object.keys(GRID_BREAKPOINTS); // Используем ключи из конфига

			breakpoints.forEach(bp => {
				if (validatedLayouts[bp] && Array.isArray(validatedLayouts[bp])) {
					validatedLayouts[bp] = validatedLayouts[bp].map(item => {
						const widget = savedWidgets?.find(w => w.id === item.i);
						const type = widget ? widget.type : 'default';
						const { minW, minH } = widgetMinDimensionsConfig[type] || widgetMinDimensionsConfig.default;
						const cols = GRID_COLUMNS[bp] || 12;

						let validItem = { ...item };

						if (!validItem.w || validItem.w < minW) validItem.w = minW;
						if (validItem.w > cols) validItem.w = cols;
						if (!validItem.h || validItem.h < minH) validItem.h = minH;

						if (validItem.x + validItem.w > cols) validItem.x = Math.max(0, cols - validItem.w);
						if (validItem.x < 0) validItem.x = 0;
						if (!validItem.y || validItem.y < 0) validItem.y = 0;

						validItem.minW = minW;
						validItem.minH = minH;

						return validItem;
					});
				} else {
					validatedLayouts[bp] = [];
				}
			});

			console.log('Validated layouts for loading:', validatedLayouts);
			setLayouts(validatedLayouts);
		} else {
			setLayouts(DEFAULT_LAYOUT);
		}

		if (savedWidgets && savedWidgets.length > 0) {
			setCurrentWidgets(savedWidgets);
		} else {
			initializeDefaultWidgets();
		}
	}, []);

	// Обработчик изменения расположения виджетов - КЛЮЧЕВАЯ ЛОГИКА КОРРЕКЦИИ
	const handleLayoutChange = (currentLayout, allLayouts) => {
		console.log('Layout changed (handleLayoutChange): currentLayout:', currentLayout);
		console.log('Layout changed (handleLayoutChange): Received allLayouts from RGL:', JSON.parse(JSON.stringify(allLayouts)));

		const correctedLayouts = {};
		const breakpoints = Object.keys(GRID_BREAKPOINTS);

		breakpoints.forEach(bp => {
			if (allLayouts[bp] && Array.isArray(allLayouts[bp])) {
				correctedLayouts[bp] = allLayouts[bp].map(item => {
					const widget = currentWidgets.find(w => w.id === item.i);
					const type = widget ? widget.type : null;

					if (!type) {
						console.warn(`Widget type not found for id: ${item.i} in layout change. Skipping correction.`);
						return item;
					}

					const { minW, minH } = widgetMinDimensionsConfig[type] || widgetMinDimensionsConfig.default;
					const cols = GRID_COLUMNS[bp] || 12;
					let correctedItem = { ...item };

					// Принудительно ставим minW/minH
					correctedItem.minW = minW;
					correctedItem.minH = minH;

					// Коррекция ширины
					if (correctedItem.w < minW) correctedItem.w = minW;
					if (correctedItem.w > cols) correctedItem.w = cols;

					// Коррекция высоты
					if (correctedItem.h < minH) correctedItem.h = minH;

					// Коррекция позиции X
					if (correctedItem.x + correctedItem.w > cols) correctedItem.x = Math.max(0, cols - correctedItem.w);
					if (correctedItem.x < 0) correctedItem.x = 0;

					// Коррекция позиции Y
					if (correctedItem.y < 0) correctedItem.y = 0;

					return correctedItem;
				});
			} else {
				correctedLayouts[bp] = [];
			}
		});

		console.log('Corrected layouts before setting state:', JSON.parse(JSON.stringify(correctedLayouts)));

		// Сравним старый и новый макеты, чтобы избежать лишних обновлений состояния
		// Это может помочь с производительностью и избежать возможных циклов
		if (JSON.stringify(layouts) !== JSON.stringify(correctedLayouts)) {
			setLayouts(correctedLayouts);
			if (!isEditing) {
				console.log('Saving corrected layouts to localStorage');
				saveToStorage(STORAGE_KEYS.LAYOUTS, correctedLayouts);
			}
		} else {
			console.log('Layouts unchanged after correction, skipping state update.');
		}
	};

	// Функция для инициализации виджетов по умолчанию
	const initializeDefaultWidgets = () => {
		const defaultWidgetIds = DEFAULT_LAYOUT.lg ? DEFAULT_LAYOUT.lg.map(item => item.i) : [];
		if (defaultWidgetIds.length === 0) {
			setCurrentWidgets([]);
			saveToStorage(STORAGE_KEYS.WIDGETS, []);
			return;
		}
		const defaultWidgets = AVAILABLE_WIDGETS.filter(widget =>
			defaultWidgetIds.includes(widget.id)
		);
		setCurrentWidgets(defaultWidgets);
		saveToStorage(STORAGE_KEYS.WIDGETS, defaultWidgets);
	};

	// Вспомогательные функции для определения точки останова и колонок
	const getCurrentBreakpoint = () => {
		// Используем GRID_BREAKPOINTS и window.innerWidth
		const width = window.innerWidth;
		let breakpoint = 'xxs'; // Default to smallest
		const sortedBreakpoints = Object.entries(GRID_BREAKPOINTS)
			.sort(([, valueA], [, valueB]) => valueA - valueB); // Sort ascending by width

		for (const [key, value] of sortedBreakpoints) {
			if (width >= value) {
				breakpoint = key;
			} else {
				break; // Stop at the first breakpoint smaller than width
			}
		}
		return breakpoint;
	};
	const getCurrentCols = (breakpoint) => {
		return GRID_COLUMNS[breakpoint] || 12;
	};

	// Обработчики Drag/Resize с немедленной коррекцией
	const handleDragStop = (layout, oldItem, newItem, placeholder, e, element) => {
		const currentBreakpoint = getCurrentBreakpoint();
		console.log('Drag stopped in breakpoint:', currentBreakpoint);

		const updatedLayouts = { ...layouts };
		if (updatedLayouts[currentBreakpoint]) {
			const index = updatedLayouts[currentBreakpoint].findIndex(item => item.i === newItem.i);
			if (index !== -1) {
				const cols = getCurrentCols(currentBreakpoint);
				let correctedItem = { ...newItem };
				const widget = currentWidgets.find(w => w.id === newItem.i);
				const type = widget ? widget.type : 'default';
				const { minW, minH } = widgetMinDimensionsConfig[type] || widgetMinDimensionsConfig.default;

				correctedItem.minW = minW;
				correctedItem.minH = minH;

				if (correctedItem.w < minW) correctedItem.w = minW;
				if (correctedItem.w > cols) correctedItem.w = cols;
				if (correctedItem.h < minH) correctedItem.h = minH;
				if (correctedItem.x + correctedItem.w > cols) correctedItem.x = Math.max(0, cols - correctedItem.w);
				if (correctedItem.x < 0) correctedItem.x = 0;
				if (correctedItem.y < 0) correctedItem.y = 0;

				updatedLayouts[currentBreakpoint][index] = correctedItem;

				// Сразу обновляем состояние
				setLayouts(updatedLayouts);

				if (!isEditing) {
					saveToStorage(STORAGE_KEYS.LAYOUTS, updatedLayouts);
				}
			}
		}
	};

	const handleResizeStop = (layout, oldItem, newItem, placeholder, e, element) => {
		const currentBreakpoint = getCurrentBreakpoint();
		console.log('Resize stopped in breakpoint:', currentBreakpoint);

		const updatedLayouts = { ...layouts };
		if (updatedLayouts[currentBreakpoint]) {
			const index = updatedLayouts[currentBreakpoint].findIndex(item => item.i === newItem.i);
			if (index !== -1) {
				const cols = getCurrentCols(currentBreakpoint);
				let correctedItem = { ...newItem };
				const widget = currentWidgets.find(w => w.id === newItem.i);
				const type = widget ? widget.type : 'default';
				const { minW, minH } = widgetMinDimensionsConfig[type] || widgetMinDimensionsConfig.default;

				correctedItem.minW = minW;
				correctedItem.minH = minH;

				if (correctedItem.w < minW) correctedItem.w = minW;
				if (correctedItem.w > cols) correctedItem.w = cols;
				if (correctedItem.h < minH) correctedItem.h = minH;
				if (correctedItem.x + correctedItem.w > cols) correctedItem.x = Math.max(0, cols - correctedItem.w);
				if (correctedItem.x < 0) correctedItem.x = 0;
				if (correctedItem.y < 0) correctedItem.y = 0;

				updatedLayouts[currentBreakpoint][index] = correctedItem;

				// Сразу обновляем состояние
				setLayouts(updatedLayouts);

				if (!isEditing) {
					saveToStorage(STORAGE_KEYS.LAYOUTS, updatedLayouts);
				}
			}
		}
	};

	// Добавление виджета (оставляем версию с расчетом Y)
	const addWidget = (widgetId) => {
		const widgetToAdd = AVAILABLE_WIDGETS.find(widget => widget.id === widgetId);
		if (!widgetToAdd || currentWidgets.some(w => w.id === widgetId)) return;

		setCurrentWidgets([...currentWidgets, widgetToAdd]);

		const newLayouts = { ...layouts };
		const breakpoints = Object.keys(GRID_BREAKPOINTS);

		const { minW, minH } = widgetMinDimensionsConfig[widgetToAdd.type] || widgetMinDimensionsConfig.default;

		breakpoints.forEach(bp => {
			if (!newLayouts[bp]) {
				newLayouts[bp] = [];
			}

			const { w, h } = initialWidgetSizesConfig[bp];
			let nextX = 0;
			let nextY = 0;

			if (newLayouts[bp] && newLayouts[bp].length > 0) {
				nextY = Math.max(0, ...newLayouts[bp].map(item => item.y + item.h));
			}

			newLayouts[bp].push({
				i: widgetId,
				x: nextX,
				y: nextY,
				w: w,
				h: h,
				minW: minW, // Используем актуальные minW/minH из конфига
				minH: minH,
			});
		});

		console.log('New layouts after adding widget (calculating y, using config minW/H):', newLayouts);
		setLayouts(newLayouts);
	};

	// Удаление виджета
	const removeWidget = (widgetId) => {
		setCurrentWidgets(currentWidgets.filter(widget => widget.id !== widgetId));

		const newLayouts = { ...layouts };
		const breakpoints = Object.keys(GRID_BREAKPOINTS);
		breakpoints.forEach(bp => {
			if (newLayouts[bp]) {
				newLayouts[bp] = newLayouts[bp].filter(item => item.i !== widgetId);
			}
		});
		setLayouts(newLayouts);
		// Сохраняем изменения после удаления (если не в режиме редактирования)
		if (!isEditing) {
			saveDashboardSettings(newLayouts, currentWidgets.filter(widget => widget.id !== widgetId));
		}
	};

	// Редактирование
	const startEditing = () => {
		setIsEditing(true);
		setShowWidgetPanel(true);
	};

	const cancelEditing = () => {
		const { layouts: savedLayouts, widgets: savedWidgets } = loadDashboardSettings(DEFAULT_LAYOUT, []);
		// Применяем ту же логику валидации, что и при первой загрузке
		const validatedLayouts = { ...DEFAULT_LAYOUT };
		if (savedLayouts) {
			const breakpoints = Object.keys(GRID_BREAKPOINTS);
			breakpoints.forEach(bp => {
				if (savedLayouts[bp] && Array.isArray(savedLayouts[bp])) {
					validatedLayouts[bp] = savedLayouts[bp].map(item => {
						const widget = savedWidgets?.find(w => w.id === item.i);
						const type = widget ? widget.type : 'default';
						const { minW, minH } = widgetMinDimensionsConfig[type] || widgetMinDimensionsConfig.default;
						const cols = GRID_COLUMNS[bp] || 12;
						let validItem = { ...item };
						if (!validItem.w || validItem.w < minW) validItem.w = minW;
						if (validItem.w > cols) validItem.w = cols;
						if (!validItem.h || validItem.h < minH) validItem.h = minH;
						if (validItem.x + validItem.w > cols) validItem.x = Math.max(0, cols - validItem.w);
						if (validItem.x < 0) validItem.x = 0;
						if (!validItem.y || validItem.y < 0) validItem.y = 0;
						validItem.minW = minW;
						validItem.minH = minH;
						return validItem;
					});
				} else {
					validatedLayouts[bp] = savedLayouts[bp] || []; // Копируем если есть, иначе пустой
				}
			});
		}
		setLayouts(validatedLayouts);
		setCurrentWidgets(savedWidgets || []);
		setIsEditing(false);
		setShowWidgetPanel(false);
	};

	const saveChanges = () => {
		// Перед сохранением еще раз валидируем текущий макет
		const validatedLayouts = { ...layouts };
		const breakpoints = Object.keys(GRID_BREAKPOINTS);
		breakpoints.forEach(bp => {
			if (validatedLayouts[bp] && Array.isArray(validatedLayouts[bp])) {
				validatedLayouts[bp] = validatedLayouts[bp].map(item => {
					const widget = currentWidgets.find(w => w.id === item.i);
					const type = widget ? widget.type : 'default';
					const { minW, minH } = widgetMinDimensionsConfig[type] || widgetMinDimensionsConfig.default;
					const cols = GRID_COLUMNS[bp] || 12;
					let validItem = { ...item };
					if (!validItem.w || validItem.w < minW) validItem.w = minW;
					if (validItem.w > cols) validItem.w = cols;
					if (!validItem.h || validItem.h < minH) validItem.h = minH;
					if (validItem.x + validItem.w > cols) validItem.x = Math.max(0, cols - validItem.w);
					if (validItem.x < 0) validItem.x = 0;
					if (!validItem.y || validItem.y < 0) validItem.y = 0;
					validItem.minW = minW;
					validItem.minH = minH;
					return validItem;
				});
			}
		});
		saveDashboardSettings(validatedLayouts, currentWidgets);
		setLayouts(validatedLayouts); // Обновляем состояние валидированным макетом
		setIsEditing(false);
		setShowWidgetPanel(false);
	};

	// Функции отладки localStorage и clearLocalStorage остаются без изменений
	const debugLocalStorage = () => { /* ... */ };

	const clearLocalStorage = () => {
		if (window.confirm('Вы уверены, что хотите удалить все сохраненные данные дашборда?')) {
			console.log('LocalStorage before clearing:');
			// debugLocalStorage(); // Можно раскомментировать для отладки

			try {
				// Прямое удаление данных из localStorage
				localStorage.removeItem(STORAGE_KEYS.LAYOUTS);
				localStorage.removeItem(STORAGE_KEYS.WIDGETS);

				// Дополнительная очистка на случай старых ключей
				for (let i = 0; i < localStorage.length; i++) {
					const key = localStorage.key(i);
					if (key && key.startsWith('dashboard')) {
						localStorage.removeItem(key);
					}
				}

				// Проверяем, что данные удалены (для лога)
				console.log('LocalStorage after direct removal:');
				console.log(`${STORAGE_KEYS.LAYOUTS} exists:`, localStorage.getItem(STORAGE_KEYS.LAYOUTS) !== null);
				console.log(`${STORAGE_KEYS.WIDGETS} exists:`, localStorage.getItem(STORAGE_KEYS.WIDGETS) !== null);

				// --- ОБНОВЛЕНИЕ СОСТОЯНИЯ ДЛЯ НЕМЕДЛЕННОГО ОТОБРАЖЕНИЯ --- 
				// Очищаем список текущих виджетов
				setCurrentWidgets([]);
				// Сбрасываем макеты к дефолтным значениям
				setLayouts(DEFAULT_LAYOUT);
				// -----------------------------------------------------------

				console.log('Dashboard reset complete, state updated.');
			} catch (error) {
				console.error('Error clearing localStorage:', error);
			}
		}
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<DashboardHeader
				isEditing={isEditing}
				onStartEditing={startEditing}
				onCancelEditing={cancelEditing}
				onSaveChanges={saveChanges}
				onCheckStorage={debugLocalStorage}
				onResetDashboard={clearLocalStorage}
			/>

			<div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
				<WidgetManager
					show={showWidgetPanel}
					availableWidgets={AVAILABLE_WIDGETS}
					currentWidgets={currentWidgets}
					onAddWidget={addWidget}
					onRemoveWidget={removeWidget}
				/>

				{currentWidgets.length === 0 ? (
					<EmptyState onAction={startEditing} />
				) : (
					<div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${isEditing ? 'border-2 border-blue-200' : ''}`}>
						{isEditing && (
							<div className="p-4 bg-blue-50 border-b border-blue-200">
								<p className="text-sm text-blue-700">
									<svg className="inline-block h-4 w-4 mr-1.5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
										<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
									</svg>
									Edit mode: Drag widgets to reposition or resize. Click "Save Changes" when done.
								</p>
							</div>
						)}
						<ResponsiveGridLayout
							className="layout p-4"
							layouts={layouts}
							onLayoutChange={handleLayoutChange}
							onDragStop={handleDragStop}
							onResizeStop={handleResizeStop}
							rowHeight={100}
							breakpoints={GRID_BREAKPOINTS} // Используем из конфига
							cols={GRID_COLUMNS} // Используем из конфига
							isDraggable={isEditing}
							isResizable={isEditing}
							margin={[16, 16]}
							autoSize={true}
							useCSSTransforms={true}
							placeholder={{
								backgroundColor: 'rgba(220, 53, 69, 0.1)',
								border: '2px dashed #dc3545'
							}}
							compactType="vertical"
							preventCollision={false}
						// isBounded={true} - Оставляем закомментированным
						>
							{currentWidgets.map(widget => (
								<div key={widget.id}>
									<GridWidget
										widget={widget}
										isEditing={isEditing}
										onRemoveWidget={removeWidget}
									/>
								</div>
							))}
						</ResponsiveGridLayout>
					</div>
				)}
			</div>
		</div>
	);
};

export default Dashboard; 