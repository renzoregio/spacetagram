import dbConnect from "../../../utils/dbConnect";
import Post from "../../../models/Post";

dbConnect();

const retrieveData =  async(req, res) => {
    const { method } = req;

    switch(method){
        case "GET":
            try {
                const posts = await Post.find({})
                res.status(200).json({success: true, data: posts})
            } catch (err) {
                res.status(400).json({ success: false})
            }
            break;
        case "POST":
            try {
                const post = await Post.create(req.body);
                res.status(201).json({success: true, data: post})
            } catch(err){
                res.status(400).json({ success: false})
            }
            break;
        default:
            res.status(400).json({ success: false})
            break;
    }
}

export default retrieveData;