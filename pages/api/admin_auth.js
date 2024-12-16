
import jwt from "jsonwebtoken";
import { parse } from "cookie";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "GET") {
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.Admin_Token;

    try {
      let decoded = await jwt.verify(token, process.env.JWT_TOKEN_ADMIN);

      if (decoded.key !== process.env.ADMIN_USERNAME) {
        return res.status(400).json({ success: false, msg: "In-Valid" });
      }
      return res.status(200).json({ success: true, msg: "Valid" });
    } catch (err) {
      // Handle token verification errors
      return res.status(400).json({ success: false, msg: "User Invalid" });
    }
  }
};

export default connectDb(handler);