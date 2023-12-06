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
interface AddTimePayload {
    AddTimeSlotDetail: { time_slot: string,movie_id: string,movie_date: string; total_seat: string,premium_seat_available: number,general_seat_available: number,ticket_type: string };
    movieIds: any;
    timeOptions: any;
    movie_type: any
}
interface UpdateTimePayload {
    UpdateTimeSlotDetail: { time_slot: string,movie_id: string,movie_date: string; total_seat: string,premium_seat_available: number,general_seat_available: number,ticket_type: string };
    movieIdPr: any;
    timeOptionsSlot: any;
    movie_type: any
    SlotId: any
}
export const PostAddTimeSlot = createAsyncThunk(
    "PostAddTimeSlot/initialize",
    async (props: AddTimePayload,movie_id) => {
        const { AddTimeSlotDetail,timeOptionsSlot,ticket_type } = props;
        AddTimeSlotDetail.time_slot = timeOptionsSlot
        AddTimeSlotDetail.ticket_type = ticket_type
        const payloadData = {
            method: "post",
            url: `${baseUrl}/admin/timeslot/create`,
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
            data: AddTimeSlotDetail,
        };
        try {
            const response =  await axios(payloadData)
            console.log(response)
            if(response.status == 201){
                Snakebar.success("Time slot Added Successfully");
                localStorage.removeItem('movie_id');
                return response?.data;
            }
        }catch (error: any){
            console.log(error)
            if(error.response.status === 422){
                Snakebar.error(error?.response?.data?.error)
            }else{
                Snakebar.error("Add Time Slot Error");
            }
        }
    });

export const GetSingleSlot = createAsyncThunk(
    "GetSingleSlot/initialize",
    async (props: any) => {
        const {id} = props
        const payloadData = {
            method: "get",
            url: `${baseUrl}/admin/timeslot/${id}`,
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
        };
        try {
            const response =  await axios(payloadData)
            if(response.status == 200){
             //   Snakebar.success("Get TimeSlot Successfully");
                return response?.data?.timeSlots;
            }
        }catch (error: any){
            console.log(error)
            Snakebar.error("Get Single Time Slot Error");

        }
    });
export const GetSingleTimeSlot = createAsyncThunk(
    "GetSingleTimeSlot/initialize",
    async (props: any) => {
        const {id} = props
        const payloadData = {
            method: "get",
            url: `${baseUrl}/admin/get-single-time-slot/${id}`,
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
        };
        try {
            const response =  await axios(payloadData)
            if(response.status == 200){
                //   Snakebar.success("Get TimeSlot Successfully");
                return response?.data?.timeSlot;
            }
        }catch (error: any){
            console.log(error)
            Snakebar.error("Get Single Time Slot Error");

        }
    });
export const GetSingleTimeSlotByNormalUser = createAsyncThunk(
    "GetSingleTimeSlotByNormalUser/initialize",
    async (props: any) => {
        const {id} = props
        const payloadData = {
            method: "get",
            url: `${baseUrl}/get-single-time-slot/${id}`,
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
        };
        try {
            const response =  await axios(payloadData)
            if(response.status == 200){
                //   Snakebar.success("Get TimeSlot Successfully");
                return response?.data?.timeSlot;
            }
        }catch (error: any){
            console.log(error)
            Snakebar.error("Get Single Time Slot Error");

        }
    });
export const UpdateSingleTimeSlot = createAsyncThunk(
    "UpdateSingleTimeSlot/initialize",
    async (props: UpdateTimePayload) => {
        const { UpdateTimeSlotDetail,values,timeOptionsSlot,ticket_type,movieIdPr,SlotId } = props;
        const tl = new FormData();
        tl.append('time_slot',timeOptionsSlot)
        tl.append('ticket_type',ticket_type)
        tl.append('movie_date',values.movie_date)
        tl.append('total_seat',values.total_seat)
        tl.append('premium_seat_available',values.premium_seat_available)
        tl.append('general_seat_available',values.general_seat_available)
        // UpdateTimeSlotDetail.movie_id = movieIdPr
        // UpdateTimeSlotDetail.time_slot = timeOptionsSlot
        // UpdateTimeSlotDetail.ticket_type = ticket_type

        console.log(UpdateTimeSlotDetail)

        const payloadDataUp = {
            method: "post",
            url: `${baseUrl}/admin/timeslot/update/${SlotId}`,
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
            data: tl,
        };

        try {
            const response =  await axios(payloadDataUp)
            console.log(response)
            if(response.status == 200){
                Snakebar.success("Time slot Updated Successfully");
                // localStorage.removeItem('movie_id');
                return response?.data;
            }
        }catch (error: any){
            console.log(error)
            if(error.response.status === 422){
                Snakebar.error(error?.response?.data?.error)
            }else{
                Snakebar.error("Update Time Slot Error");
            }
        }
    });
const initialState = {
    AddTimeSlotLoading: false,
    AddTimeSlotData: [],

    GetSingleTimeSlotLoading: false,
    GetSingleTimeSlotData: [],

    UpdateSingleTimeSlotLoading: false,
    UpdateSingleTimeSlotData: [],

    GetSingleTimeSlotByIdLoading: false,
    GetSingleTimeSlotByIdData: [],

    GetSingleTimeSlotByIdNormalUserLoading: false,
    GetSingleTimeSlotByIdNormalUserData: [],
}
const TimeSlotManager: any = createSlice({
    name: "TimeSlotManager",
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        // Post movie
        builder.addCase(PostAddTimeSlot.pending, (state) => {
            state.AddTimeSlotLoading = true;
            state.error = null;
        }).addCase(PostAddTimeSlot.fulfilled, (state, action) => {
                state.AddTimeSlotLoading = false;
                state.AddTimeSlotData = action.payload;
                state.error = null;
        }).addCase(PostAddMovie.rejected, (state, action) => {
            state.AddTimeSlotLoading = false;
            state.error = action.error; // You can customize the error handling here
        }).addCase(GetSingleSlot.pending, (state) => {
            state.GetSingleTimeSlotLoading = true;
            state.error = null;
        }).addCase(GetSingleSlot.fulfilled, (state, action) => {
            state.GetSingleTimeSlotLoading = false;
            state.GetSingleTimeSlotData = action.payload;
            state.error = null;
        }).addCase(GetSingleSlot.rejected, (state, action) => {
            state.GetSingleTimeSlotLoading = false;
            state.error = action.error; // You can customize the error handling here
        }).addCase(UpdateSingleTimeSlot.pending, (state) => {
            state.UpdateSingleTimeSlotLoading = true;
            state.error = null;
        }).addCase(UpdateSingleTimeSlot.fulfilled, (state, action) => {
            state.UpdateSingleTimeSlotLoading = false;
            state.UpdateSingleTimeSlotData = action.payload;
            state.error = null;
        }).addCase(UpdateSingleTimeSlot.rejected, (state, action) => {
            state.UpdateSingleTimeSlotLoading = false;
            state.error = action.error;
        }).addCase(GetSingleTimeSlot.fulfilled, (state, action) => {
            state.GetSingleTimeSlotByIdLoading = false;
            state.GetSingleTimeSlotByIdData = action.payload;
            state.error = null;
        }).addCase(GetSingleTimeSlot.rejected, (state, action) => {
            state.GetSingleTimeSlotByIdLoading = false;
            state.error = action.error;
        }).addCase(GetSingleTimeSlotByNormalUser.pending, (state) => {
            state.GetSingleTimeSlotByIdNormalUserLoading = true;
            state.error = null;
        }).addCase(GetSingleTimeSlotByNormalUser.fulfilled, (state, action) => {
            state.GetSingleTimeSlotByIdNormalUserLoading = false;
            state.GetSingleTimeSlotByIdNormalUserData = action.payload;
            state.error = null;
        }).addCase(GetSingleTimeSlotByNormalUser.rejected, (state, action) => {
            state.GetSingleTimeSlotByIdNormalUserLoading = false;
            state.error = action.error;
        })
    }
})

export default TimeSlotManager.reducer