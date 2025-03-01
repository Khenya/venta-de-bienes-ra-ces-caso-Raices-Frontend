import React from "react";

interface InputFieldProps {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
  placeholder: string;
  color: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, type, value, onChange, icon, placeholder, color }) => {
  return (
    <div className="mb-8">
      <label className="block text-sm font-medium mb-2" style={{ color }} htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">{icon}</span>
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          className="w-full px-10 py-2 border rounded-lg focus:outline-none"
          style={{ color }}
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
};

export default InputField;
