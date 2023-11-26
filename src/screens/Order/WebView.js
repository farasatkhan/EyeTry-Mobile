import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { WebView } from 'react-native-webview';

const App = ({ navigation, route }) => {
  return (
    <View style={styles.container}>


      <WebView
        source={{ uri: 'https://eyetry-web.vercel.app/' }}

        style={styles.webview}
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
