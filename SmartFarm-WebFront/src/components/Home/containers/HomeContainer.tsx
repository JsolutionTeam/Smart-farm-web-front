import Home from '../Home';
import { useState, useEffect } from 'react';
import { apiRoute, requestSecureGet } from '@lib/api';

// 5초
const HomeContainer = () => {
  const getRealTimeData = async () => {
    const { config, data } = await requestSecureGet(
      apiRoute.site + `$/realtime`,
      {},
      'token',
    );
    if (config.status >= 200 && config.status < 400) {
    }
  };

  useEffect(() => {
    getRealTimeData();
  }, []);

  return <Home />;
};

export default HomeContainer;
