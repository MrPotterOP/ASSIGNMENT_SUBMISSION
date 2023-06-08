import mongoose from "mongoose";


const countriesSchema = new mongoose.Schema({
    country: String,
    states: [{
        state: String,
        cities: [String]
    }]
});

const countries = new mongoose.model("countries", countriesSchema);


export default countries;