import { STORAGE_KEYS } from '../config/dashboardConfig';

/**
 * Сохраняет данные в localStorage
 * @param {string} key - Ключ для сохранения
 * @param {any} data - Данные для сохранения
 * @returns {boolean} - Успешно ли сохранены данные
 */
export const saveToStorage = (key, data) => {
	try {
		localStorage.setItem(key, JSON.stringify(data));
		return true;
	} catch (error) {
		console.error(`Error saving to localStorage (${key}):`, error);
		return false;
	}
};

/**
 * Загружает данные из localStorage
 * @param {string} key - Ключ для загрузки
 * @param {any} defaultValue - Значение по умолчанию, если данные не найдены
 * @returns {any} - Загруженные данные или defaultValue
 */
export const loadFromStorage = (key, defaultValue = null) => {
	try {
		const data = localStorage.getItem(key);
		return data ? JSON.parse(data) : defaultValue;
	} catch (error) {
		console.error(`Error loading from localStorage (${key}):`, error);
		return defaultValue;
	}
};

/**
 * Удаляет данные из localStorage
 * @param {string} key - Ключ для удаления
 * @returns {boolean} - Успешно ли удалены данные
 */
export const removeFromStorage = (key) => {
	try {
		localStorage.removeItem(key);
		return true;
	} catch (error) {
		console.error(`Error removing from localStorage (${key}):`, error);
		return false;
	}
};

/**
 * Сохраняет настройки дашборда в localStorage
 * @param {Object} layouts - Расположение виджетов
 * @param {Array} widgets - Список виджетов
 * @returns {boolean} - Успешно ли сохранены данные
 */
export const saveDashboardSettings = (layouts, widgets) => {
	try {
		saveToStorage(STORAGE_KEYS.LAYOUTS, layouts);
		saveToStorage(STORAGE_KEYS.WIDGETS, widgets);
		return true;
	} catch (error) {
		console.error('Error saving dashboard settings:', error);
		return false;
	}
};

/**
 * Загружает настройки дашборда из localStorage
 * @param {Object} defaultLayout - Расположение виджетов по умолчанию
 * @param {Array} defaultWidgets - Список виджетов по умолчанию
 * @returns {Object} - Объект с загруженными настройками
 */
export const loadDashboardSettings = (defaultLayout, defaultWidgets = []) => {
	return {
		layouts: loadFromStorage(STORAGE_KEYS.LAYOUTS, defaultLayout),
		widgets: loadFromStorage(STORAGE_KEYS.WIDGETS, defaultWidgets)
	};
};

/**
 * Сбрасывает настройки дашборда
 * @returns {boolean} - Успешно ли сброшены настройки
 */
export const resetDashboardSettings = () => {
	try {
		removeFromStorage(STORAGE_KEYS.LAYOUTS);
		removeFromStorage(STORAGE_KEYS.WIDGETS);
		return true;
	} catch (error) {
		console.error('Error resetting dashboard settings:', error);
		return false;
	}
};

/**
 * Проверяет, доступен ли localStorage в браузере
 * @returns {boolean} - Доступен ли localStorage
 */
export const isLocalStorageAvailable = () => {
	try {
		const testKey = '__test__';
		localStorage.setItem(testKey, testKey);
		localStorage.removeItem(testKey);
		return true;
	} catch (e) {
		return false;
	}
}; 