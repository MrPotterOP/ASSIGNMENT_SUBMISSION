import users from "../models/users.js";
import countries from "../models/countries.js";



const postUsers  = (req, res) =>{
  const {firstName, lastName, email, country, state, city, gender, dob} = req.body;

    console.log(firstName, lastName, email, country, state, city, gender, dob);
    //Functional Components

    const createUser = (age) =>{
        users.create({firstName, lastName, email, country, state, city, gender: gender.toUpperCase(), dob, age})
        .then(r =>{
            return res.json(r);
        })
        .catch(e =>{
            let errors = e.message.slice(24).split(", ");
            return res.status(401).json({errors});
        });
    }

    const checkDOB = ()=>{
        const selectedDate = new Date(dob);
        let val = (selectedDate.getTime() / 1000) * 1000;
        var age = 0;
        
        function calculateAge(bd) {
            let birthday = new Date(bd);
            let date = new Date();
            let now = new Date(date.toLocaleString('en-US', { timeZone: "Asia/Kolkata" }));    

            age = now.getFullYear() - birthday.getFullYear();
          
            if (now.getMonth() < birthday.getMonth() || (now.getMonth() === birthday.getMonth() && now.getDate() < birthday.getDate())) {
              age--;
            }
        }

        calculateAge(val);

        if(age > 13){
            createUser(age);
        }else{
            return res.status(401).json({errors: ["dob: Age must be older than 14 years."]})
        }
    }

    const checkCountry = ()=>{
        countries.findOne({country})
        .then(r =>{
            if(!r){
                return res.status(401).json({errors: ["country: Provide valid country from the list."]})
            }else{
                const stateInfo = r.states.filter(t => t.state === state);

                if(stateInfo.length === 0){
                    return res.status(401).json({errors: ["state: Provide valid state from the list."]})
                }else{
                    if(stateInfo[0].cities.includes(city)){
                        checkDOB();
                    }else{
                        return res.status(401).json({errors: ['city: Provide valid city from the list.']})
                    }

                }
            }
        })
        .catch(e =>{
            console.log(e);
        })
    }

    const isValidDate = (dateString) => {
        const pattern = /^\d{4}-\d{2}-\d{2}$/;

            if (!pattern.test(dateString)) {
                return false;
            }

            const [year, month, day] = dateString.split('-');

            const date = new Date(year, month - 1, day);
            const isValid = date.getFullYear() == year &&
                date.getMonth() + 1 == month &&
                date.getDate() == day;

            return isValid;
      }


    //Main JS
    
    if(isValidDate(dob)){
        checkCountry();
    }else{
        return res.status(401).json({errors: ["dob: Date-of-Birth is required."]})
    }

}


export default postUsers;