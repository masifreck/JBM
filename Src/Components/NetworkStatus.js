// useNetworkStatus.js
import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    });

    // Fetch the current network state once when the component mounts
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    });

    // Clean up the subscription on component unmount
    return () => unsubscribe();
  }, []);

  return isConnected;
};

export default useNetworkStatus;
