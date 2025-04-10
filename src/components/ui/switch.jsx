// components/ui/switch.jsx
import React from 'react';

export const Switch = ({ checked, onCheckedChange, className = '' }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className={`
        w-11 h-6 bg-gray-200 rounded-full peer 
        peer-checked:after:translate-x-full 
        peer-checked:bg-green-600
        after:content-[''] 
        after:absolute 
        after:top-[2px] 
        after:left-[2px] 
        after:bg-white 
        after:border-gray-300 
        after:border 
        after:rounded-full 
        after:h-5 
        after:w-5 
        after:transition-all
        ${className}
      `}></div>
    </label>
  );
};