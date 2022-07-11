//creating and using dynamic routes

import {buildFeedbackFilePath,readFileData} from '../api/feedback'

function handler(req,res){
    const feedbackId = req.query.feedbackId;
    const filePath = buildFeedbackFilePath();
    const data = readFileData(filePath);
   const selectedFeedback= data.find(feedback=>feedback.id===feedbackId);
    res.status(200).json({feedback:selectedFeedback});
}
export default handler;