import {StyleSheet} from 'react-native';
import {COLORS} from '../../constant/colors';

export const styles = StyleSheet.create({
  textinputContainer: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 20,
    marginVertical: 10,
    fontWeight: '600',
    color: 'black',
    borderColor: 'rgba(0,0,256,0.4)',
  },
  modalContainer: {
    flex: 1,
    paddingVertical: 100,
    padding: 40,
    justifyContent: 'center',
    backgroundColor: COLORS.overlay,
  },
  flatlistContentContainer: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    gap: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: COLORS.grey,
  },
  selectedText: {
    color: COLORS.primaryBlue,
  },
  seperator: {height: 1, backgroundColor: 'grey'},
});
