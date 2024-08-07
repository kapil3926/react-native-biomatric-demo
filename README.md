# Biometric Authentication React Native Project

This React Native project demonstrates biometric authentication using `react-native-biometrics` and `react-native-keychain`.

## Features

- **Biometric Support:**
  - FaceID and TouchID for iOS devices.
  - Fingerprint authentication for Android devices.

- **Security:**
  - Secure storage of credentials using `react-native-keychain`.

## Libraries Used

- [`react-native-biometrics`](https://github.com/SelfLender/react-native-biometrics): Used for biometric authentication.
- [`react-native-keychain`](https://github.com/oblador/react-native-keychain): Used for secure storage.

## Usage

```bash
# Clone the repository
git clone <repository-url>
cd <project-folder>

# Install dependencies
npm install
# or
yarn install

# Navigate to the iOS directory
cd ios

# Install Pods
pod install

# Return to project root directory
cd ..

# Run the project on iOS
npx react-native run-ios

# Run the project on Android
npx react-native run-android

