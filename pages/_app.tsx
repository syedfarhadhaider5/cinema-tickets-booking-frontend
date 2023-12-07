import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider, useTheme } from '@mui/material';
import theme from "../mui-theme";
import defaultTheme from "../mui-default-theme"
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from "react";
import darkTheme from "@/mui-theme";
import Navigation from "@/pages/components/Navigation";
import { ToastContainer } from 'react-toastify';
import { Provider, useSelector } from "react-redux";
import { store } from "@/store";
import Head from "next/head";
import { SnackbarProvider } from "notistack";
import { SnackbarUtilsConfigurator } from "@/utils/notistack";
import * as React from "react";
import Login from "@/pages/components/Login";
import { useRouter } from "next/router";
import Register from "@/pages/components/Register";
import Container from '@mui/material/Container';

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter()
    const [toggleValue, setToggleValue] = useState(false);
    const [userLogin, setUserLogin] = React.useState<any>();

    const condition = router?.asPath.split("/")?.includes("register") ? (
        <Register />
    ) : (
        <Login />
    );
    const LoginTokenAvailable: any =
        typeof window !== "undefined" && localStorage.getItem("bookmeLoginToken");
    React.useEffect(() => {
        if (LoginTokenAvailable) {
            setUserLogin(JSON.parse(LoginTokenAvailable));
        }
    }, [LoginTokenAvailable, router]);
    // change theme
    useEffect(() => {
        setToggleValue(JSON.parse(localStorage.getItem('toggleTheme')))
    }, []);

    return (
        <ThemeProvider theme={toggleValue ? defaultTheme : darkTheme}>
            <Provider store={store}>

                <CssBaseline />
                <Head>
                    <title>Book me</title>
                </Head>
                <SnackbarProvider
                    maxSnack={6}
                    anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                >
                    <SnackbarUtilsConfigurator />
                    {
                        userLogin?.access_token && LoginTokenAvailable ? (
                            <>
                                <Navigation />
                                <Container>
                                    <Component {...pageProps} />
                                </Container>
                            </>
                        ) : (
                            <>
                                {condition}
                            </>
                        )
                    }
                </SnackbarProvider>
            </Provider>
        </ThemeProvider>
    )
}
