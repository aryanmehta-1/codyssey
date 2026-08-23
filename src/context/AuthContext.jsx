import { createContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

/**
 * AuthContext — demo, client-side-only authentication.
 * NOT secure production auth: passwords are stored in localStorage in
 * plain form purely so the Evaluation-I demo can sign up/sign in without
 * a backend. This is called out explicitly in the README.
 */
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage('codyssey_users', []);
  const [session, setSession] = useLocalStorage('codyssey_session', null);

  const signUp = useCallback(
    ({ name, email, password }) => {
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
    },
    [users, setUsers, setSession]
  );

  const signIn = useCallback(
    ({ email, password }) => {
      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      if (!user) {
        return { success: false, error: 'Invalid email or password.' };
      }
      setSession({ userId: user.id });
      return { success: true, user };
    },
    [users, setSession]
  );

  const logout = useCallback(() => {
    setSession(null);
  }, [setSession]);

  const completeOnboarding = useCallback(
    (profileData) => {
      setUsers((prev) =>
        prev.map((u) =>
          session && u.id === session.userId
            ? { ...u, onboardingComplete: true, profile: profileData }
            : u
        )
      );
    },
    [session, setUsers]
  );

  const currentUser = useMemo(
    () => (session ? users.find((u) => u.id === session.userId) || null : null),
    [session, users]
  );

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated: !!currentUser,
      signUp,
      signIn,
      logout,
      completeOnboarding,
    }),
    [currentUser, signUp, signIn, logout, completeOnboarding]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
