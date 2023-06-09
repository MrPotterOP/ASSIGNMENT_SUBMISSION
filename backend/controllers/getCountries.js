import countries from "../models/countries.js";


const getContries = (req, res)=>{
    countries.find({})
    .then(docs =>{
        return res.json({countries: docs});
    })
    .catch(err =>{
        return res.status(401).json({errors: ["backend: Failure while receiving data from backend"]})
    });
}

export default getContries;