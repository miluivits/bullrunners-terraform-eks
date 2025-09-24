import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("http://localhost:5000/auth/me", {
          credentials: "include", // cookie küldése
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("User fetch error:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  async function login({ username, password }) {
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Login failed");

      setUser(data.user);
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  }

  async function register({ username, password }) {
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Register failed");

      setUser(data.user);
    } catch (err) {
      console.error("Register error:", err);
      throw err;
    }
  }

  async function logout() {
    try {
      await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
    }
  }

  return (
    <UserContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
