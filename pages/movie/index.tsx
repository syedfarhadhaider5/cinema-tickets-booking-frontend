import {useSelector} from "react-redux";
import AddMovie from "@/pages/components/AddMovie";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";


const Index = () => {
    const ToggleTheme1 = useSelector((state: any) => state.ToggleTheme.theme);
    const [userLogin, setUserLogin] = useState<any>();
    const router = useRouter();

    const LoginTokenAvailable: any =
        typeof window !== "undefined" && localStorage.getItem("bookmeLoginToken");
    useEffect(() => {
        if (LoginTokenAvailable) {
            setUserLogin(JSON.parse(LoginTokenAvailable));
        }
        // if(userLogin && userLogin?.type !== "admin"){
        //     router.push('/app')
        // }else{
        //     router.push('/mov')
        // }
    }, [LoginTokenAvailable,router]);
    return(
        <>
            <AddMovie />
        </>
    )
}

export default Index