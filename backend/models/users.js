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
        required: "First-Name is required",
        validate: [validateName, "First-Name must be only in alphabets."],
        maxLength: 20
    },
    lastName:{
        type: String,
        required: "Last-Name is required",
        validate: [validateName, "Last-Name must be only in alphabets."],
        maxLength: 20
    },
    email: {
        type: String,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Valid email address must be provided'],
        maxLength: 320
    },
    country: {
        type: String,
        required: "Country is required",
    },
    state: {
        type: String,
        required: "State is required"
    },
    city: {
        type: String,
        required: "City is required",
    },
    gender: {
        type: String,
        required: "Gender is required",
        validate: [validateGender, "Gender should be valid"]
    },
    dob: {
        type: String,
        required: "Date-of-Birth is required"
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
