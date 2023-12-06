import {useSelector} from "react-redux";
import AdminDashboard from "@/pages/components/AdminDashboard";


const Index = () => {
    const ToggleTheme1 = useSelector((state: any) => state.ToggleTheme.theme);

    return(
        <>
            <AdminDashboard />
        </>
    )
}

export default Index