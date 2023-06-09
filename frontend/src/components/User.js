import { useLocation, Link } from 'react-router-dom';

const User = () => {
  const location = useLocation();
  const data = location.state;


  const Details = ()=>{
    
    return(
        <div className="user-card">
            <h2>User Added Successfully</h2>
            <div className="user-info">
                <p><strong>First Name:</strong> {data.firstName}</p>
                <p><strong>Last Name:</strong> {data.lastName}</p>
                <p><strong>Email:</strong> {data.email}</p>
                <p><strong>Date of Birth:</strong> {data.dob}</p>
                <p><strong>Country:</strong> {data.country}</p>
                <p><strong>State:</strong> {data.state}</p>
                <p><strong>City:</strong> {data.city}</p>
                <p><strong>Age:</strong> {data.age}</p>
            </div>

            <Link to="/">Go Back to add more users</Link>
        </div>
    )
  }

  return (
    <div>
        {data ? <Details /> : <h1>User Submission Required First.</h1>}
    </div>
  );
}

export default User;