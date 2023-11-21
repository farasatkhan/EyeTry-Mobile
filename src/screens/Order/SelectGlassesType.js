import React from 'react';
import { View, StyleSheet , Text} from 'react-native';
// import { WebView } from 'react-native-webview';

const App = () => {
  return (
    <View style={styles.container}>
      {/* 
        Replace 'localhost' with your machine's IP address (e.g., '192.168.10.14')
        Make sure your development server is running
      */}
      {/* <WebView
        source={{ uri: 'https://eyetry-web.vercel.app/' }}

        style={styles.webview}
      /> */}
      <Text>Glasses type</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default App;
