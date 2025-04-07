import React, { useRef, useEffect, useState } from 'react';

const TasksByHealthWidget = ({ data }) => {
	// Расчет процентов и размеров сегментов для круговой диаграммы
	const total = data.tasksByHealth.reduce((sum, item) => sum + item.count, 0);
	const containerRef = useRef(null);
	const [size, setSize] = useState(200); // Увеличил начальный размер
	const [isInitialized, setIsInitialized] = useState(false);

	// Адаптация размера диаграммы к размеру контейнера
	useEffect(() => {
		// Устанавливаем флаг сразу, чтобы ResizeObserver не вызывался на первом рендере
		if (!isInitialized) {
			setIsInitialized(true);
		}

		if (containerRef.current) {
			// Устанавливаем начальный размер с небольшой задержкой
			setTimeout(() => {
				const { width, height } = containerRef.current.getBoundingClientRect();

				// Проверяем, что размеры достаточны для установки
				if (width < 50 || height < 50) return;

				// Выбираем меньшее из измерений, оставляя место для легенды
				const minDimension = Math.min(width, height * 0.7);
				const newSize = Math.max(minDimension, 150); // Увеличил минимальный размер

				setSize(newSize);
			}, 200); // Увеличил задержку
		}
	}, []);

	// ResizeObserver для адаптации размера при изменении контейнера
	useEffect(() => {
		if (!containerRef.current || !isInitialized) return;

		const resizeObserver = new ResizeObserver(entries => {
			// Не обрабатываем первый вызов
			if (!isInitialized) return;

			for (let entry of entries) {
				const { width, height } = entry.contentRect;

				// Если размеры слишком малы, не обновляем
				if (width < 100 || height < 100) return;

				// Выбираем меньшее из измерений с запасом для легенды
				const minDimension = Math.min(width, height * 0.7);
				// Устанавливаем минимальный и максимальный размер
				setSize(Math.max(Math.min(minDimension, 300), 150));
			}
		});

		resizeObserver.observe(containerRef.current);
		return () => {
			resizeObserver.disconnect();
		};
	}, [isInitialized]);

	// Расчет длины окружности (для stroke-dasharray)
	const radius = size * 0.35;
	const circumference = 2 * Math.PI * radius;

	// Начинаем с верхней точки окружности
	let currentOffset = 0;

	return (
		<div className="h-full flex flex-col overflow-hidden" ref={containerRef}>
			<div className="section-header mb-2 flex items-center">
				<div className="bg-blue-100 w-6 h-6 rounded flex items-center justify-center text-blue-500 mr-2">
					<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
						<path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
					</svg>
				</div>
				<span className="text-sm font-medium text-gray-700">Open Tasks by Health</span>
			</div>

			<div className="flex-grow flex flex-col items-center justify-start overflow-auto min-h-[250px]">
				<div
					className="relative flex items-center justify-center transition-all duration-300"
					style={{ width: `${size}px`, height: `${size}px`, minWidth: "150px", minHeight: "150px" }}
				>
					{/* Пустая окружность как фон */}
					<svg className="w-full h-full" viewBox="0 0 200 200">
						<circle
							cx="100"
							cy="100"
							r={radius}
							fill="none"
							stroke="#f3f4f6"
							strokeWidth={radius * 0.35}
							className="transition-all duration-300"
						/>

						{/* Динамически создаем сегменты круговой диаграммы */}
						{data.tasksByHealth.map((item, index) => {
							const percent = item.count / total;
							const dashLength = circumference * percent;
							const dashSpace = circumference - dashLength;
							const offset = currentOffset;
							currentOffset += dashLength;

							return (
								<circle
									key={index}
									cx="100"
									cy="100"
									r={radius}
									fill="none"
									stroke={item.color}
									strokeWidth={radius * 0.35}
									strokeDasharray={`${dashLength} ${dashSpace}`}
									strokeDashoffset={-offset}
									transform="rotate(-90 100 100)"
									className="transition-all duration-300"
								/>
							);
						})}

						{/* Центральный текст */}
						<text
							x="100"
							y="95"
							textAnchor="middle"
							dominantBaseline="middle"
							className="text-4xl font-bold transition-all duration-300"
							fill="#1e40af"
							fontSize={radius * 0.6}
						>
							{total}
						</text>
						<text
							x="100"
							y="120"
							textAnchor="middle"
							dominantBaseline="middle"
							className="text-xs transition-all duration-300"
							fill="#6b7280"
							fontSize={radius * 0.25}
						>
							Number of Tasks
						</text>
					</svg>
				</div>

				{/* Легенда */}
				<div className="mt-2 flex flex-col space-y-1 w-full">
					{data.tasksByHealth.map((item, index) => (
						<div key={index} className="flex items-center">
							<span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
							<span className="font-semibold text-sm">{item.status} - {item.count} ({Math.round(item.count / total * 100)}%)</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default TasksByHealthWidget; 