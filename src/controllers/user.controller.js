import { User } from "../../database/models/user.js";
import { confirmEmail } from "../emiling/confirmEmail.html.js";
import { sendEmail } from "../emiling/confirmEmail.js";
import { catchAsyncErr } from "../utilities/errorHandling.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const signUp = catchAsyncErr(async (req, res) => {
    const { name, email, password} = req.body;
    const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/;
    if (!passwordPattern.test(password)) {
      return res.status(400).json({
        message: 'Password does not meet the complexity requirements. It should be 8-32 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
      });
    }
    const hash = bcrypt.hashSync(password, Number(process.env.ROUND));
  
    const newUser = await User.create({
      name,
      email,
      password: hash,
    });
  
    var token = jwt.sign({ email }, process.env.JWT_KEY);
    sendEmail({ email, html: confirmEmail(token) });
  
    res.status(201).json({ message: "Inserted successfully", user: newUser });
  });
  
  
  
  const signin = catchAsyncErr(async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(404).json({ message: "incorrect email or password" });
    }
  
    user["password"] = undefined;
    let tokenPayload = { user };
    var token = jwt.sign(tokenPayload, process.env.JWT_KEY);
    res.json({ message: "login successfully", token });
  });
  
  const confirmationOfEmail = catchAsyncErr(async (req, res) => {
    let { token } = req.params;
    jwt.verify(token, process.env.JWT_KEY, async function (err, decoded) {
      if (!err) {
        await User.findOneAndUpdate(
          { email: decoded.email },
          { emailConfirmation: true }
        );
        res.json({ message: "account confirmed successfully" });
      } else {
        res.json(err);
      }
    });
  });
  export{signUp , signin,confirmationOfEmail};