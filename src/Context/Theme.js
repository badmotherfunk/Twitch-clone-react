import { createContext, useEffect, useState } from "react"

const themes = {
    dark: {
        body: {
            backgroundColor: "#0e0e10",
            color: "#FFFFFF"
        },
        layout: {
            backgroundColor: "#18181b",
            color: "#FFFFFF"
        },
        sidebarLayout: {
            backgroundColor: "#1f1f23",
            color: "#FFFFFF"
        },
        userInfo: {
            backgroundColor: "#1f1f23",
        },
        title: {
            color: "#FFFFFF",
        },
        text: {
            color: "#adadb8",
        },
        button: {
            backgroundColor: "rgba(83,83,95,.38)",
            color: "#FFFFFF"
        },
        tags: {
            color: "#adadb8",
            backgroundColor: "rgba(83,83,95,.38)"
        },
        link: {
            color: "#bf94ff",
            borderBottom: "2px solid #bf94ff"
        },

    },
    light: {
        body: {
            backgroundColor: "#fafafa",
            color: "#000"
        },
        layout: {
            backgroundColor: "#FFF",
            color: "#000"
        },
        sidebarLayout : {
            backgroundColor: "#eeeeee",
            color : "#000"
        },
        userInfo: {
            backgroundColor: "#FFF",
        },
        title: {
            color: "#adadb8",
        },
        text: {
            color: "rgb(83 83 95)",
        },
        button: {
            backgroundColor: "#f1f1f1",
            color: "#000"
        },
        tags: {
            backgroundColor: "#e6e6e9",
            color: "#525151"
        },
        buttonHover: {
            backgroundColor: "black",
        },
        link: {
            color: "#6b2fc5",
            borderBottom: "2px solid #6b2fc5"
        },
    }
}

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [isDark, setIsDark] = useState(false)
    const theme = isDark ? themes.dark : themes.light

    const toggleTheme = () => {
        localStorage.setItem('isDark', JSON.stringify(!isDark))
        setIsDark(!isDark)
    }

    useEffect(() => {
        const isDark = localStorage.getItem('isDark') === "true"
        setIsDark(isDark)
    }, [])

    return (
        <ThemeContext.Provider value={[{theme, isDark}, toggleTheme]}>{children}</ThemeContext.Provider>
    )
}