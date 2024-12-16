import connectDb from "@/middleware/mongoose";
import jwt from "jsonwebtoken";
import { serialize } from 'cookie';

const attempts = {
    count: 0,
    lastAttempt: null
};


const handler = async (req, res) => {

    const currentTime = Date.now();

    if (attempts.count >= 5 && currentTime - attempts.lastAttempt < 3600) {
        return res.status(429).json({ success: false, msg: `Too many attempts. Try after 1 Hour.` });
    }


    if (req.method == 'POST') {
        try {
            if (req.body.password == process.env.ADMIN_PASSWORD && req.body.username == process.env.ADMIN_USERNAME) {
                const token = jwt.sign({ key: process.env.ADMIN_USERNAME }, process.env.JWT_TOKEN_ADMIN, { expiresIn: "12h" });
                attempts.count = 0;
                attempts.lastAttempt = null;

                return res.setHeader('Set-Cookie', serialize('Admin_Token', token, {
                    httpOnly: true,
                    sameSite: "strict",
                    secure: true,
                    path: '/',
                    maxAge: 60 * 60 * 24 * 7 // 1 week
                }))
                    .status(200).json({ success: true, msg: "Login Successful" });
            } else {
                attempts.count += 1;
                attempts.lastAttempt = currentTime;

                if (attempts.count >= 5) {
                    return res.status(429).json({ success: false, msg: "Too many attempts. Try after 1 Hour." });
                }

                return res.status(401).json({ success: false, msg: "Wrong Credentials" });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, msg: "Error: Please Try Again !", error: error });
        }
    }
};

export default connectDb(handler);