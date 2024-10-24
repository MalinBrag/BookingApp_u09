import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageUtils {
    constructor() { }

    /**
     * Stringifies and item and sets it in local storage
     * @param key 
     * @param value 
     */
    static setItem(key: string, value: string): void {
        if (typeof window !== 'undefined') {
            const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
            localStorage.setItem(key, stringValue);
        } 
    }
    
    /**
     * Gets an item from local storage, parses it and returns it
     * @param key 
     * @returns an item from local storage
     */
    static getItem<T>(key: string): T | null {
        if (typeof window !== 'undefined') {
            const storedValue = localStorage.getItem(key);
            if (storedValue) {
                try {
                    if (storedValue.startsWith('{') || storedValue.startsWith('[')) {
                        return JSON.parse(storedValue) as T;
                    }
                    return storedValue as unknown as T;
                } catch (error) {
                    console.error('Error parsing item from local storage:', error);
                    return null;
                }
            }
        }
        return null;
    }

    /**
     * Removes an item from local storage
     * @param key 
     */
    static removeItem(key: string): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(key);
        }
    }

    /**
     * Clears all items from local storage
     */
    static clear(): void {
        if (typeof window !== 'undefined') {
            localStorage.clear();
        }
    }

}

