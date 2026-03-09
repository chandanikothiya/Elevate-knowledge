import { createContext, useReducer } from 'react'
import { ThemeReducer } from './Reducer/Themereducer';
import { TOGGLE_THEME } from './ActionType';

const initialState = {
    theme: 'ligth'
}

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    const [state, dispatch] = useReducer(ThemeReducer, initialState);

    const toggleTheme = (val) => {
        dispatch({ type: TOGGLE_THEME, payload: val === 'ligth' ? 'dark' : 'ligth' })
    }


    return (
        <ThemeContext.Provider
            value={{ ...state, toggleTheme }}
        >
            {children}
        </ThemeContext.Provider>
    )

}