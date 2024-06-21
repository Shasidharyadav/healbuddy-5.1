import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import './Profile.css'; // Ensure this path is correct based on your project structure

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    age: '',
    gender: '',
    occupation: '',
    workActivity: '',
    exerciseFrequency: '',
    reasonForVisit: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch profile data if exists
    axios.get('/api/profile', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      if (response.data) {
        setProfileData(response.data);
      }
    })
    .catch(error => {
      console.error('Error fetching profile data:', error);
      if (error.response && error.response.status === 401) {
        navigate('/auth');
      }
    });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/profile', profileData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      alert('Profile saved successfully');
    })
    .catch(error => {
      console.error('Error saving profile data:', error);
    });
  };

  return (
    <div className="profile">
      <h2>Create Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={profileData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input type="number" name="age" value={profileData.age} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select name="gender" value={profileData.gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Transgender">Transgender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>
        <div className="form-group">
          <label>Occupation:</label>
          <select name="occupation" value={profileData.occupation} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Student">Student</option>
            <option value="Self-Occupied">Self-Occupied</option>
            <option value="Professional">Professional</option>
            <option value="Farmer">Farmer</option>
            <option value="Service">Service</option>
            <option value="Home-maker">Home-maker</option>
            <option value="Researcher/Scientist">Researcher/Scientist</option>
            <option value="Armed Forces">Armed Forces</option>
            <option value="Retired">Retired</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="form-group">
          <label>What does your work need you to do the MOST?</label>
          <select name="workActivity" value={profileData.workActivity} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Sitting">Sitting</option>
            <option value="Standing">Standing</option>
            <option value="Bending/stooping">Bending/stooping</option>
            <option value="Walking">Walking</option>
            <option value="Travelling">Travelling</option>
            <option value="Floor sitting/squatting">Floor sitting/squatting</option>
          </select>
        </div>
        <div className="form-group">
          <label>How many times in a week do you exercise/walk?</label>
          <select name="exerciseFrequency" value={profileData.exerciseFrequency} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Daily">Daily</option>
            <option value="Approx 3 times a week">Approx 3 times a week</option>
            <option value="No exercise/walking at all">No exercise/walking at all</option>
          </select>
        </div>
        <div className="form-group">
          <label>What brings you to HealBuddy?</label>
          <select name="reasonForVisit" value={profileData.reasonForVisit} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Want to know more about MSK Pain">Want to know more about MSK Pain</option>
            <option value="Felt a sudden pain and want a solution">Felt a sudden pain and want a solution</option>
            <option value="Pain, stiffness and discomfort that bothers me and hence need a solution">Pain, stiffness and discomfort that bothers me and hence need a solution</option>
          </select>
        </div>
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default Profile;
