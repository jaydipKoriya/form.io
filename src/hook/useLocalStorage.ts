import { useEffect, useState } from "react";


export const useLocalStorage = <T,>(key: string, initialValue: T) => {
    const [value, setValue] = useState<T>(() => {

        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;

    });

    useEffect(() => {

        window.localStorage.setItem(key, JSON.stringify(value));

    }, [key, value]);

    const setStorValue = (val: T) => {

        setValue(val);

    };

    return [value, setStorValue] as const;
};

export default useLocalStorage


