import ReactNativeBiometrics, {
  BiometryType,
  BiometryTypes,
} from 'react-native-biometrics';

export const getAvailableBiometrics = async () => {
  const biometrics = new ReactNativeBiometrics();
  try {
    const result = await biometrics.isSensorAvailable();
    const {available, biometryType} = result;
    if (available && biometryType) {
      return biometryType;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export const triggerBiometricAuthentication = async (
  biometric: BiometryType,
) => {
  const biometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: biometric === 'FaceID' ? false : true,
  });

  try {
    const result = await biometrics.simplePrompt({
      promptMessage: `Use ${
        biometric === 'Biometrics' ? 'Fingerprint' : biometric
      }`,
    });
    return result.success;
  } catch (err) {
    return false;
  }
};
