
export default function FullScreenLoading(){
    return (
    <div className="h-screen flex flex-col gap-6 justify-center items-center bg-(--color-primary)">
        <div className="w-20 h-20 border-8 border-(--color-primary-light) border-t-(--color-accent) rounded-full animate-spin shadow-[0_0_20px_var(--color-accent)]"></div>
        <p className="text-(--color-text-on-primary) text-sm tracking-wide">
                Loading...
        </p>
    </div>
    )
}