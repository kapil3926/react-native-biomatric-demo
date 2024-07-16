import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {Pressable, Text, View} from 'react-native';
import {BiometryType} from 'react-native-biometrics';
import * as Keychain from 'react-native-keychain';
import CapsuleButton from '../../components/CapsuleButton';
import Users from '../../components/Users';
import {User} from '../../data/mockData';
import {ScreenProps} from '../../typings/navigation';
import {
  getAvailableBiometrics,
  triggerBiometricAuthentication,
} from '../../utils/services/biometricService';
import {getItem, USER} from '../../utils/services/storageService';
import {styles} from './styles';

let isAppLaunched = false;

const Login: ScreenProps<'Login'> = ({navigation, route}) => {
  const [availableBiometric, setAvailableBiometric] = useState<
    false | BiometryType
  >(false);
  const {navigate} = navigation;
  const [keychainUser, setKeychainUser] = useState<
    false | Keychain.UserCredentials
  >(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [hasOptedForBiometric, setHasOptedForBiometric] = useState(false);

  const toggleBiometric = async () => {
    if (isBiometricEnabled) {
      setIsBiometricEnabled(false);
      return;
    }
    try {
      if (typeof availableBiometric === 'string') {
        const result = await triggerBiometricAuthentication(availableBiometric);
        if (result) {
          setIsBiometricEnabled(true);
        }
      }
    } catch (error) {
      console.log(error, 'ERROR');
      setIsBiometricEnabled(false);
    }
  };

  const onSelectUser = (user: User) => {
    const isKeychainUser =
      keychainUser && user?.username === keychainUser.username;
    setHasOptedForBiometric(isKeychainUser);
    setIsBiometricEnabled(isKeychainUser);
    setSelectedUser(user);
  };

  const authenticateByBiometric = async (
    biometric: false | BiometryType = availableBiometric,
    user: undefined | User = selectedUser,
  ) => {
    if (typeof biometric === 'string' && !!user) {
      let result = await triggerBiometricAuthentication(biometric);
      if (result) {
        navigate('Home', {user});
      }
    }
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    const initBiometric = async () => {
      try {
        let user: false | User = await getItem(USER);
        user && setSelectedUser(user);
        const biometric = await getAvailableBiometrics();
        console.log('biometric', biometric);
        if (biometric) {
          setAvailableBiometric(biometric);
          const userCreds = await Keychain.getGenericPassword();
          if (!!userCreds && !!user) {
            setKeychainUser(userCreds);
            if (userCreds.username === user?.username) {
              setHasOptedForBiometric(true);
              setIsBiometricEnabled(true);
              if (isAppLaunched === false) {
                isAppLaunched = true;
                authenticateByBiometric(biometric, user);
              }
            }
          } else {
            isAppLaunched = true;
            setHasOptedForBiometric(false);
            setIsBiometricEnabled(false);
          }
        } else {
          isAppLaunched = true;
          setAvailableBiometric(false);
        }
      } catch (err) {}
    };
    if (isFocused) {
      initBiometric();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Users
        isBiometricEnabled={isBiometricEnabled}
        selectedUser={selectedUser}
        setSelectedUser={onSelectUser}
        keychainUser={keychainUser}
      />
      {availableBiometric && (
        <View style={styles.biometricColumn}>
          {!hasOptedForBiometric && (
            <View style={styles.biometricContainer}>
              <Pressable
                onPress={toggleBiometric}
                style={[
                  styles.selectionRadio,
                  isBiometricEnabled && styles.selectedText,
                ]}></Pressable>
              <Text style={styles.biometricText}>
                Enable {availableBiometric}
              </Text>
            </View>
          )}
          {hasOptedForBiometric && (
            <CapsuleButton
              onPress={() => authenticateByBiometric()}
              buttonText={`Use ${availableBiometric}`}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default Login;
