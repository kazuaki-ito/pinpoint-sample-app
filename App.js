import React from 'react';
import {NativeModules, SafeAreaView, Text} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

// import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Amplify from 'aws-amplify';
import PushNotification from '@aws-amplify/pushnotification';
import awsconfig from './src/aws-exports';

Amplify.configure(awsconfig);
PushNotification.configure(awsconfig);

PushNotification.onRegister(async token => {
  console.log('in app registration', token);
  alert(token);
  Clipboard.setString(token);
  PushNotification.updateEndpoint(token);
});

// In case PushNotification.onRegister didn't work
/*
NativeModules.RNPushNotification.getToken(token => {
  console.log(`PushToken: ${token}`);
  alert(token);
});
 */

PushNotification.onNotification(notification => {
  console.log('in app notification', notification);
  alert(JSON.stringify(notification));
});

PushNotification.onNotificationOpened(notification => {
  console.log('the notification is opened', notification);
  alert(JSON.stringify(notification));
});

// const endpointId = Analytics.getPluggable('AWSPinpoint')._config.endpointId;
// console.log(`endpoint ID: ${endpointId}`);

const App: () => React$Node = () => {
  return (
    <SafeAreaView>
      <Text>Push Notification</Text>
    </SafeAreaView>
  );
};

export default App;
