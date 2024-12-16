import Agents from "@/model/Agents";
import connectDb from "../../middleware/mongoose";

const generateNextAgent = async () => {
    try {
        const highestUsers = await Agents.findOne({}, { Agent_ID: 1 }).sort({ Agent_ID: -1 });
        let nextID;
        if (highestUsers) {
            const highestIDNumber = parseInt(highestUsers.Agent_ID.slice(1));
            nextID = `A${(highestIDNumber + 1).toString().padStart(3, "0")}`;
        } else {
            nextID = "A001";
        }
        return nextID;
    } catch (error) {
        throw new Error("Error generating user ID");
    }
};



const handler = async (req, res) => {
    if (req.method == "GET") {
        const matchingAgents = await Agents.find({});
        return res.status(200).json({
            success: true,
            message: "List of all agents retrieved successfully",
            agents: matchingAgents
        });

    }
    else if (req.method == "POST") {
        try {
            console.log(req.body);

            let nextAgentID = await generateNextAgent();
            const newAgent = new Agents({
                Agent_ID: nextAgentID,
                Agent_Name: req.body.Agent_Name,
                Agent_Email: req.body.Agent_Email,
            });

            let NewAgent = await newAgent.save();

            await fetch(process.env.APPSCRIPT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    {
                        Agent_ID: NewAgent.Agent_ID,
                        Agent_Name: req.body.Agent_Name,
                        Agent_Email: req.body.Agent_Email,
                        link: `https://x-votevault.vercel.app/uservote/vote?id=${NewAgent._id}`
                    }

                )
            });
            return res.status(200).json({ success: true, msg: "Voting Link has been sent to your Email." });
        } catch (err) {
            console.error(err);
            res
                .status(500)
                .json({ success: false, msg: "Please Check Details Again !" });
        }
    }else if (req.method == "PUT") {
        try {
            const { Agent_ID, option } = req.body;

            if (!Agent_ID || !option) {
                return res.status(400).json({ success: false, msg: "Agent_ID and option are required" });
            }

            const updatedAgent = await Agents.findOneAndUpdate(
                { Agent_ID },
                { VotedFor: option },
                { new: true }
            );

            if (!updatedAgent) {
                return res.status(404).json({ success: false, msg: "Agent not found" });
            }

            return res.status(200).json({
                success: true,
                msg: "Thank you for Your Vote.",
                agent: updatedAgent
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, msg: "Error updating agent's option" });
        }
    } 
    else {
        return res.status(405).json({ success: false, msg: "Method not allowed" });
    }

};

export default connectDb(handler);