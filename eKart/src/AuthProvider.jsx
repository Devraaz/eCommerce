import React, { createContext, useState, useEffect } from "react";

import axios from "./config-axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);
      fetchUserData();
    }

    const refreshToken = async () => {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        try {
          const response = await axios.post("/api/token/refresh/", {
            refresh: refreshToken,
          });
          const newAccessToken = response.data.access;
          localStorage.setItem("access_token", newAccessToken);
          setIsAuthenticated(true);
          fetchUserData();
        } catch (error) {
          console.error("Token refresh failed", error);
          logout();
        }
      }
    };

    // Set up axios interceptor to refresh token on 401 errors
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          await refreshToken();
          originalRequest.headers["Authorization"] =
            `Bearer ${localStorage.getItem("access_token")}`;
          return axios(originalRequest);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/profile/");
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  const login = (access_token, refresh_token) => {
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    setIsAuthenticated(true);
    fetchUserData();
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null); // Clear user data on logout
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  return (
    <>
      <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
