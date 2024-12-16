import connectDb from "@/middleware/mongoose";
import Agents from "@/model/Agents";
import Votes from "@/model/Vote";

const handler = async (req, res) => {
    if (req.method == "POST") {
        let pollid = Math.floor(100000 + Math.random() * 900000) // Generate a 6-digit random number
        let newVote = new Votes({
            VoteTitle: req.body.VoteTitle,
            options: req.body.options, 
            pollid: pollid
        })
        let vote = await newVote.save();
        return res.status(200).json({ success: true, msg: `New Poll #${pollid} is Activated`,vote:vote });
    }  else if (req.method == "GET") {
        let votes = await Votes.find({}, { "__v": 0 });
        return res.status(200).json({ success: true, votes: votes});

    } else if (req.method === "DELETE") { 
        try {
            // Delete all documents in the collection
            let result = await Votes.deleteMany({});
            let result2 = await Agents.deleteMany({});
    
            if (result.deletedCount === 0) {
                return res.status(404).json({ success: false, msg: "No polls found to delete." });
            }
    
            return res.status(200).json({ success: true, msg: "All polls have been deleted." });
        } catch (error) {
            return res.status(500).json({ success: false, msg: "Server error.", error: error.message });
        }
    }
    
    
}

export default connectDb(handler);