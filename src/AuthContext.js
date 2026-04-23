// AuthContext.js
import React, { createContext, useEffect, useState } from 'react';
import { BASE_URL } from './constants';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [user, setUser] = useState(() => {
        const userString = localStorage.getItem('user');
        return userString ? JSON.parse(userString) : null;
        // return  null;
    });

    const [currency, setCurrency] = useState(() => {
        const storedCurrency = localStorage.getItem('currency');
        if (storedCurrency) {
            return storedCurrency;
        } else {
            const defaultCurrency = 'AED';
            localStorage.setItem('currency', defaultCurrency);
            return defaultCurrency;
        }
    });

    // New state for the exchange rate
    const [exchangeRate, setExchangeRate] = useState(1);

    const updateCurrency = (newCurrency) => {
        setCurrency(newCurrency);
        localStorage.setItem('currency', newCurrency);
    };

    // Fetch the conversion rate from the API whenever currency changes
    useEffect(() => {
        // Hit the endpoint: /conversion-c/{currency}
        fetch(`${BASE_URL}/api/v1/conversion-c/${currency}`)
            .then((res) => res.json())
            .then((data) => {
                // Assuming the JSON response is in the format: { currency: "USD", exchange_rate: 0.27 }
                if (data && data.exchange_rate) {
                    setExchangeRate(data.exchange_rate);
                } else {
                    setExchangeRate(1);
                }
            })
            .catch((error) => {
                console.error('Error fetching conversion rate:', error);
                setExchangeRate(1);
            });
    }, [currency]);

    const login = (userData, token, expires_at) => {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        localStorage.setItem('expires_at', expires_at);
        setIsLoggedIn(true);
        setUser(userData);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('expires_at');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout, setUser, currency, updateCurrency, exchangeRate }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
