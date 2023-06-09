import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import {useNavigate} from "react-router";


const Home = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [err, setErr] = useState({});

    useEffect(() => {
        axios.get('/api/countries')
        .then(response => {
            setCountries(response.data.countries);
        })
        .catch(error => {
            alert('Failed to get countries from backend. Please try again later.');
        });
    }, []);

    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        setCountry(selectedCountry);

        let states = countries.filter(t => t.country === selectedCountry);

        setStates(states[0].states);

        
    };

    const handleStateChange = (e) => {
        const selectedState = e.target.value;
        setState(selectedState);

        let cities = states.filter(t => t.state === selectedState);

        setCities(cities[0].cities)
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = {
        firstName,
        lastName,
        email,
        gender,
        dob,
        country,
        city,
        state
        };

        try {

        const response = await axios.post('/api/user', data);


        if (response.status === 200) {
            console.log(response.data);
            navigate('/user', {state: {...response.data}});
        } else {
            alert('Error submitting the form. Please try again.');
        }
        } catch (error) {
        const obj = {};
        if(error.response){
            error.response.data.errors.forEach(item => {
                const [key, value] = item.split(':');
                obj[key.trim()] = value.trim();
            });
            setErr(obj);
        }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='input-box'>
                <input
                type="text"
                value={firstName}
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                />
                {err.firstName ? <p className='warning'>{err.firstName}</p> : null}
            </div>
            <div className='input-box'>
                <input
                type="text"
                value={lastName}
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                />
                {err.lastName ? <p className='warning'>{err.lastName}</p> : null}
            </div>

            <div className='input-box'>
                <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                />
                {err.email ? <p className='warning'>{err.email}</p> : null}
            </div>
       
        <div className='input-box'>
            <label>
                Gender:
                <input
                type="radio"
                value="male"
                checked={gender === 'male'}
                onChange={() => setGender('male')}
                />
                Male
                <input
                type="radio"
                value="female"
                checked={gender === 'female'}
                onChange={() => setGender('female')}
                />
                Female
            </label>
            {err.gender ? <p className='warning'>{err.gender}</p> : null}
        </div>

        <label>
            Date of Birth:
            <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            />
        </label>
        {err.dob ? <p className='warning'>{err.dob}</p> : null}


        <label>
            Country:
            <select value={country} onChange={handleCountryChange}>
            <option value="">Select Country</option>
            {countries.map(country => (
                <option key={country._id} value={country.country}>{country.country}</option>
            ))}
            </select>
        </label>
        {err.country ? <p className='warning'>{err.country}</p> : null}


        <label>
            State:
            <select value={state} onChange={handleStateChange}>
            <option value="">Select State</option>
            {states.map(state => (
                <option key={state._id} value={state.state}>{state.state}</option>
            ))}
            </select>
        </label>
        {err.state ? <p className='warning'>{err.state}</p> : null}


        <label>
            City:
            <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">Select City</option>
            {cities.map((city, i) => (
                <option key={i} value={city}>{city}</option>
            ))}
            </select>
        </label>
        {err.city ? <p className='warning'>{err.city}</p> : null}


        <button type="submit">Add User</button>
        </form>
    );
    };

    export default Home;
