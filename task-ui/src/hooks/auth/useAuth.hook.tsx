import { useEffect, useState } from "react";
import { getLocalStorage } from "@/utilities";
import { LocalStorageTypes } from "@/models";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getLocalStorage(LocalStorageTypes.TOKEN);
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  return { isAuthenticated, loading };
};
