import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {FlatList, Modal, Pressable, Text, TextInput, View} from 'react-native';
import {setGenericPassword, UserCredentials} from 'react-native-keychain';
import {mockData, User} from '../../data/mockData';
import {setItem, USER} from '../../utils/services/storageService';
import CapsuleButton from '../CapsuleButton';
import {styles} from './styles';

type Props = {
  selectedUser: undefined | User;
  setSelectedUser: (user: User) => void;
  isBiometricEnabled: boolean;
  keychainUser: false | UserCredentials;
};

const Users: React.FC<Props> = ({
  selectedUser,
  setSelectedUser,
  isBiometricEnabled,
  keychainUser,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLogin = async () => {
    if (!selectedUser) return;
    if (
      isBiometricEnabled &&
      selectedUser &&
      (keychainUser === false ||
        keychainUser.username !== selectedUser?.username)
    ) {
      await setGenericPassword(selectedUser?.username, selectedUser?.password);
    }
    await setItem(USER, selectedUser);
    navigate('Home', {user: selectedUser});
  };

  const {navigate} = useNavigation();

  return (
    <View>
      <Pressable
        onPress={() => {
          setIsModalVisible(true);
        }}>
        <TextInput
          onPressIn={() => {
            setIsModalVisible(true);
          }}
          editable={false}
          style={styles.textinputContainer}
          value={selectedUser?.username}
          placeholder="Select User"
        />
      </Pressable>
      <TextInput
        editable={false}
        style={styles.textinputContainer}
        value={selectedUser?.password}
        placeholder="Enter Password"
      />
      <CapsuleButton
        disabled={!selectedUser}
        buttonText={'Login'}
        onPress={handleLogin}
      />
      <Modal
        visible={isModalVisible}
        transparent
        onRequestClose={() => setIsModalVisible(false)}>
        <Pressable
          onPress={() => setIsModalVisible(false)}
          style={styles.modalContainer}>
          <FlatList
            contentContainerStyle={styles.flatlistContentContainer}
            ListHeaderComponent={() => (
              <Text style={styles.text}>Select User</Text>
            )}
            data={mockData}
            ItemSeparatorComponent={() => <View style={styles.seperator} />}
            ListFooterComponent={() => (
              <CapsuleButton
                buttonText={'Close'}
                onPress={() => {
                  setIsModalVisible(false);
                }}
              />
            )}
            renderItem={({item}) => (
              <View>
                <Text
                  onPress={() => {
                    setSelectedUser(item);
                    setIsModalVisible(false);
                  }}
                  style={[
                    styles.text,
                    item.username === selectedUser?.username &&
                      styles.selectedText,
                  ]}>
                  {item.username}
                </Text>
              </View>
            )}
          />
        </Pressable>
      </Modal>
    </View>
  );
};

export default Users;
