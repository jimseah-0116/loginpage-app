import React, { createContext, useState, useEffect } from 'react';

// Create authentication context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
    // State to track if user is authenticated
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // State to store user data
    const [user, setUser] = useState(null);
    // State to track if auth is being checked (for loading states)
    const [loading, setLoading] = useState(true);

    // Check if token exists in localStorage when the app loads
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                try {
                    // Make a request to verify the token and get user data
                    const response = await fetch('http://localhost:5000/api/auth/profile', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUser(data.user);
                        setIsAuthenticated(true);
                    } else {
                        // If token is invalid, clear localStorage
                        localStorage.removeItem('token');
                    }
                } catch (error) {
                    console.error('Authentication error:', error);
                    localStorage.removeItem('token');
                }
            }

            setLoading(false);
        };

        checkAuth();
    }, []);

    // Login function
    const login = async (username, password) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Store token in localStorage
                localStorage.setItem('token', data.token);
                setIsAuthenticated(true);

                // Fetch user profile
                const profileResponse = await fetch('http://localhost:5000/api/auth/profile', {
                    headers: {
                        'Authorization': `Bearer ${data.token}`
                    }
                });

                const profileData = await profileResponse.json();
                setUser(profileData.user);

                return { success: true };
            } else {
                return {
                    success: false,
                    message: data.message || 'Login failed'
                };
            }
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                message: 'An error occurred during login'
            };
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
    };

    // Provide the context values to all children components
    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            loading,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};