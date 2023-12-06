import AddMovieSecondStepUpdate from "@/pages/components/AddMovieSecondStepUpdate";
import React, {useEffect} from "react";
import {useAppDispatch} from "@/store";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {Box, Button, Grid, Typography} from "@mui/material";
import {GetMovies} from "@/store/reducers/movieReducer";
import {GetSingleSlot, GetSingleTimeSlot} from "@/store/reducers/TimeslotReducer";

const index = () =>{
    const GetSingleTimeSlotData = useSelector((state: any) => state.TimeslotReducer.GetSingleTimeSlotByIdData);
    const GetAllMovies = useSelector((state: any) => state.MovieManager.GetMovieData);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { id } = router.query;
    const [userLogin, setUserLogin] = React.useState<any>();

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
    useEffect(() =>{
        dispatch(GetSingleTimeSlot({id}))
    },[dispatch])
    return(
        <>
            <Grid container   style={{marginTop: 40 }}>
                <Grid item xs={12} sm={12} md={2}>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Typography variant="h6" style={{marginTop: 10,marginBottom: 10}}>Update move time slot</Typography>
                    <AddMovieSecondStepUpdate GetSingleTimeSlotData={GetSingleTimeSlotData}  slotid={id}/>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                </Grid>
            </Grid>
        </>
    )
}

export default index