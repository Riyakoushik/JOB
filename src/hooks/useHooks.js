import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage(key, defaultValue) {
    const [value, setValue] = useState(() => {
        try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : defaultValue; }
        catch { return defaultValue; }
    });
    useEffect(() => { localStorage.setItem(key, JSON.stringify(value)); }, [key, value]);
    return [value, setValue];
}

export function useDarkMode() {
    const [dark, setDark] = useState(() => {
        const saved = localStorage.getItem('jh_theme');
        return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });
    useEffect(() => {
        document.documentElement.classList.toggle('dark', dark);
        localStorage.setItem('jh_theme', dark ? 'dark' : 'light');
    }, [dark]);
    return [dark, setDark];
}

export function useDebounce(value, delay = 300) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => { const t = setTimeout(() => setDebounced(value), delay); return () => clearTimeout(t); }, [value, delay]);
    return debounced;
}
