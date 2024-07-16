import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {User} from '../data/mockData';

type RootStackParamList = {
  Login: undefined;
  Home: {user: User};
};

type ScreenProps<T extends keyof RootStackParamList> = React.FC<
  NativeStackScreenProps<RootStackParamList, T>
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type {RootStackParamList, ScreenProps};
