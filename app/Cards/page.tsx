import Link from "next/link"
interface CardsProps{ 
    message: string;
    description: string;
    instructions: string; 
    credentials: string;
    options: string;
    checkin: string;
}
export default function Cards({ message, description, instructions, credentials, options, checkin}: CardsProps){
    return(
        <div className="flex justify-center items-center min-h-screen absolute inset-0 ">
            <div className=" w-520 h-524 top-250 left-460 rounded-lg border border-gray-300 absolute shadow-xl p-16 bg-white">
                <div className="w-[328px] h-[321px] top-[365px] left-[556px] gap-[48px]">
                    <h1 className="font-roboto font-medium text-2xl leading-tight text-center">{message}</h1>
                    <p className="font-open-sans font-normal text-base leading-custom-21.79 text-center text-secondary-heading-color">{description}</p>
                    <br />
                    <br />
                    <p className="font-open-sans font-normal text-base leading-custom-21.79 text-center text-secondary-heading-color">{instructions}</p>
                    <br />
                    <div className="flex justify-center items-center">
                        
                        <Link className="flex items-center w-[277px] h-[56px] rounded-[8px] p-[16px] pt-[16px] pr-[32px] pb-[16px] pl-[32px] gap-[16px] bg-dark-blue text-white text-center whitespace-nowrap" href="">
                        <img src="/google-logo.png" className="w-8 h-8 mr-2" alt="google-login"/>
                            <span>{credentials}</span>
                        </Link>
                    </div>

                    <br /><br />
                    <p className="font-open-sans font-normal text-base leading-custom-21.79 text-center text-secondary-heading-color">{options}
                        <span>
                            <Link className="font-open-sans font-bold text-20 leading-27.24 text-dark-blue text-center" 
                            href={checkin === "Login" ? "/Auth/login" : "/Auth/signup" }>
                                {checkin}
                            </Link>
                        </span>
                    </p>
                    <br />
                    <div className="text-secondary-heading-color font-roboto font-medium text-[12px] leading-[14.06px] text-center underline">
                        <Link className="" href="">Terms and Conditions</Link><div className="w-[2px] h-[12px] bg-current inline-block bg-dark-blue mx-3"></div><Link href="">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}