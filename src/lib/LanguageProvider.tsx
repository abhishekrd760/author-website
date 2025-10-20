'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { translations, type Language, type TranslationMap } from '@/i18n/translations'

type LanguageContextValue = {
    language: Language
    setLanguage: (language: Language) => void
    toggleLanguage: () => void
    dictionary: TranslationMap
    t: (key: string, replacements?: Record<string, string | number>) => string
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

const STORAGE_KEY = 'kazutoshi-language'

type LanguageProviderProps = {
    children: React.ReactNode
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
    const [language, setLanguageState] = useState<Language>('en')

    useEffect(() => {
        if (typeof window === 'undefined') {
            return
        }
        const storedLanguage = window.localStorage.getItem(STORAGE_KEY) as Language | null
        if (storedLanguage === 'en' || storedLanguage === 'ja') {
            setLanguageState(storedLanguage)
            document.documentElement.lang = storedLanguage
        }
    }, [])

    const setLanguage = (value: Language) => {
        setLanguageState(value)
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(STORAGE_KEY, value)
            document.documentElement.lang = value
        }
    }

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ja' : 'en')
    }

    const t = useCallback((key: string, replacements?: Record<string, string | number>) => {
        const template = translations[language][key] ?? key
        if (!replacements) {
            return template
        }
        return Object.keys(replacements).reduce((result, placeholder) => {
            const value = String(replacements[placeholder])
            return result
                .replace(new RegExp(`{{\s*${placeholder}\s*}}`, 'g'), value)
                .replace(new RegExp(`{\s*${placeholder}\s*}`, 'g'), value)
        }, template)
    }, [language])

    const value = useMemo<LanguageContextValue>(() => ({
        language,
        setLanguage,
        toggleLanguage,
        dictionary: translations[language],
        t
    }), [language, t])

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
