import GoogleSignInButton from "@/components/ui/GoogleSignInButton";
import Image from "next/image";
export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-starcansayblue overflow-hidden">
      <div className="mt-20 md:mt-16 mb-10 flex flex-col items-center bg-white rounded-none sm:rounded-3xl px-5 py-10 w-full md:w-[553px] lg:w-[746px]">
        <Image src="/images/sticker-starcansay-web-29-3.png" alt="starcansay-logo" className="max-h-[179px]" width={253} height={179}/>
        <div className="text-5xl font-bold font-body mt-5 flex flex-col items-center w-full">
          <p className="text-starcansayblue font-starcansay text-[64px] text-center">รับกราฟชีวิต</p>
          <p className="text-starcansaypink font-starcansay text-[96px] text-center">100 Years</p>
        </div>
        <div className="mt-5 w-full h-full flex flex-col items-center justify-center">
          <GoogleSignInButton className="text-starcansayblue font-thai text-[16px] md:text-[24px] font-semibold w-[275px] h-[60px] md:w-[449px] md:h-[87px]">
            <Image src="/images/GGLogo.png" alt="starcansay-logo" className="w-[24px] md:w-[32px] mr-2" width={24} height={24}/>
            Log in ผ่าน GMAIL
          </GoogleSignInButton>
          <p className=" mt-5 text-base md:text-2xl text-starcansayblue underline font-thai text-[24px] font-normal">
            Log in เพื่อรับปฏิทิน
          </p>
        </div>
        </div>
    </div>
  );
}
