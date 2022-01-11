import dbConnect from "../../../utils/dbConnect";
import Post from "../../../models/Post";

dbConnect();

export default async (req, res) => {
    const { query : { id }, method } = req;

    switch(method){
        case "GET":
            try {
                const foundPost = await Post.findOne({ id: id })
                if(!foundPost){
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({success: true, data: foundPost })
            } catch (error) {
                console.log(error);
            }
            break;
        case "PUT":
            try {
                const foundPost = await Post.findOneAndUpdate({id: id}, req.body, {
                    new: true,
                    runValidators: true
                })
                if(!foundPost){
                    res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: foundPost })
            } catch (err) {
                res.status(400).json({success: false})
            }
            break;
    }
}