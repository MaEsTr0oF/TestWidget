<div
	className={`
				relative h-full w-full bg-white rounded-lg shadow-sm border transition-all
				${isEditing ? 'cursor-move react-resizable' : 'react-resizable-hide'}
				${isHovered && isEditing ? 'border-blue-400 shadow-md' : 'border-gray-200'}
				flex flex-col
			`}
	onMouseEnter={handleMouseEnter}
	onMouseLeave={handleMouseLeave}
> 