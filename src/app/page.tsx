import GoogleSignInButton from "@/components/ui/GoogleSignInButton";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-starcansayblue">
      <img src="/images/starcansaylogo-31.png" width={500}/>
      <div className="text-5xl font-bold font-body text-white mt-10">
        <p>รับกราฟ 100 ปี</p>
      </div>
      <div className="mt-20 w-full h-full flex justify-center">
        <GoogleSignInButton>
            Sign in with google
        </GoogleSignInButton>
      </div>
      <p className="text-2xl mt-5 font-bold text-starcansaypink">
          Sign in to your account
      </p>
    </div>
  );
}
