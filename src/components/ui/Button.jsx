import React from 'react';

/**
 * Компонент кнопки с различными вариантами стилей
 * @param {string} variant - Вариант кнопки (primary, secondary, outline, text)
 * @param {string} size - Размер кнопки (sm, md, lg)
 * @param {function} onClick - Обработчик клика
 * @param {boolean} disabled - Отключена ли кнопка
 * @param {node} leftIcon - Иконка слева от текста
 * @param {node} rightIcon - Иконка справа от текста
 * @param {string} className - Дополнительные классы
 * @param {node} children - Содержимое кнопки
 * @param {Object} props - Остальные свойства
 */
const Button = ({
	variant = 'primary',
	size = 'md',
	onClick,
	disabled = false,
	leftIcon,
	rightIcon,
	className = '',
	children,
	...props
}) => {
	// Базовые классы для всех кнопок
	const baseClasses = 'inline-flex items-center justify-center font-medium rounded focus:outline-none transition-colors';

	// Классы для разных вариантов
	const variantClasses = {
		primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
		secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50',
		outline: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50',
		text: 'bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100',
		danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50',
	};

	// Классы для разных размеров
	const sizeClasses = {
		sm: 'px-2 py-1 text-xs',
		md: 'px-4 py-2 text-sm',
		lg: 'px-6 py-3 text-base',
	};

	// Классы для отключенного состояния
	const disabledClasses = disabled
		? 'opacity-50 cursor-not-allowed'
		: 'cursor-pointer';

	// Объединяем все классы
	const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant] || variantClasses.primary}
    ${sizeClasses[size] || sizeClasses.md}
    ${disabledClasses}
    ${className}
  `;

	return (
		<button
			className={buttonClasses.trim()}
			onClick={onClick}
			disabled={disabled}
			{...props}
		>
			{leftIcon && <span className="mr-2">{leftIcon}</span>}
			{children}
			{rightIcon && <span className="ml-2">{rightIcon}</span>}
		</button>
	);
};

export default Button; 