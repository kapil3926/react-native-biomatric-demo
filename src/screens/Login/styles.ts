import {StyleSheet} from 'react-native';
import {COLORS} from '../../constant/colors';

export const styles = StyleSheet.create({
  container: {
    padding: 40,
    flex: 1,
    gap: 20,
  },
  selectionRadio: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  biometricColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
  },
  biometricContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  biometricText: {
    fontSize: 20,
    color: COLORS.grey,
  },
  selectedText: {
    backgroundColor: COLORS.primaryBlue,
  },
});
