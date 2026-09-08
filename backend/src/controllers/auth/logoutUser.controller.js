
export default function logoutUser(req, res, next){

    // clear cookie
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });

}