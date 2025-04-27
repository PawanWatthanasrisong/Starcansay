import GoogleSignInButton from "@/components/ui/GoogleSignInButton";
import Image from "next/image";
export default function Home() {
  return (
    <div className="w-full h-[calc(100vh-49px)] flex flex-col justify-center items-center bg-starcansayblue">
      <div className="flex flex-col items-center bg-white rounded-3xl px-7 py-10 w-fit md:w-[553px] lg:w-[746px] mx-5">
        <Image src="/images/sticker-starcansay-web-29-3.png" alt="starcansay-logo" className="w-[183px] md:w-[253px] max-h-[130px] md:max-h-[179px]" width={100} height={179}/>
        <div className="text-5xl font-bold font-body mt-5 flex flex-col items-center w-full">
          <p className="text-starcansayblue font-starcansay text-5xl md:text-6xl text-center">รับกราฟชีวิต</p>
          <p className="text-starcansaypink font-starcansay text-6xl md:text-8xl text-center">100 Years</p>
        </div>
        <div className="mt-5 w-full h-full flex flex-col items-center justify-center">
          <GoogleSignInButton className="text-starcansayblue font-thai text-[16px] md:text-[24px] font-semibold w-[275px] h-[60px] md:w-[449px] md:h-[87px]">
            <Image src="/images/GGLogo.png" alt="starcansay-logo" className="w-[24px] md:w-[32px] mr-2" width={24} height={24}/>
            Log in ผ่าน GMAIL
          </GoogleSignInButton>
        </div>
        </div>
    </div>
  );
}
