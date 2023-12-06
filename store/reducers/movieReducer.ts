import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
    createAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { Snakebar } from "../../utils/notistack";


const baseUrl = process.env.NEXT_PUBLIC_API_URL;
interface AddMoviePayload {
    AddMovieDetail: { movie_name: string,movie_banner: string; director_name: string,cenema_name: string,release_date: string,details: string,duration: string,location_name: string,movie_type: string };
    router: any;
}
interface UpdateMoviePayload {
    UpdateMovieDetail: { movie_name: string,movie_banner: string; director_name: string,cenema_name: string,release_date: string,details: string,duration: string,location_name: string,movie_type: string };
}
//MovieId
export const PostAddMovie = createAsyncThunk(
    "PostAddVehcile/initialize",
    async (props: AddMoviePayload) => {
        const { AddMovieDetail } = props;

        const payloadData = {
            method: "post",
            url: `${baseUrl}/admin/movie/create`,
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                "Content-Type": "multipart/form-data",
            },
            data: AddMovieDetail,
        };
        try {
           const response =  await axios(payloadData)
            console.log(response)
            if(response.status == 201){
                Snakebar.success("Movie Added Successfully");
                localStorage.setItem('movie_id', JSON.stringify(response?.data?.data?.id));
                return response?.data?.data;
            }
        }catch (error: any){
            console.log(error)
            if(error.response.status === 422){
                Snakebar.error(error?.response?.data?.movie_banner[0])
            }else{
                Snakebar.error("Add Vehicle Error");
            }
        }
    });

export const GetMovies = createAsyncThunk(
    "GetMovie/initialize",
    async () => {

        const payloadData = {
            method: "get",
            url: `${baseUrl}/admin/movies`,
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
        };
        try {
            const response =  await axios(payloadData)
            if(response.status == 200){
                Snakebar.success("Get Movies Successfully");
                return response?.data?.movies;
            }
        }catch (error: any){
            console.log(error)
            Snakebar.error("Get Movies Error");

        }
    });
export const GetMoviesByNormalUser = createAsyncThunk(
    "GetMoviesByNormalUser/initialize",
    async () => {

        const payloadData = {
            method: "get",
            url: `${baseUrl}/normal/movies`,
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
        };
        try {
            const response =  await axios(payloadData)
            if(response.status == 200){
                Snakebar.success("Get Movies Successfully");
                return response?.data?.movies;
            }
        }catch (error: any){
            console.log(error)
            Snakebar.error("Get Movies Error");

        }
    });
export const GetSingleMovie = createAsyncThunk(
    "GetSingleMovie/initialize",
    async (props: any) => {
        const {id} = props
        const payloadData = {
            method: "get",
            url: `${baseUrl}/admin/movie/${id}`,
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
        };
        try {
            const response =  await axios(payloadData)
            if(response.status == 200){
                Snakebar.success("Get Movie Successfully");
                return response?.data?.movie;
            }
        }catch (error: any){
            console.log(error)
            Snakebar.error("Get Single Movie Error");

        }
    });

export const GetSingleMovieByNormalUser = createAsyncThunk(
    "GetSingleMovieByNormalUser/initialize",
    async (props: any) => {
        const {mId} = props
        const payloadData = {
            method: "get",
            url: `${baseUrl}/normal/movie/${mId}`,
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
        };
        try {
            const response =  await axios(payloadData)
            if(response.status == 200){
               // Snakebar.success("Get Movie Successfully");
                return response?.data?.movie;
            }
        }catch (error: any){
            console.log(error)
            Snakebar.error("Get Single Movie Error");

        }
    });
export const DeleteSingleMovie = createAsyncThunk(
    "DeleteSingleMovie/initialize",
    async (props: any) => {
        const {id} = props
        const payloadData = {
            method: "delete",
            url: `${baseUrl}/admin/movie/remove/${id}`,
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
        };
        try {
            const response =  await axios(payloadData)
            if(response.status == 200){
                Snakebar.info("Delete Movie Successfully");
                return response?.data;
            }
        }catch (error: any){
            console.log(error)
            Snakebar.error("Get Single Movie Error");

        }
    });
export const UpdateMovie = createAsyncThunk(
    "UpdateMovie/initialize",
    async (props: UpdateMoviePayload) => {
       const {UpdateMovieDetail,id} = props
        const updatePayloadData = {
            method: "post",
            url: `${baseUrl}/admin/movie/update/${id}`,
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                "Content-Type": "multipart/form-data",
            },
            data: UpdateMovieDetail
        };
        try {
            const response =  await axios(updatePayloadData)
            console.log(response)
            if(response.status == 200){
                Snakebar.success(" Movie Update Successfully");
                return response?.data.data;
            }else {
                Snakebar.error(`Movie Update Failed with status: ${response.status}`);
            }
        }catch (error: any){
            console.error("Update Movie Error:", error.message);
            Snakebar.error("Update Movie Error");
            throw error; // rethrow the error for the
        }
    });
const initialState = {
    AddMovieLoading: false,
    AddMovieData: [],

    GetMovieLoading: false,
    GetMovieData: [],

    GetMoviesByNormalLoading: false,
    GetMoviesByNormalData: [],

    GetSingleMovieLoading: false,
    GetSingleMovieData: [],

    GetSingleMovieByNormalUserLoading: false,
    GetSingleMovieByNormalUserData: [],

    UpdateSingleMovieLoading: false,
    UpdateSingleMovieData: [],

    DeleteSingleMovieLoading: false,
    DeleteSingleMovieData: []

}
const MovieManager: any = createSlice({
    name: "movie",
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        // Post movie
        builder.addCase(PostAddMovie.pending, (state) => {
            state.AddMovieLoading = true;
            state.error = null;
        }).addCase(PostAddMovie.fulfilled, (state, action) => {
                state.AddMovieLoading = false;
                state.AddMovieData = action.payload;
                state.error = null;
            }).addCase(PostAddMovie.rejected, (state, action) => {
            state.AddMovieLoading = false;
            state.error = action.error; // You can customize the error handling here
        })
        // get movies
      .addCase(GetMovies.pending, (state) => {
            state.GetMovieLoading = true;
            state.error = null;
        }).addCase(GetMovies.fulfilled, (state, action) => {
            state.GetMovieLoading = false;
            state.GetMovieData = action.payload;
            state.error = null;
        }).addCase(GetMovies.rejected, (state, action) => {
            state.GetMovieLoading = false;
            state.error = action.error; // You can customize the error handling here
        })
        // get single movie
    .addCase(GetSingleMovie.pending, (state) => {
            state.GetSingleMovieLoading = true;
            state.error = null;
        }).addCase(GetSingleMovie.fulfilled, (state, action) => {
            state.GetSingleMovieLoading = false;
            state.GetSingleMovieData = action.payload;
            state.error = null;
        }).addCase(GetSingleMovie.rejected, (state, action) => {
            state.GetSingleMovieLoading = false;
            state.error = action.error; // You can customize the error handling here
        }).addCase(UpdateMovie.pending, (state) => {
            state.UpdateSingleMovieLoading = true;
            state.error = null;
        }).addCase(UpdateMovie.fulfilled, (state, action) => {
            state.UpdateSingleMovieLoading = false;
            state.UpdateSingleMovieData = action.payload;
            state.error = null;
        }).addCase(UpdateMovie.rejected, (state, action) => {
            state.UpdateSingleMovieLoading = false;
            state.error = action.error; // You can customize the error handling here
        }).addCase(DeleteSingleMovie.fulfilled, (state, action) => {
            state.DeleteSingleMovieLoading = false;
            state.DeleteSingleMovieData = action.payload;
            state.error = null;
        }).addCase(DeleteSingleMovie.rejected, (state, action) => {
            state.DeleteSingleMovieLoading = false;
            state.error = action.error; // You can customize the error handling here
        }).addCase(GetMoviesByNormalUser.fulfilled, (state, action) => {
            state.GetSingleMovieLoading = false;
            state.GetMoviesByNormalData = action.payload;
            state.error = null;
        }).addCase(GetMoviesByNormalUser.rejected, (state, action) => {
            state.GetSingleMovieLoading = false;
            state.error = action.error; // You can customize the error handling here
        }).addCase(GetSingleMovieByNormalUser.fulfilled, (state, action) => {
            state.GetSingleMovieByNormalUserLoading = false;
            state.GetSingleMovieByNormalUserData = action.payload;
            state.error = null;
        }).addCase(GetSingleMovieByNormalUser.rejected, (state, action) => {
            state.GetSingleMovieByNormalUserLoading = false;
            state.error = action.error; // You can customize the error handling here
        });
    }
})

export default MovieManager.reducer