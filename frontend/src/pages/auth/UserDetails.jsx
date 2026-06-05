import { BsPersonCircle } from "react-icons/bs";
import { useSelector } from 'react-redux';
import NavBar from '../../components/NavBar.jsx'
import PlanUpgradeButton from '../../components/PlanUpgradeButton.jsx'


export default function UserDetails() {

    const { user } = useSelector((state) => state.auth)
    const plan = user?.plan
    console.log('User details: ', user)

    // date formatter.
    function formatDate(dateString) {
        const date = new Date(dateString);

        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0')
        const year = date.getUTCFullYear()

        return `${day}/${month}/${year}`
    }

    return (
        <div className="w-[100vw] min-h-screen bg-(--color-bg-primary) text-(--color-text-primary)">

            {/* header */}
            <NavBar />

            {/* main */}
            <div className="flex flex-wrap p-8 w-full justify-center items-start gap-10">

                {/* user details */}
                <div className="border border-(--color-border) flex flex-col justify-start items-start w-[380px] p-6 rounded-lg bg-(--color-bg-tertiary)">

                    {/* image  */}
                    <div className="w-full h-[180px] flex justify-center items-center text-(--color-text-muted) mb-4">
                        <BsPersonCircle className="w-[80px] h-[80px]" />
                    </div>

                    {/* detail */}
                    <div className="w-full flex flex-col gap-3 text-[0.95rem]">

                        <h3 className="flex justify-between border-b border-(--color-border) pb-2">
                            <span className="text-(--color-text-muted)">Name</span>
                            <span className="text-(--color-text-primary)">{user.name}</span>
                        </h3>

                        <h3 className="flex justify-between">
                            <span className="text-(--color-text-muted)">Email</span>
                            <span className="text-(--color-text-primary)">{user.email}</span>
                        </h3>

                    </div>
                </div>


                {/* pro plan details */}
                <div>
                    <div className="border border-(--color-border) flex flex-col justify-start items-start w-[380px] rounded-lg bg-(--color-bg-tertiary)">

                        {/* headline  */}
                        <div className="w-full text-[1rem] font-medium p-4 border-b border-(--color-border) text-(--color-text-primary)">
                            <h3>Account Details</h3>
                        </div>

                        {/* detail */}
                        <div className="p-5 w-full flex flex-col gap-3 text-[0.95rem]">

                            <h3 className="flex justify-between border-b border-(--color-border) pb-2  items-center  gap-2">
                                <span className="text-(--color-text-muted)">Plan</span>
                                <span className="text-(--color-text-primary) flex items-center justify-center gap-2 ">

                                    {user.plan}
                                    {/* pro upgrade button - visible only for free users */}
                                    {plan && plan.toLowerCase() === "free" && (
                                        <PlanUpgradeButton />
                                    )}

                                </span>
                            </h3>

                            <h3 className="flex justify-between border-b border-(--color-border) pb-2">
                                <span className="text-(--color-text-muted)">Usage Count</span>
                                <span className="text-(--color-text-primary)">{user.usageCount}</span>
                            </h3>

                            <h3 className="flex justify-between border-b border-(--color-border) pb-2">
                                <span className="text-(--color-text-muted)">Tokens Today</span>
                                <span className="text-(--color-text-primary)">{user.tokensUsedToday}</span>
                            </h3>

                            <h3 className="flex justify-between">
                                <span className="text-(--color-text-muted)">Total Tokens</span>
                                <span className="text-(--color-text-primary)">{user.totalTokensUsed}</span>
                            </h3>

                        </div>
                    </div>

                    <div className=" mt-8 border border-(--color-border) flex flex-col justify-start items-start w-[380px] rounded-lg bg-(--color-bg-tertiary)">

                        {/* headline  */}
                        <div className="w-full text-[1rem] font-medium p-4 border-b border-(--color-border) text-(--color-text-primary)">
                            <h3>Pro Details</h3>
                        </div>

                        {/* detail */}
                        <div className="p-5 w-full flex flex-col gap-3 text-[0.95rem]">

                            <h3 className="flex justify-between border-b border-(--color-border) pb-2  items-center  gap-2">
                                <span className="text-(--color-text-muted)">Plan Activation: </span>
                                <span className="text-(--color-text-primary) flex items-center justify-center gap-2 "> { formatDate(user.planUpgradedAt) } </span>
                            </h3>

                            <h3 className="flex justify-between border-b border-(--color-border) pb-2">
                                <span className="text-(--color-text-muted)">Plan Expiration: </span>
                                <span className="text-(--color-text-primary)"> { formatDate(user.planExpiresAt) } </span>
                            </h3>

                            <h3 className="flex justify-between border-b border-(--color-border) pb-2">
                                <span className="text-(--color-text-muted)">Days Left: </span>
                                <span className="text-(--color-text-primary)"> 200 </span>
                            </h3>

                            <h3 className="flex justify-between border-b border-(--color-border) pb-2">
                                 ✓ Unlimited Generations <br />
                                 ✓ Priority Access
                            </h3>

                        </div>
                    </div>
                </div>

            </div>

        </div>
    )

}