import { NavLink } from "react-router-dom";

export default function Side() {
    return (
        <div className="w-full h-fit pt-[30px]">
            <div className="w-full h-[50px] flex justify-left">
                <NavLink end className={({ isActive }) => isActive ? 'w-[20%] flex justify-center items-center border-r border-t border-l border-black pb-[1px] text-black' :'w-[20%] flex justify-center items-center border-x border-y pb-[1px] border-b-black text-[#CCC]'} to={'/profile/products'}><p>상품</p></NavLink>
                <NavLink  to={'/profile/like'} className={({ isActive }) => isActive ? 'w-[20%] flex justify-center items-center border-r border-t border-l border-black pb-[1px]  text-black' :'w-[20%] flex justify-center items-center border-b-black border-r border-y pl-[1px] pb-[1px] text-[#CCC]'}><p>찜 목록</p></NavLink>
                <NavLink  to={'/profile/preview'} className={({ isActive }) => isActive ? 'w-[20%] flex justify-center items-center border-r border-t border-l border-black pb-[1px]  text-black' :'w-[20%] flex justify-center items-center border-b-black border-r border-y pl-[1px] pb-[1px] text-[#CCC]'}><p>상점 후기</p></NavLink>
                <NavLink  to={'/profile/follow'} className={({ isActive }) => isActive ? 'w-[20%] flex justify-center items-center border-r border-t border-l border-black pb-[1px]  text-black' :'w-[20%] flex justify-center items-center border-b-black border-r border-y pl-[1px] pb-[1px] text-[#CCC]'}><p>팔로우</p></NavLink>
                <NavLink  to={'/profile/following'} className={({ isActive }) => isActive ? 'w-[20%] flex justify-center items-center border-r border-t border-l border-black pb-[1px]  text-black' :'w-[20%] flex justify-center items-center border-b-black border-r border-y pl-[1px] pb-[1px] text-[#CCC]'}><p>팔로잉</p></NavLink>
            </div>            
        </div>
    )
}
