import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';
import {Snakebar} from "../../utils/notistack"
//    toast.success('This is a success message');

const api_token = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
};

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
interface LoginPayload {
    loginDetail: { email: string; password: string };
    router: any;
}
export const LoginAuthFunc = createAsyncThunk("LoginAuth/initialize",
    async (props: LoginPayload, { dispatch }) => {
        const { loginDetail, router } = props;

        const loginData = {
            method: "post",
            url: `${baseUrl}/login`,
            data: loginDetail,
        };
        try {
            const response = await axios(loginData)
            if(response.status === 200){
                if(response?.data?.user?.type === "admin"){
                    router.push("/admin");
                    localStorage.setItem(
                        "bookmeLoginToken",
                        JSON.stringify(response?.data?.user)
                    );
                    router.push("/admin");
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
            console.log(error)
            if(error.response.status === 401){
                Snakebar.error(error.response.data.message)
            }

        }
    });
export const resetState = createAction("LoginCredential/resetState");

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
const LoginCredential: any = createSlice({
    name: "LoginCredential",
    initialState: initialState,
    reducers: {
        resetState: (state) => {
            return initialState;
        },
    },
    extraReducers(builder) {
        // login
        builder.addCase(LoginAuthFunc.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(LoginAuthFunc.fulfilled, (state, action) => {
                if (action.payload) {
                    // console.log({ logindataaaaaaaaaa: action.payload });
                    state.initialize = action.payload;
                    state.loading = false;
                    // state.AuthTrue = action.payload?.FA === 1 ? true : false;
                    state.error = null;
                }
            })
            .addCase(LoginAuthFunc.rejected, (state) => {
                state.loading = false;
                state.error = null;
            })
    }

})

export default LoginCredential.reducer;
