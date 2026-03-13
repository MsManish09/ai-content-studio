import { BsPersonCircle } from "react-icons/bs";
import { useSelector } from 'react-redux';
import NavBar from '../../components/NavBar.jsx'


export default function UserDetails() {

    const { user } = useSelector((state) => state.auth)

    return (
        <div className=" w-[100vw] h-[100vh] bg-(--color-primary) text-(--color-accent) font-bold text-[2.5rem] " >

            {/* header */}
            <NavBar />

            {/* main */}
            <div className=" flex flex-wrap p-6 w-full justify-evenly items-center gap-10 " >
                {/* user details */}
                <div className=" border-2 border-solid border-(--color-text-muted) flex flex-col justify-center items-center w-[350px] p-4 rounded-2xl bg-(--color-text-secondary) shadow-[0_0_25px_#6B7A90] "  >
                    {/* image  */}
                    <div className=" w-[90%] h-[250px] flex justify-center " >
                        <BsPersonCircle className=" w-full h-full " />
                    </div>

                    {/* detail */}
                    <div className=" p-4 text-[1.25rem]  w-full flex flex-col justify-start  " >

                        <h3>Name: {user.name}</h3>
                        <h3>email: {user.email} </h3>
                    </div>
                </div>


                {/* usage details */}
                <div>
                    <div className=" border-2 border-solid border-(--color-text-muted) flex flex-col justify-center items-center w-[350px] rounded-2xl bg-(--color-text-secondary) shadow-[0_0_25px_#6B7A90] "  >
                    {/* headline  */}
                    <div className=" bg-(--color-primary) w-full rounded-t-2xl text-[1.5rem] text-center p-2 text-(--color-accent-hover) " >
                        <h3>Account Details</h3>
                    </div>

                    {/* detail */}
                    <div className=" p-6 text-[1.25rem]  w-full flex flex-col justify-start  " >

                        <h3>Plan : {user.plan}</h3>
                        <h3>Usage Count : {user.usageCount} </h3>
                        <h3>Tokens Used Today : {user.tokensUsedToday}</h3>
                        <h3>Total Tokens Used : {user.totalTokensUsed}</h3>
                    </div>
                </div>
                </div>
            </div>

        </div>
    )

}