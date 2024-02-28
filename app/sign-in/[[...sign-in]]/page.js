import { SignIn } from "@clerk/nextjs";
import Navbar from "@/app/Components/Navbar/Navbar";


export default function Page() {
    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center flex-col gap-10">
                <SignIn />
            </div>
        </>
    )
}