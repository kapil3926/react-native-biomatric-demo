import {StyleSheet} from 'react-native';
import {COLORS} from '../../constant/colors';

export const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.primaryBlue,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
  },
});
