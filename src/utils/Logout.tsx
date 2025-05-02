"use client";

export const logout = async () => {
  if (typeof window === 'undefined') return;

  try {
    const token = localStorage.getItem('token');
    
    localStorage.removeItem('token');
    
    if (token) {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
    }
    window.location.assign('/Login');
    
  } catch (error) {
    console.error('Logout error:', error);
    localStorage.removeItem('token');
    window.location.assign('/Login');
  }
};