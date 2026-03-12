
export default function logoutUser(req, res, next){

    // clear cookie
    res.clearCookie("token", {
        httpOnly: true,
        secure: false, // true in production
        sameSite: "lax"
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });

}