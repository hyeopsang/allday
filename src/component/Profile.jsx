import { useState } from "react";
import About from "./About";

export default function Profile() {
    const [fileImg, setFileImg] = useState("");
    const [about, setAbout] = useState(false);
    const [aboutTxt, setAboutTxt] = useState("");

    const onChangeImg = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFileImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAboutClose = () => {
        setAbout(false);
    };

    const updateAboutText = (text) => {
        setAboutTxt(text);
    };

    return (
        <div className="w-full h-[300px] mt-[90px] bg-white flex">
            <div className="w-[300px] aspect-square rounded-full overflow-hidden flex justify-center items-center relative">
                <div className="absolute w-full aspect-square bg-transparent hover:bg-black/30 flex justify-center items-center group/profile">
                    <label
                        htmlFor="input-file"
                        className="cursor-pointer px-6 py-3 text-transparent group-hover/profile:text-white font-[800]"
                    >
                        프로필 변경
                    </label>
                    <input
                        type="file"
                        id="input-file"
                        style={{ display: "none" }}
                        onChange={onChangeImg}
                    />
                </div>
                {fileImg && <img className="w-full h-auto" src={fileImg} alt="Profile" />}
            </div>
            <div className="p-[30px]">
                <p className="font-[800] text-[24px]">어미새상점</p>
                <div className="mt-[30px]">
                    <p className="text-[15px] text-black font-[800]">상점소개 <span className="text-black px-[10px] font-normal cursor-pointer hover:underline text-[14px]" onClick={() => setAbout(true)}>편집</span></p>
                    <p className="text-[15px] text-[#CCC] mt-[30px] relative" >
                        {aboutTxt === "" ? '상점을 소개해주세요' : aboutTxt}
                    </p>
                    {about && <About onClose={handleAboutClose} Text={updateAboutText} />}
                </div>
            </div>
        </div>
    );
}
