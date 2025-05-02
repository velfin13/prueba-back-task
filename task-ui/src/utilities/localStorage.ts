export const setLocalStorage = <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`Error setting localStorage key "${key}":`, err);
    }
  };
  
  export const getLocalStorage = <T>(key: string): T | null => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : null;
    } catch (err) {
      console.error(`Error getting localStorage key "${key}":`, err);
      return null;
    }
  };
  
  export const removeLocalStorage = (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error(`Error removing localStorage key "${key}":`, err);
    }
  };
  