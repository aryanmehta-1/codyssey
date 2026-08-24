import { createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  
  const [users, setUsers] = useLocalStorage('codyssey_users', []);
  const [session, setSession] = useLocalStorage('codyssey_session', null);

  
  function signUp({ name, email, password }) {
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      onboardingComplete: false,
      createdAt: new Date().toISOString(),
    };
    setUsers((prev) => [...prev, newUser]);
    setSession({ userId: newUser.id });
    return { success: true, user: newUser };
  }

  
  function signIn({ email, password }) {
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) {
      return { success: false, error: 'Invalid email or password.' };
    }
    setSession({ userId: user.id });
    return { success: true, user };
  }

  
  function logout() {
    setSession(null);
  }

  
  function completeOnboarding(profileData) {
    setUsers((prev) =>
      prev.map((u) =>
        session && u.id === session.userId
          ? { ...u, onboardingComplete: true, profile: profileData }
          : u
      )
    );
  }

  
  const currentUser = session ? users.find((u) => u.id === session.userId) || null : null;

  const value = {
    currentUser,
    isAuthenticated: Boolean(currentUser),
    signUp,
    signIn,
    logout,
    completeOnboarding,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
