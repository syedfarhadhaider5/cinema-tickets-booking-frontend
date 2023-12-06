import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
    createAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { Snakebar } from "../../utils/notistack";
import {PostAddMovie} from "@/store/reducers/movieReducer";


const baseUrl = process.env.NEXT_PUBLIC_API_URL;

interface BookMovieSeatPayload {
    BookMovieSeatDetail: { ticket_type: string,movie_id: string,time_slot_id: string,user_id: string; seat_number: string,cnic: string,	sir_name: string,full_name: string,contact_number: string,contact_email: string,booking_date: string };

}
export const BookMovieSeat = createAsyncThunk(
    "BookMovieSeat/initialize",
    async (props: BookMovieSeatPayload) => {
        const { BookMovieSeatDetail } = props;
        const tl = new FormData();
        tl.append('movie_id',BookMovieSeatDetail.movie_id)
        tl.append('booking_date',BookMovieSeatDetail.booking_date)
        tl.append('time_slot_id',BookMovieSeatDetail.time_slot_id)
        tl.append('user_id',BookMovieSeatDetail.user_id)
        tl.append('seat_number',BookMovieSeatDetail.seat_number)
        tl.append('cnic',BookMovieSeatDetail.cnic)
        tl.append('sir_name',BookMovieSeatDetail.sir_name)
        tl.append('full_name',BookMovieSeatDetail.full_name)
        tl.append('contact_number',BookMovieSeatDetail.contact_number)
        tl.append('contact_email',BookMovieSeatDetail.contact_email)
        tl.append('ticket_type',BookMovieSeatDetail.ticket_type)

        const payloadDataUp = {
            method: "post",
            url: `${baseUrl}/ticket/book-ticket`,
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
            data: tl,
        };

        try {
            const response =  await axios(payloadDataUp)
            console.log(response)
            if(response.status == 201){
                Snakebar.success(response.data.message);
                // localStorage.removeItem('movie_id');
                return response?.status;
            }
        }catch (error: any){
            console.log(error)
            if(error.response.status === 422){
                Snakebar.error("Some thing went wrong")
                return error.response.status
            }else{
                Snakebar.error("Movie ticket book Error");
            }
        }
    });
    export const GetUserTickets = createAsyncThunk(
        "GetUserTickets/initialize",
        async (props: any) => {
            const {id} = props
            const payloadData = {
                method: "get",
                url: `${baseUrl}/get-user-tickets/${id}`,
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                },
            };
            try {
                const response =  await axios(payloadData)
                if(response.status == 200){
                    Snakebar.success("Get tickets successfully");
                    return response?.data?.userTickets;
                }
            }catch (error: any){
                console.log(error)
                Snakebar.error("Get tickets  error");
    
            }
        });

const initialState = {
    AddMovieSeatLoading: false,
    AddMovieSeat: [],
    error: null, 

    GetUserTicketLoading: false,
    GetUserTicketsData: [],
    errors: null,
}
const TicketManager: any = createSlice({
    name: "TicketManager",
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
       // Post movie
        builder.addCase(BookMovieSeat.pending, (state) => {
            state.AddMovieSeatLoading = true;
            state.error = null;
        }).addCase(BookMovieSeat.fulfilled, (state, action) => {
            state.AddMovieSeatLoading = false;
            state.AddMovieSeat = action.payload;
            state.error = null;
        }).addCase(BookMovieSeat.rejected, (state, action) => {
            state.AddMovieSeatLoading = false;
            state.error = action.error; // You can customize the error handling here
        }).addCase(GetUserTickets.pending, (state) => {
            state.GetUserTicketLoading = true;
            state.error = null;
        }).addCase(GetUserTickets.fulfilled, (state, action) => {
            state.GetUserTicketLoading = false;
            state.GetUserTicketsData = action.payload;
            state.errors= null;
        }).addCase(GetUserTickets.rejected, (state, action) => {
            state.GetUserTicketLoading = false;
            state.errors = action.error; // You can customize the error handling here
        })
    }
})

export default TicketManager.reducer