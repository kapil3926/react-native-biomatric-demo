import React from 'react';
import {Pressable, Text} from 'react-native';
import {styles} from './styles';

type Props = {
  onPress: () => void;
  buttonText: string | number;
  disabled?: boolean;
};

const CapsuleButton: React.FC<Props> = ({onPress, buttonText, disabled}) => {
  return (
    <Pressable
      disabled={disabled}
      style={[styles.buttonContainer, disabled && styles.disabledButton]}
      onPress={onPress}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </Pressable>
  );
};

export default CapsuleButton;
