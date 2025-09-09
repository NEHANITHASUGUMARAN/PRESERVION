import { useState, useEffect, useCallback } from 'react';

export const useRealTimeData = (initialData, updateInterval = 5000) => {
  const [data, setData] = useState(initialData);
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const updateData = useCallback(() => {
    // Simulate real-time data updates
    setData(prevData => {
      if (Array.isArray(prevData)) {
        return prevData.map(item => ({
          ...item,
          // Simulate changing values
          temperature: (item.temperature || 0) + (Math.random() - 0.5) * 2,
          humidity: (item.humidity || 0) + (Math.random() - 0.5) * 5,
          ethylene: (item.ethylene || 0) + (Math.random() - 0.5) * 0.5,
          lastUpdated: new Date().toLocaleTimeString()
        }));
      }
      return prevData;
    });
    setLastUpdate(new Date());
  }, []);

  useEffect(() => {
    const interval = setInterval(updateData, updateInterval);
    return () => clearInterval(interval);
  }, [updateData, updateInterval]);

  const refreshData = useCallback(() => {
    updateData();
  }, [updateData]);

  return {
    data,
    isConnected,
    lastUpdate,
    refreshData
  };
};
