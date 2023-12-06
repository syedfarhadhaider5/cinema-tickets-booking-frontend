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
interface ThemePayload {
    ThemePayloadDetail: { themeValue: boolean };
}
export const ToggleThemeFunc = createAsyncThunk("ToggleTheme/initialize",
    async (props: ThemePayload, { dispatch }) => {
        const { ThemePayloadDetail } = props;
        try {
            // localStorage.setItem(
            //     "bookmeLoginToken",
            //     JSON.stringify(response?.data?.user)
            // );
            // Snakebar.success(response.data.message)
            localStorage.setItem('toggleTheme', JSON.stringify(ThemePayloadDetail));
            return ThemePayloadDetail;

        }catch (error: any){
            console.log(error)
        }
    });
interface initialStateType {
    theme: boolean;
    loading: boolean;
    error: string | null;
}
const initialState: initialStateType = {
    theme: false,
    loading: false,
    error: null,
}
const ToggleTheme: any = createSlice({
    name: "ToggleTheme",
    initialState: initialState,
    reducers: {
    },
    extraReducers(builder) {
        // login
        builder.addCase(ToggleThemeFunc.pending, (state) => {
            state.theme = false
            state.loading = true;
            state.error = null;
        }).addCase(ToggleThemeFunc.fulfilled, (state, action) => {
            console.log(action.payload)
            if (action.payload) {
                    state.theme = action.payload;
                    state.loading = false;
                    state.error = null;
                }
            })
            .addCase(ToggleThemeFunc.rejected, (state,action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }

})

export default ToggleTheme.reducer;