const express = require('express');
const router = express.Router();
const User = require("./../Schema/schema")
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {VerificationEmail,RecoveryEmail} =  require('./emails')

dotenv.config();

let key = process.env.KEY;

// User registration
router.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const users = await User.findOne({email})
        if (users) {
            // throw error;
            return res.status(401).json({ error: 'User already exist' });
            }
        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(email, username, hashedPassword);
const user = new User({ email,username, password: hashedPassword , emailVerification:false, name:username});
await user.save();
res.status(201).json({ message: 'User registered successfully' });
} catch (error) {
    // console.log(error)
res.status(500).json({ error: 'Registration failed' });
}
});

// User login
router.post('/login', async (req, res) => {
try {
const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user) {
// throw error;
return res.status(401).json({ error: 'User not found' });
}
const passwordMatch = await bcrypt.compare(password, user.password);
if (!passwordMatch) {
return res.status(401).json({ error: 'Enter valid password' });
}
const token = jwt.sign({ userId: user._id }, key, {
expiresIn: '12h',
});
if (!token) {
    res.status(300).json({error: "JWT not created"})
}
res.status(200).json({ token });
} catch (error) {
    // console.log(error)
res.status(500).json({ error: 'Login failed' });
}
});

// User verification 
router.post('/verify',
    (req, res, next) => {
    const {token} = req.body;
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
     const decoded = jwt.verify(token, key );
     req.userId = decoded.userId;
     next();
     } catch (error) {
     res.status(401).json({ error: 'Invalid token' });
     }
     },
     async (req, res) => {
        try {
            const {token} = req.body
        const id =  JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        let a = id.userId;
        const user = await User.findById(a)
        res.status(200).json({ message: user });
        } catch (error) {
            // console.log(error)
            res.status(401).json({message : error.message})
        }
     }
    )

    

    router.post('/send-verify-email', VerificationEmail);


    router.put('/verifing', async (req,res) =>{
        const {secret,to} = req.body;
        // console.log({secret,to})
        const user = await User.findOne({email : to})
        try {
            const SecretMatch = await bcrypt.compare(user.username, secret);
            if(SecretMatch){
                user.emailVerification = true;
                // console.log("user verification : ",user.emailVerification);
                await user.save();
                res.status(200).json({message:"verify"})
            }else{
                res.status(401).json({message:"not verified"})
            }
        } catch (error) {
            // console.log(error);
            res.status(500).json({message:"server error"})
        }
    })

    
    router.post('/send-recovery-email', RecoveryEmail);
    
    router.put('/recovering', async (req,res) =>{
        const {secret,to,password} = req.body;
        // console.log({secret,to,password})
        const user = await User.findOne({email : to})
        try {
            const SecretMatch = await bcrypt.compare(user.username, secret);
            if(SecretMatch){
                const pass = await bcrypt.hash(password, 10)
                user.password = pass;
                await user.save();
                res.status(200).json({message:"password change"})
            }else{
                res.status(401).json({message:"not changed"})
            }
        } catch (error) {
            // console.log(error);
            res.status(500).json({message:"server error"})
        }
    })


module.exports = router;