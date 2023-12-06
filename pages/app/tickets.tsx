import { Box, Grid, IconButton, Paper, Skeleton, Typography } from "@mui/material"
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from "next/link";
import { useEffect, useState } from "react";
import { GetUserTickets } from "@/store/reducers/TicketReducer";
import { useAppDispatch } from "@/store";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Print } from "@mui/icons-material";

const Index = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [userLogin, setUserLogin] = useState<any>();
    const getUserTickets = useSelector((state: any) => state.TicketManager.GetUserTicketsData);

    const LoginTokenAvailable: any =
        typeof window !== "undefined" && localStorage.getItem("bookmeLoginToken");
    useEffect(() => {
        if (LoginTokenAvailable) {
            setUserLogin(JSON.parse(LoginTokenAvailable));
        }
    }, [LoginTokenAvailable, router]);
    useEffect(() => {
        const id = userLogin?.id
        dispatch(GetUserTickets({ id }))
    }, [dispatch, userLogin])
    return (
        <>
            <Grid container style={{ marginTop: 40 }} spacing={2}>
                <Grid item xs={12} sm={12} md={8}>
                    {
                        getUserTickets?.GetUserTicketloading ?
                            <>
                                <Skeleton variant="rectangular" height={40} />
                                <Skeleton variant="rectangular" height={40} />
                                <Skeleton variant="rectangular" height={40} />
                                <Skeleton variant="rectangular" height={40} />
                                <Skeleton variant="rectangular" height={40} />
                                <Skeleton variant="rectangular" height={40} />
                            </>
                            :
                            getUserTickets?.tickets?.map((ticket, index) => (
                                <>
                                    <Paper elevation={3} sx={{ my: 1, py: 1, px: 2 }}>
                                        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                            <Box display={'flex'} flexDirection={'column'}>
                                                <Typography variant="subtitle"> {++index+   `.` + ` `} {ticket.movie.movie_name}</Typography>
                                                <Box display={'flex'} justifyContent={'space-between'} >
                                                    <Typography variant="subtitle2" color={'primary'}>Booking Date</Typography>
                                                    <Typography variant="subtitle2" color={'primary'}>{ticket?.booking_date}</Typography>
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Link href={`${process.env.NEXT_PUBLIC_API_URL}/get-user-ticket/${ticket.id}`} target="_blank">
                                                    <IconButton>
                                                        <Print color="primary" />
                                                    </IconButton>
                                                </Link>
                                            </Box>
                                        </Box>
                                    </Paper>
                                </>
                            ))
                    }
                </Grid>
                <Grid item xs={12} sm={12} md={4}></Grid>
            </Grid>
        </>
    )
}

export default Index