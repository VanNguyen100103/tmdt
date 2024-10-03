import React, { useState } from 'react';

function InputField({ value, setValue, nameKey, type }) {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <div className="w-full relative">
      {isFocus && (
        <label
          className="text-[12px] absolute top-0 left-[8px] bg-white"
          htmlFor={nameKey}
        >
          {nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        </label>
      )}
      <input
        type={type}
        className="px-4 py-2 rounded-sm border my-2 placeholder:text-sm placeholder:italic outline-none w-full"
        placeholder={nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        value={value || ''}  // Ensure value is not undefined
        onChange={(e) => setValue(e.target.value)} // Directly pass the updated value
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </div>
  );
}

export default InputField;
