import mongoose from "mongoose";


//Validation Functions
const validateName = (name) =>{
    const Regex = new RegExp("^[a-zA-Z]+$");
    
    return Regex.test(name);
}

const validateGender = (gender) =>{
    const genders = ["MALE", "FEMALE"];

    return genders.includes(gender);
}

//Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: "First-Name is Required",
        validate: [validateName, "First-Name must be only in alphabets."],
        maxLength: 20
    },
    lastName:{
        type: String,
        required: "First-Name is Required",
        validate: [validateName, "Last-Name must be only in alphabets."],
        maxLength: 20
    },
    email: {
        type: String,
        required: 'Email address is provided',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Valid email address must be provided'],
        maxLength: 320
    },
    country: {
        type: String,
        required: "Country is Required",
    },
    state: {
        type: String,
        required: "State is Required"
    },
    city: {
        type: String,
        required: "City is Required",
    },
    gender: {
        type: String,
        required: "Gender is Required",
        validate: [validateGender, "Gender should be valid"]
    },
    dob: {
        type: String,
        required: "Date-of-Birth is Required"
    },
    age: {
        type: Number,
        required: true,
        min: 14
    }
});

//Model
const users = new mongoose.model("user", userSchema);


export default users;
