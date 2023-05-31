import React, { useCallback, useState } from 'react';

interface IButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  onHandleTakeColor(value: string): void;
}

const ColorPalette = ({ type, onHandleTakeColor }: IButtonProps) => {
  const colorBackground = ['#000000', '#1D64CC', '#CB3533'];
  const [currentColor, setCurrentColor] = useState('');

  const handleSelectColor = useCallback(
    (value: string) => {
      onHandleTakeColor(value);
      setCurrentColor(value);
    },
    [onHandleTakeColor]
  );

  return (
    <div className="flex flex-column">
      <div
        className="flex border px-1 py-2 rounded-full mx-2"
        style={{ borderColor: currentColor === '' ? 'gray' : '' }}
      >
        <button
          onClick={() => handleSelectColor(colorBackground[0])}
          type={type || 'button'}
          className="flex p-3 rounded-full mx-1"
          style={{ backgroundColor: colorBackground[0] }}
        />
      </div>
      <div
        className="flex border px-1 py-2 rounded-full"
        style={{ borderColor: currentColor === '#1D64CC' ? 'gray' : '' }}
      >
        <button
          onClick={() => handleSelectColor(colorBackground[1])}
          type={type || 'button'}
          className="flex p-3 rounded-full mx-1"
          style={{ backgroundColor: colorBackground[1] }}
        />
      </div>
      <div
        className="flex border px-1 py-2 rounded-full mx-2"
        style={{ borderColor: currentColor === '#CB3533' ? 'gray' : '' }}
      >
        <button
          onClick={() => handleSelectColor(colorBackground[2])}
          type={type || 'button'}
          className="flex p-3 rounded-full mx-1"
          style={{ backgroundColor: colorBackground[2] }}
        />
      </div>
    </div>
  );
};

export default ColorPalette;
