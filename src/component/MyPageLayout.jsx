import Header from "./Header";
import Side from "./Side";
import Profile from "./Profile";
import { Outlet } from "react-router-dom";

export default function MyPageLayout() {
    return (
        <>
        <Header/>
    <div className="w-screen flex justify-center items-center">
        <div className="w-full max-w-5xl flex flex-wrap mx-auto">
            <Profile/>
            <Side/>
            <Outlet/>
        </div>
    </div>
</>

    )
}
