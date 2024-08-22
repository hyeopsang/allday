
export default function Banner() {
    return (
      <div className="w-full max-w-5xl pt-[60px] flex relative mx-auto">
        <div className="w-[30%] overflow-hidden flex justify-center items-center text-end">
          <p className="font-[800] text-4xl leading-normal">
            언제나 열려있는<br/>중고마켓
          </p>
        </div>
        <div className="w-[40%]">
          <img className="w-full h-auto" style={{ filter: 'drop-shadow(12px 12px 0px rgba(0, 0, 0, 1))' }} src="/images/banner.png" alt="Banner" />
        </div>
        <div className="w-[30%] overflow-hidden flex justify-center items-center">
          <p className="text-8xl font-[800] text-[#275CB3]">allday</p>
        </div>
      </div>
    );
  }
  