import { BsPersonCircle } from "react-icons/bs";
import { useSelector } from 'react-redux';
import NavBar from '../../components/NavBar.jsx'
import PlanUpgradeButton from '../../components/PlanUpgradeButton.jsx'
import { formatDate, getDaysRemaining } from "../../utils/subcriptionUtils.js";

export default function UserDetails() {

    const { user } = useSelector((state) => state.auth)
    const plan = user?.plan
    console.log('User details: ', user)


    return (
        <div className="w-full min-h-screen bg-(--color-bg-primary) text-(--color-text-primary)">

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
                            <span className="text-(--color-text-primary) truncate ">{user.email}</span>
                        </h3>

                    </div>
                </div>


                {/*  plan details */}
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
                                <span className="rounded-full border border-amber-300 bg-amber-200 px-3 py-1  font-semibold tracking-wide text-amber-900" >

                                    {user.plan}
                                    
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
                    
                    {/* pro user only: pro plan details  */}

                    {
                        user.plan === 'pro' && 
                        <div className="mt-8 w-[380px] rounded-2xl border border-amber-300 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 shadow-[0_0_50px_rgba(255,230,150,0.25)] ">

                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-amber-200 px-5 py-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-amber-900">
                                        ✨ Pro Membership
                                    </h3>
                                    <p className="text-xs text-amber-700">
                                        Premium Access Activated
                                    </p>
                                </div>

                                <div className="rounded-full border border-amber-300 bg-amber-200/60 px-3 py-1 text-xs font-semibold tracking-wide text-amber-900">
                                    Pro
                                </div>
                            </div>

                            {/* Details */}
                            <div className="p-5 flex flex-col gap-4">

                                <div className="flex justify-between border-b border-amber-200 pb-3">
                                    <span className="text-amber-700">
                                        Activated On
                                    </span>
                                    <span className="font-medium text-zinc-900">
                                        {formatDate(user.planUpgradedAt)}
                                    </span>
                                </div>

                                <div className="flex justify-between border-b border-amber-200 pb-3">
                                    <span className="text-amber-700">
                                        Valid Until
                                    </span>
                                    <span className="font-medium text-zinc-900">
                                        { formatDate(user.planExpiresAt) }
                                    </span>
                                </div>

                                <div className="flex justify-between border-b border-amber-200 pb-3">
                                    <span className="text-amber-700">
                                        Remaining Access
                                    </span>
                                    <span className="font-semibold text-amber-900">
                                        { getDaysRemaining(user.planExpiresAt) } Days
                                    </span>
                                </div>

                                {/* Premium Benefits */}
                                <div className="space-y-3 pt-2">

                                    <div className="flex items-center gap-3">
                                        <span className="text-lg text-amber-700 ">✦</span>
                                        <span className="font-medium text-zinc-900">
                                            Unlimited AI Creations
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className="text-lg text-amber-700 ">✦</span>
                                        <span className="font-medium text-zinc-900">
                                            Lightning-Fast Priority Queue
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className="text-lg text-amber-700 ">✦</span>
                                        <span className="font-medium text-zinc-900">
                                            Premium Workspace Experience
                                        </span>
                                    </div>

                                </div>

                            </div>
                        </div>
                    }
                    
                </div>

            </div>

        </div>
    )

}