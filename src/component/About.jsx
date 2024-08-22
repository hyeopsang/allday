import { useState, useEffect } from "react";

export default function About({ onClose, Text }) {
    const [aboutText, setAboutTxt] = useState('');

    useEffect(() => {
        Text(aboutText);
    }, [aboutText, Text]);

    const handleChange = (e) => {
        setAboutTxt(e.target.value);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="w-[500px] h-[300px] bg-white rounded shadow-lg flex flex-col p-4">
                <p className="text-[15px] font-normal">상점소개</p>
                <textarea
                    className="border p-2 mt-2 flex-1"
                    placeholder="상점에 대해 소개해주세요"
                    value={aboutText}
                    onChange={handleChange}
                />
                <div className="mt-4 flex justify-end">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onClose}>완료</button>
                </div>
            </div>
        </div>
    );
}
