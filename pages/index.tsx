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
import AdminDashboard from "@/pages/components/AdminDashboard";

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
      router.push('/app')
    }else{
      router.push('/')
    }
  }, [LoginTokenAvailable,router,userLogin]);

  return (
    <>
      <AdminDashboard/>
    </>
  )
}
