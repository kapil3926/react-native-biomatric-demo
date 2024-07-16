import {StyleSheet} from 'react-native';
import {COLORS} from '../../constant/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlue,
  },
  userText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700',
  },
});
