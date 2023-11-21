import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { WebView } from 'react-native-webview';

const App = ({navigation, route}) => {
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
                  <Image
          style={{ width: '80%', height: 100, alignSelf: 'center', resizeMode: 'contain' }}
          source={{ uri: "http://localhost:3000/uploads/products/glasses/e678463bb99d2ac2032cc43b18fb9163.webp" }}
        />
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
