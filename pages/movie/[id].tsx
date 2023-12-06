import {useSelector} from "react-redux";
import {useAppDispatch} from "@/store";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {GetMovies, GetSingleMovie} from "@/store/reducers/movieReducer";
import Stack from '@mui/material/Stack';
import {Delete, DeleteOutline, Update} from '@mui/icons-material';
import {Button, Stepper, Step, StepLabel, Typography, Grid, Box} from '@mui/material';
import AddMovieFirstStepUpdate from "@/pages/components/AddMovieFirstStepUpdate";
import {GetSingleSlot} from "@/store/reducers/TimeslotReducer";
import AddMovieSecondStepUpdate from "@/pages/components/AddMovieSecondStepUpdate";

const Index = () => {
    // const [movies,setMovies] = useState([]);
    const GetSingleMovieData = useSelector((state: any) => state.MovieManager.GetSingleMovieData);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { id } = router.query;
    const [movieIds, setMovieId] = useState(0);
    const [userLogin, setUserLogin] = React.useState<any>();

    useEffect(() =>{
        dispatch(GetSingleMovie({id}))
    },[dispatch])

    const LoginTokenAvailable: any =
        typeof window !== "undefined" && localStorage.getItem("bookmeLoginToken");
    useEffect(() => {
        if (LoginTokenAvailable) {
            setUserLogin(JSON.parse(LoginTokenAvailable));
        }
        // if(userLogin && userLogin?.type !== "admin"){
        //     router.push('/app')
        // }else{
        //     router.push('/')
        // }
    }, [LoginTokenAvailable,router]);
    return(
        <>
            <Grid container   style={{marginTop: 40 }}>
                <Grid item xs={12} sm={12} md={2}></Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Typography variant="h6" style={{marginTop: 15,marginBottom: 15}}>Update Movie</Typography>
                    <AddMovieFirstStepUpdate GetSingleMovieData={GetSingleMovieData} id={id} />
                </Grid>
                <Grid item xs={12} sm={12} md={4}></Grid>
            </Grid>
        </>
    )
}

export default Index