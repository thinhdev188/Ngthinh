import { useState, useEffect } from 'react';

interface BatteryManager extends EventTarget {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
}

export const useBattery = () => {
  const [level, setLevel] = useState(100);
  const [charging, setCharging] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    // FIX: Cast navigator to `any` to access the experimental `getBattery` API, which is not part of the standard Navigator type.
    if (!(navigator as any).getBattery) {
      setSupported(false);
      return;
    }

    let batteryManager: BatteryManager | null = null;

    const updateBatteryStatus = (manager: BatteryManager) => {
      setLevel(Math.round(manager.level * 100));
      setCharging(manager.charging);
    };

    const batteryListener = () => {
        if (batteryManager) {
            updateBatteryStatus(batteryManager);
        }
    };

    // FIX: Cast navigator to `any` to access the experimental `getBattery` API and explicitly type the resulting manager object.
    (navigator as any).getBattery().then((manager: BatteryManager) => {
      batteryManager = manager;
      updateBatteryStatus(manager);
      manager.addEventListener('levelchange', batteryListener);
      manager.addEventListener('chargingchange', batteryListener);
    });

    return () => {
      if (batteryManager) {
        batteryManager.removeEventListener('levelchange', batteryListener);
        batteryManager.removeEventListener('chargingchange', batteryListener);
      }
    };
  }, []);

  return { level, charging, supported };
};
