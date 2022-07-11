// /api/feedback

import fs from "fs";
import path from "path";

export function buildFeedbackFilePath(){
  return  path.join(process.cwd(), "data", "feedback.json");
}

export function readFileData(filePath){
   const fileData = fs.readFileSync(filePath);
   const data = JSON.parse(fileData); // converting json data in object form
   return data;
}


// this function will run only on server and executed with node js
function handler(req,res) {
  // inside this function we have to find out which kind of req is triggering this API route
  // because by default every request triggers API route

  if (req.method === "POST") {
    // req - object, method-property, body-property
    // req.body // this body property has parsed data from the request url just like value sent from user

    // extracting data from req
    const email = req.body.email;
    const feedback = req.body.text;

    // converting into object
    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      text: feedback,
    };

    // storing data in database
    // construcing a absolute path with join method to data folder and feedback.json file, by getting access to the current working directory
    const filePath = buildFeedbackFilePath();

    // first reading file,fetch the data in the file and then overwrite with the updated data
    const data = readFileData(filePath);
    
    data.push(newFeedback);

    // writing into file with updated data
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ message: "if condition success!", feedback: newFeedback });// this will send back a response after successfully updating file and it sends back an object in json format with message and feedback as properties
  } else {
    const filePath = buildFeedbackFilePath();
    const data = readFileData(filePath);
    res.status(200).json({feedback:data });
  }
}
export default handler;
// when this function executes we automatically get request object from next js
//
