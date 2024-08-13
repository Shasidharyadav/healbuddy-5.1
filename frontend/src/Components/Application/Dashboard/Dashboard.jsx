import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';
import AssesHome from '../Assessment/AssesHome/AssesHome'; // Adjust the path based on your structure

const Dashboard = () => {
    const navigate = useNavigate();
    const [profiles, setProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showAssessment, setShowAssessment] = useState(false);
    const [confirmProfile, setConfirmProfile] = useState(false);
    const [occupation, setOccupation] = useState(''); // New state for occupation

    useEffect(() => {
        const fetchProfiles = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login'); // Redirect to login if token is missing
                return;
            }

            try {
                const response = await axios.get('/api/profiles/check-profiles', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setProfiles(response.data);

                // Restore state from local storage
                const savedProfile = localStorage.getItem('selectedProfile');
                const savedShowForm = localStorage.getItem('showForm') === 'true';
                const savedShowAssessment = localStorage.getItem('showAssessment') === 'true';
                const savedConfirmProfile = localStorage.getItem('confirmProfile') === 'true';

                if (savedProfile) {
                    setSelectedProfile(JSON.parse(savedProfile));
                }
                setShowForm(savedShowForm);
                setShowAssessment(savedShowAssessment);
                setConfirmProfile(savedConfirmProfile);
            } catch (error) {
                console.error('Error fetching profiles', error);
            }
        };
        fetchProfiles();
    }, []);

    useEffect(() => {
        // Save state to local storage
        localStorage.setItem('selectedProfile', JSON.stringify(selectedProfile));
        localStorage.setItem('showForm', showForm);
        localStorage.setItem('showAssessment', showAssessment);
        localStorage.setItem('confirmProfile', confirmProfile);
    }, [selectedProfile, showForm, showAssessment, confirmProfile]);

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirect to login if token is missing
            return;
        }

        const profileDetails = {
            profileName: e.target.profileName.value,
            name: e.target.name.value,
            age: e.target.age.value,
            gender: e.target.gender.value,
            occupation: e.target.occupation.value,
            work: e.target.work ? e.target.work.value : '', // Check for work field existence
            exercise: e.target.exercise.value,
            reason: e.target.reason.value,
        };

        try {
            const response = await axios.post('/api/profiles/create-profile', profileDetails, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setProfiles([...profiles, response.data]);
            setSelectedProfile(response.data);
            setShowForm(false);
            setConfirmProfile(true); // Show confirmation message
        } catch (error) {
            console.error('Error creating profile', error);
        }
    };

    const handleProfileDetailsClick = () => {
        if (profiles.length === 0) {
            setShowForm(true);
        } else {
            setShowForm(false);
        }
    };

    const handleProfileSelect = (profile) => {
        setSelectedProfile(profile);
        setConfirmProfile(true); // Show confirmation message
    };

    const handleConfirmProfile = () => {
        setConfirmProfile(false);
        setShowAssessment(true);
    };

    const handleOccupationChange = (e) => {
        setOccupation(e.target.value);
    };

    return (
        <div className="dashboard">
            <div className="navbar">
                <button className="dashboard-button" onClick={handleProfileDetailsClick}>Profile Details</button>
            </div>
            <div className="dashboard-content">
                <div className="right-side">
                    {!showForm && profiles.length > 0 && !confirmProfile && !showAssessment && (
                        <div>
                            <h3>Select a Profile:</h3>
                            <ul>
                                {profiles.map(profile => (
                                    <li key={profile._id}>
                                        <button className="dashboard-button" onClick={() => handleProfileSelect(profile)}>
                                            {profile.profileName}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <button className="dashboard-button" onClick={() => setShowForm(true)}>Create New Profile</button>
                        </div>
                    )}
                    {showForm && (
                        <form onSubmit={handleProfileSubmit}>
                            <div className="form-group">
                                <label>Nick Name:</label>
                                <input type="text" name="profileName" required />
                            </div>
                            <div className="form-group">
                                <label>User Name:</label>
                                <input type="text" name="name" required />
                            </div>
                            <div className="form-group">
                                <label>Age:</label>
                                <select name="age" required>
                                    <option value="" disabled>Please select an option</option>
                                    {Array.from({ length: 83 }, (_, i) => i + 18).map(age => (
                                        <option key={age} value={age}>{age}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Gender:</label>
                                <select name="gender" defaultValue="" required>
                                    <option value="" disabled>Please select an option</option>
                                    <option value="Transgender">Transgender</option>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Occupation:</label>
                                <select name="occupation" defaultValue="" onChange={handleOccupationChange} required>
                                    <option value="" disabled>Please select an option</option>
                                    <option value="Student">Student</option>
                                    <option value="Industrial laborer, mine worker or factory engineer">Industrial laborer</option>
                                    <option value="Industrial laborer, mine worker or factory engineer">Mine worker</option>
                                    <option value="Industrial laborer, mine worker or factory engineer">Factory engineer</option>
                                    <option value="Researcher, scientist, doctor, lawyer, management or driver">Researcher</option>
                                    <option value="Researcher, scientist, doctor, lawyer, management or driver">Scientist</option>
                                    <option value="Researcher, scientist, doctor, lawyer, management or driver">Doctor</option>
                                    <option value="Researcher, scientist, doctor, lawyer, management or driver">Lawyer</option>
                                    <option value="Researcher, scientist, doctor, lawyer, management or driver">Management</option>
                                    <option value="Researcher, scientist, doctor, lawyer, management or driver">Driver</option>
                                    <option value="Teacher or chef">Teacher</option>
                                    <option value="Teacher or chef">Chef</option>
                                    <option value="Farmer or porter">Farmer</option>
                                    <option value="Farmer or porter">Porter</option>
                                    <option value="Home-maker, embroider or work from home">Home-maker</option>
                                    <option value="Home-maker, embroider or work from home">Embroider</option>
                                    <option value="Home-maker, embroider or work from home">Work from home</option>
                                    <option value="Armed forces, police personnel or security workforce">Armed forces</option>
                                    <option value="Armed forces, police personnel or security workforce">Police personnel</option>
                                    <option value="Armed forces, police personnel or security workforce">Security workforce</option>
                                    <option value="Sales executive">Sales executive</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                            {occupation === 'Others' && (
                                <div className="form-group">
                                    <label>What does your work need you to do the MOST?:</label>
                                    <select name="work" defaultValue="" required>
                                        <option value="" disabled>Please select an option</option>
                                        <option value="Prolonged sitting at workstation">Prolonged sitting at workstation</option>
                                        <option value="Long standing requirements">Long standing requirements</option>
                                        <option value="Lifting heavy weights">Lifting heavy weights</option>
                                        <option value="Bending or stooping repeatedly">Bending or stooping repeatedly</option>
                                        <option value="Extensive walking daily">Extensive walking daily</option>
                                        <option value="Travelling intercity on bike, car, train or flight">Travelling intercity on bike, car, train or flight</option>
                                        <option value="Sitting on floor or squatting">Sitting on floor or squatting</option>
                                    </select>
                                </div>
                            )}
                            <div className="form-group">
                                <label>How many times in a week do you exercise/walk?:</label>
                                <select name="exercise" defaultValue="" required>
                                    <option value="" disabled>Please select an option</option>
                                    <option value="Daily">Daily</option>
                                    <option value="Approx 3 times a week">Approx 3 times a week</option>
                                    <option value="No exercise/walking at all">No exercise/walking at all</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>What brings you to HealBuddy?:</label>
                                <select name="reason" defaultValue="" required>
                                    <option value="" disabled>Please select an option</option>
                                    <option value="Want to know more about MSK Pain">Want to know more about MSK Pain</option>
                                    <option value="Felt a sudden pain and want a solution">Felt a sudden pain and want a solution</option>
                                    <option value="Pain, stiffness, and discomfort that bothers me and hence need a solution">Pain, stiffness, and discomfort that bothers me and hence need a solution</option>
                                </select>
                            </div>
                            <button type="submit" className="dashboard-button">Submit</button>
                        </form>
                    )}
                    {confirmProfile && selectedProfile && (
                        <div>
                            <p>Shall I proceed with this profile for the assessment?</p>
                            <p><b>Nick Name:</b> {selectedProfile.profileName}</p>
                            <p><b>User Name:</b> {selectedProfile.name}</p>
                            <p><b>Age:</b> {selectedProfile.age}</p>
                            <p><b>Gender:</b> {selectedProfile.gender}</p>
                            <p><b>Occupation:</b> {selectedProfile.occupation}</p>
                            {selectedProfile.occupation === 'Others' && (
                                <div>
                                    <p><b>Work:</b> {selectedProfile.work}</p>
                                </div>
                            )}
                            <p><b>Exercise:</b> {selectedProfile.exercise}</p>
                            <p><b>Reason:</b> {selectedProfile.reason}</p>
                            <button onClick={handleConfirmProfile} className="dashboard-button">Proceed with Assessment</button>
                        </div>
                    )}
                    {showAssessment && selectedProfile && (
                        <AssesHome profileId={selectedProfile._id} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
