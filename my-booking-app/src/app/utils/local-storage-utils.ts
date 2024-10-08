import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageUtils {
    constructor() { }

    static setItem(key: string, value: any): void {
        if (typeof window !== 'undefined') {
            const stringValue = JSON.stringify(value);
            localStorage.setItem(key, stringValue);
        } 
    }
    
    static getItem<T>(key: string): T | null {
        if (typeof window !== 'undefined') {
            const storedValue = localStorage.getItem(key);
            try {
                return storedValue ? JSON.parse(storedValue) as T : null;
            } catch (error) {
                console.error('Error parsing item from local storage:', error);
                return null;
            }
        }
        return null;
    }

    static removeItem(key: string): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(key);
        }
    }

    static clear(): void {
        if (typeof window !== 'undefined') {
            localStorage.clear();
        }
    }

    static hasKey(key: string): boolean {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(key) !== null;
        }
        return false;
    }




}

