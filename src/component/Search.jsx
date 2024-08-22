import { useState } from "react";

export default function Search ({ onSearch }) {
    const [keyword, setKeyword] = useState('');
    
    const onChangeSearch = (e) => {
        setKeyword(e.target.value);
    }
    
    const searchHandler = () => {
        onSearch(keyword);
    }
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchHandler();
        }
    }
    
    return (
        <div className="w-full max-w-5xl flex justify-between items-center mx-auto">
            <div className="h-[60px] w-[70%] mx-[15%] border-[rgb(39,92,179)] border-[3px] rounded-full z-10 flex justify-center items-center hover:shadow-[0_3px_5px_rgba(100,150,200,0.3)]">
                <input
                    className="w-[80%] mx-[2%] bg-white text-black placeholder-gray-500 outline-none text-xl"
                    type="text"
                    value={keyword}
                    onChange={onChangeSearch}
                    onKeyPress={handleKeyPress}
                />
                <div className="w-[2%] mx-[1.5%]">
                {keyword === "" ? '' : 
                    <img className="w-full h-auto cursor-pointer" src="/images/delete.png" onClick={() => setKeyword('')} />
                }
                </div>
                <div className="w-[6%] mx-[1.5%]">
                    <img className="w-full h-auto cursor-pointer" src="/images/search.png" onClick={searchHandler} />
                </div>
            </div>
        </div>
    )
}
