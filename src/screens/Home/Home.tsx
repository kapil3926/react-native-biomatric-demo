import React from 'react';
import {Text, View} from 'react-native';
import {ScreenProps} from '../../typings/navigation';
import {styles} from './styles';

const Home: ScreenProps<'Home'> = ({route}) => {
  const {user} = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.userText}>Hello {user.username}! Welcome</Text>
    </View>
  );
};

export default Home;
