import Image from 'next/image'
import { Inter } from 'next/font/google'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Paper, ThemeProvider} from '@mui/material';
import darkTheme from '../mui-theme';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import * as React from "react";
import {useRouter} from "next/router";
import {useEffect} from "react";

export default function Home() {

  const [userLogin, setUserLogin] = React.useState<any>();
  const router = useRouter();
  const LoginTokenAvailable: any =
      typeof window !== "undefined" && localStorage.getItem("bookmeLoginToken");
    useEffect(() => {
    if (LoginTokenAvailable) {
      setUserLogin(JSON.parse(LoginTokenAvailable));
    }
    if(userLogin?.type === "normal"){
      router.push('/404')
    }
  }, [LoginTokenAvailable,router,userLogin]);

  return (
    <>
        {/*<Container>*/}
        {/*    <br/><br/><br/>*/}
        {/*    <Grid container spacing={2}>*/}
        {/*        <Grid item xs={12} sm={6} md={4} lg={4}>*/}
        {/*            /!* Content for the first column *!/*/}
        {/*            /!* You can place your component/content here *!/*/}
        {/*            <Box*/}
        {/*                sx={{*/}
        {/*                    display: 'flex',*/}
        {/*                    flexWrap: 'wrap',*/}
        {/*                    backgroundColor: '#ffffff',*/}
        {/*                    '& > :not(style)': {*/}
        {/*                        m: 1,*/}
        {/*                        width: 128,*/}
        {/*                        height: 128,*/}
        {/*                    },*/}
        {/*                }}*/}
        {/*            >*/}
        {/*                <Paper elevation={3} />*/}
        {/*            </Box>*/}
        {/*        </Grid>*/}
        {/*        <Grid item xs={12} sm={6} md={4} lg={4}>*/}
        {/*            /!* Content for the second column *!/*/}
        {/*            /!* You can place your component/content here *!/*/}
        {/*            <Box*/}
        {/*                sx={{*/}
        {/*                    display: 'flex',*/}
        {/*                    flexWrap: 'wrap',*/}
        {/*                    '& > :not(style)': {*/}
        {/*                        m: 1,*/}
        {/*                        width: 128,*/}
        {/*                        height: 128,*/}
        {/*                    },*/}
        {/*                    backgroundColor: '#ffffff',*/}

        {/*                }}*/}
        {/*            >*/}
        {/*                <Paper elevation={3} />*/}
        {/*            </Box>*/}
        {/*        </Grid>*/}
        {/*        <Grid item xs={12} sm={6} md={4} lg={4}>*/}
        {/*            /!* Content for the third column *!/*/}
        {/*            /!* You can place your component/content here *!/*/}
        {/*            <Box*/}
        {/*                sx={{*/}
        {/*                    display: 'flex',*/}
        {/*                    flexWrap: 'wrap',*/}
        {/*                    '& > :not(style)': {*/}
        {/*                        m: 1,*/}
        {/*                        width: 128,*/}
        {/*                        height: 128,*/}
        {/*                    },*/}
        {/*                    backgroundColor: '#ffffff',*/}

        {/*                }}*/}
        {/*            >*/}
        {/*                <Paper elevation={3} />*/}
        {/*            </Box>*/}
        {/*        </Grid>*/}
        {/*    </Grid>*/}
        {/*</Container>*/}
    </>
  )
}
