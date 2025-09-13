'use client'

import { useEffect, useCallback } from 'react'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { setUser, setStatus } from '@/lib/authSlice'

const BACKEND = "http://localhost:3000"

export default function AuthInitializer() {
  const dispatch = useAppDispatch()
  const { user, isLoggedIn } = useAppSelector((state) => state.auth)

  function formatError(err: unknown): string {
    if (err instanceof Error) return err.message
    try {
      return typeof err === "string" ? err : JSON.stringify(err)
    } catch {
      return String(err)
    }
  }

  const fetchUserData = useCallback(async () => {
    try {
      const res = await axios.get(`${BACKEND}/user`, { withCredentials: true })
      
      if (res.data && typeof res.data === "object") {
        const userData = res.data as Record<string, unknown>
        const user = userData.user as Record<string, unknown>
        
        if (user) {
          dispatch(setUser(user))
          localStorage.setItem("vericrop_logged_in", "true")
          dispatch(setStatus("User authenticated and loaded"))
        } else {
          dispatch(setUser(null))
          localStorage.removeItem("vericrop_logged_in")
          dispatch(setStatus("No user data found"))
        }
      } else {
        dispatch(setUser(null))
        localStorage.removeItem("vericrop_logged_in")
        dispatch(setStatus("Invalid response format"))
      }
    } catch (err: unknown) {
      dispatch(setUser(null))
      localStorage.removeItem("vericrop_logged_in")
      dispatch(setStatus(`Auth error: ${formatError(err)}`))
    }
  }, [dispatch])

  const verifySession = useCallback(async () => {
    try {
      const res = await axios.get(`${BACKEND}/verify`, { withCredentials: true });
      
      if (res.data && res.data.ok) {
        dispatch(setStatus("Session verified successfully"));
        await fetchUserData();
      } else {
        // Only clear user data if we don't already have it in Redux
        if (!user) {
          dispatch(setUser(null));
          localStorage.removeItem("vericrop_logged_in");
        }
        dispatch(setStatus("Session verification failed"));
      }
    } catch (err: unknown) {
      // Only clear user data if we don't already have it in Redux
      if (!user) {
        dispatch(setUser(null));
        localStorage.removeItem("vericrop_logged_in");
      }
      dispatch(setStatus(`Session verify error: ${formatError(err)}`));
    }
  }, [dispatch, fetchUserData, user]);

  useEffect(() => {
    const initializeAuth = async () => {
      // If we are on the page that completes auth, do nothing.
      // That page is responsible for the initial user state.
      if (window.location.pathname === '/auth-complete') {
        return;
      }

      // If we already have user data in Redux, don't try to verify session
      // This prevents clearing existing user data if cookie isn't sent
      if (user && isLoggedIn) {
        dispatch(setStatus("User data already loaded from Redux"));
        return;
      }

      // Always try to verify the session with the backend.
      // The browser will automatically send the HttpOnly session cookie.
      await verifySession();
    };

    initializeAuth();
    // We only want this to run once on mount.
    // The functions it calls (verifySession) have their own dependencies.
  }, [user, isLoggedIn]);

  return null;
}
