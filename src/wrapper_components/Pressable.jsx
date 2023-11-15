import React, {useState} from 'react';
import {Pressable as RNPressable} from 'react-native';

function Pressable({children, className, ...otherProps}) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <RNPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className={`${isPressed ? 'opacity-50' : 'opacity-100'} ${className}`}
      {...otherProps}>
      {children}
    </RNPressable>
  );
}

export default Pressable;
