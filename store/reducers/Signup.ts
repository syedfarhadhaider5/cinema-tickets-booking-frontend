import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';
import {Snakebar} from "../../utils/notistack"
import {LoginAuthFunc} from "@/store/reducers/LoginAuth";
//    toast.success('This is a success message');

const api_token = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
};

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
interface SignupPayload {
    SignupDetail: { name: string,email: string; password: string };
    router: any;
}
export const RegisterUserFunc = createAsyncThunk("Signup/initialize",
    async (props: SignupPayload, { dispatch }) => {
        const { SignupDetail, router } = props;

        const SignupData = {
            method: "post",
            url: `${baseUrl}/register`,
            data: SignupDetail,
        };
        try {
            const response = await axios(SignupData)
            if(response.status === 201){
                if(response?.data?.user?.type === "admin"){
                    localStorage.setItem(
                        "bookmeLoginToken",
                        JSON.stringify(response?.data?.user)
                    );
                    router.push("/");
                }else if(response?.data?.user?.type === "normal"){
                    localStorage.setItem(
                        "bookmeLoginToken",
                        JSON.stringify(response?.data?.user)
                    );
                    router.push("/app");
                }
                Snakebar.success(response.data.message)
            }
            // console.log(response)
        }catch (error: any){
            if(error.response.status === 401){
                Snakebar.error(error?.response?.data?.message)
            }
            if(error.response.status === 422){
                Snakebar.error(error?.response?.data?.email[0])
            }
            console.log(error)
        }
    });
interface initialStateType {
    initialize: [];
    loading: boolean;
    error: string | null;
}
const initialState: initialStateType = {
    initialize: [],
    loading: false,
    error: null,
}
const Signup: any = createSlice({
    name: "Signup",
    initialState: initialState,
    reducers: {
    },
    extraReducers(builder) {
        // login
        builder.addCase(RegisterUserFunc.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(RegisterUserFunc.fulfilled, (state, action) => {
                if (action.payload) {
                    console.log({ logindataaaaaaaaaa: action.payload });
                    state.initialize = action.payload;
                    state.loading = false;
                    // state.AuthTrue = action.payload?.FA === 1 ? true : false;
                    state.error = null;
                }
            })
            .addCase(RegisterUserFunc.rejected, (state) => {
                state.loading = false;
                state.error = null;
            })
    }

})

export default Signup.reducer;