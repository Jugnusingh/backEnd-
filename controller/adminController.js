const adminSchema = require("../schema/adminSchema")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECREAT_KEY = "NotesApi";
const signup = async (req, res) => {
  
  // Existing user check
  // Hashed password
  // User creation
  // Token Generation

  const { username, email, password } = req.body;
  console.log(username,"myusername")

  try {
    const existingAdmin = await adminSchema.findOne({ email: email });
    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const result = await adminSchema.create({
      email: email,
      password: hashedpassword,
      username: username
    });
    console.log(result,"result")
    const token = jwt.sign({ email: result.email, id: result._id },SECREAT_KEY);
    res.status(201).json({ user: result, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};


const signin = async (req, res) => {
 
  // Existing Admin 
  // Match Credential

  const {email, password} = req.body
  console.log(email,password,"password")
  try{
    const existingAdmin = await adminSchema.findOne({email:email})
    if(!existingAdmin){
      console.log("12345")
      return res.status(404).json({
        message:"Admin Not Found"
      })
    }
   const matchPassword = await bcrypt.compare(password, existingAdmin.password)
   if(!matchPassword){
    console.log("78910")
    return res.status(400).json({
      message: "Invalid Credentails"
    })
   }

   const token = jwt.sign({email: existingAdmin.email, id:existingAdmin._id},SECREAT_KEY)
   res.status(201).json({ user: existingAdmin, token: token });
  }catch(error){
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
module.exports = { signup, signin };
