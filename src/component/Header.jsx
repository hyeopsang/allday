import { Link } from "react-router-dom"

export default function Header () {
    return (
      <div className="fixed w-screen bg-white z-50">
        <div className="w-full h-[60px] max-w-5xl mx-auto bg-white flex justify-between items-center px-4 z-50 relative">
          <div className="w-[69px]">
            <Link to={'/'}>
            <img className="w-full h-auto cursor-pointer" src="/images/logo.png" alt="Logo"/>
            </Link>
          </div>
          <Link to={'/profile'}>
            <div className="flex justify-center items-center cursor-pointer">
            <p className="font-[800] text-[15px]">나의 상점</p>
            <div className="w-[24px] mx-[5px]"><img className="w-full h-auto" src="/images/store.png" /></div>
            </div>
            </Link>
          </div>
      </div>
    )
}
