import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import React, { ReactNode, useMemo } from "react";

import { getThemedComponents } from "../utils/theme";

export const ColorModeContext = React.createContext({});

/**
 * Main Layout component which wrapps around the whole app
 * @param param0
 * @returns
 */
export function AppGlobalStyles({ children }: { children: ReactNode }) {
    const theme = useMemo(() => {
        const themeCreate = createTheme({
            components: {
                MuiCssBaseline: {
                    styleOverrides: {
                        body: {
                            backgroundColor: "black",
                            fontFamily: "sans-serif",
                            color: `rgba(255, 255, 255, 0.87)`,
                            margin: 0,
                            padding: 0,
                        },
                    },
                },
            },
        });
        return deepmerge(themeCreate, getThemedComponents());
    }, []);

    return (
        <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
