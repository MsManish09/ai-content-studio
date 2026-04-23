
export default function FullScreenLoading(){
    return (
        <div className="w-full h-screen flex items-center justify-center bg-(--color-bg-primary)">

            <div className="flex flex-col items-center gap-4">

                {/* Loader */}
                <div className="w-10 h-10 border-4  border-(--color-border)  border-t-(--color-primary)  rounded-full animate-spin">
                </div>

                {/* Text */}
                <p className="text-sm text-(--color-text-muted)">
                    Loading...
                </p>

            </div>

        </div>
    )
}