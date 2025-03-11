import React from 'react'

interface TextInputProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void
  placeholder?: string;
  disabled?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({label, value, onChange, placeholder, disabled}) => {
  return (
    <div className="flex flex-col gap-1">
      <label  className="w-full text-center border border-gray-300 rounded-md p-2 shadow-sm focus:ring focus:ring-blue-300"
>{label}</label>
      <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400 focus:outline-none transition"
      />
    </div>
  )
}

export default TextInput