const asynchHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require ("../utils/generateToken")

const registerUser = asynchHandler(async (req, res) => {
    const { firstName, lastName, email, instructorNumber, phone, password, pic } = req.body;

    const userExits = await User.findOne({ email });

    if (userExits) {
        res.status(400);
        throw new Error("User Already Exists");
    }

    const user = await User.create({ 
        firstName,
        lastName,
        instructorNumber,
        phone,
        email,
        password,   
        pic,

});

    if (user) {
        res.status(201).json({
            _id: user._id,
            firstname: user.firstName,
            lastname: user.lastName,
            email: user.email,
            instructornumber: user.instructorNumber,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken (user._id),

        });   
    } else {
        res.status(400);
        throw new Error("Error Occured");
    }

});

const authUser = asynchHandler(async (req, res) => {
    const { email, password } = req.body;

   const user = await User.findOne({ email });

if(user && (await user.matchPassword(password))) {
    res.json({
        _id: user._id,
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        instructornumber: user.instructorNumber,
        phone: user.phone,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
    });

} else {
    res.status(400);
    throw new Error('Invalid Email or Password');
}

});

const updateUserProfile = asynchHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if(user){
        user.fistName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.instructorNumber = req.body.instructorNumber || user.instructorNumber;
        user.phone = req.body.phone || user.phone;
        user.pic = req.body.pic || user.pic;


        if(req.body.password) {
            user.password = req. body.password;
        }

    const updatedUser = await user.save();
    
    res.json({
        _id: updatedUser._id,
        firstname: updatedUser.firstName,
        lastname: updatedUser.lastName,
        instructornumber: updatedUser.instructorNumber,
        phone: updatedUser.phone,
        email: updatedUser.email,
        pic: updatedUser.pic,
        token: generateToken(updatedUser._id),
    });
} else {
    res.status(404);
    throw new Error('User Not Found');
}
    
    
});




module.exports = { registerUser, authUser, updateUserProfile };