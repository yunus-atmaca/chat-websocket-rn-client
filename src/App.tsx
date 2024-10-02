import React, {useEffect} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';

const ws = new WebSocket('ws://localhost:8080');

function App() {
  const startWebSocket = () => {
    console.log('Websocket started.');
    ws.onmessage = e => {
      console.log(`Received: ${e.data}`);
      //handleReceive(e.data);
    };
    ws.onclose = e => {
      console.log('Reconnecting: ', e.message);
      //setTimeout(startWebSocket, 5000);
    };
    ws.onerror = e => {
      console.log(`Error: ${e.message}`);
    };
  };

  useEffect(() => {
    startWebSocket();

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    ws.send('Here I am');
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity
        onPress={sendMessage}
        style={{
          width: 128,
          height: 52,
          backgroundColor: 'red',
        }}></TouchableOpacity>
    </View>
  );
}

export default App;
