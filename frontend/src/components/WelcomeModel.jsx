import { IoMdClose } from "react-icons/io";

export default function WelcomeModal({user, onClose}){

    return(

    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">

      <div className=" bg-(--color-primary) text-(--color-accent) p-6 rounded-2xl shadow-[0_0_25px_#6B7A90] w-[400px] relative text-center ">

        <IoMdClose
          onClick={onClose}
          className="absolute right-3 top-3 cursor-pointer text-xl"
        />

        <h2 className="text-2xl font-bold mb-3">
          🎉 Welcome {user?.name}!
        </h2>

        <p className="text-(--color-accent-soft)">
          Your account has been created successfully.
        </p>

        <p className="mt-3">
          Start generating amazing AI content 🚀
        </p>

        <button
          onClick={onClose}
          className=" mt-5 bg-(--color-accent) text-(--color-primary-dark) py-2 px-4 rounded-lg font-bold hover:scale-95 transition ">
          Go to Dashboard
        </button>

      </div>

    </div>

  )

}