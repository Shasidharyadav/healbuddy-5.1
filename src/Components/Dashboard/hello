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

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await axios.get('/api/profiles/check-profiles', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
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
        const profileDetails = {
            profileName: e.target.profileName.value,
            name: e.target.name.value,
            age: e.target.age.value,
            gender: e.target.gender.value,
            occupation: e.target.occupation.value,
            work: e.target.work.value,
            exercise: e.target.exercise.value,
            reason: e.target.reason.value,
        };

        try {
            const response = await axios.post('/api/profiles/create-profile', profileDetails, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
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

    return (
        <div className="dashboard">
            <div className="navbar">
                <button className="button" onClick={handleProfileDetailsClick}>Profile Details</button>
            </div>
            <div className="dashboard-content">
                <div className="right-side">
                    {!showForm && profiles.length > 0 && !confirmProfile && !showAssessment && (
                        <div>
                            <h3>Select a Profile:</h3>
                            <ul>
                                {profiles.map(profile => (
                                    <li key={profile._id}>
                                        <button onClick={() => handleProfileSelect(profile)}>
                                            {profile.profileName}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => setShowForm(true)}>Create New Profile</button>
                        </div>
                    )}
                    {showForm && (
                        <form onSubmit={handleProfileSubmit}>
                            <div>
                                <label>Profile Name:</label>
                                <input type="text" name="profileName" required />
                            </div>
                            <div>
                                <label>Name:</label>
                                <input type="text" name="name" required />
                            </div>
                            <div>
                                <label>Age:</label>
                                <input type="number" name="age" required />
                            </div>
                            <div>
                                <label>Gender:</label>
                                <select name="gender" defaultValue="" required>
                                    <option value="" disabled>Please select an option</option>
                                    <option value="Transgender">Transgender</option>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                </select>
                            </div>
                            <div>
                                <label>Occupation:</label>
                                <select name="occupation" defaultValue="" required>
                                    <option value="" disabled>Please select an option</option>
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
                            <div>
                                <label>What does your work need you to do the MOST?:</label>
                                <select name="work" defaultValue="" required>
                                    <option value="" disabled>Please select an option</option>
                                    <option value="Sitting">Sitting</option>
                                    <option value="Standing">Standing</option>
                                    <option value="Bending/stooping">Bending/stooping</option>
                                    <option value="Walking">Walking</option>
                                    <option value="Travelling">Travelling</option>
                                    <option value="Floor sitting/squatting">Floor sitting/squatting</option>
                                </select>
                            </div>
                            <div>
                                <label>How many times in a week do you exercise/walk?:</label>
                                <select name="exercise" defaultValue="" required>
                                    <option value="" disabled>Please select an option</option>
                                    <option value="Daily">Daily</option>
                                    <option value="Approx 3 times a week">Approx 3 times a week</option>
                                    <option value="No exercise/walking at all">No exercise/walking at all</option>
                                </select>
                            </div>
                            <div>
                                <label>What brings you to HealBuddy?:</label>
                                <select name="reason" defaultValue="" required>
                                    <option value="" disabled>Please select an option</option>
                                    <option value="Want to know more about MSK Pain">Want to know more about MSK Pain</option>
                                    <option value="Felt a sudden pain and want a solution">Felt a sudden pain and want a solution</option>
                                    <option value="Pain, stiffness, and discomfort that bothers me and hence need a solution">Pain, stiffness, and discomfort that bothers me and hence need a solution</option>
                                </select>
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    )}
                    {confirmProfile && selectedProfile && (
                        <div>
                            <p>Shall I proceed with this profile for the assessment?</p>
                            <p><b>Profile Name:</b> {selectedProfile.profileName}</p>
                            <p><b>Name:</b> {selectedProfile.name}</p>
                            <p><b>Age:</b> {selectedProfile.age}</p>
                            <p><b>Gender:</b> {selectedProfile.gender}</p>
                            <p><b>Occupation:</b> {selectedProfile.occupation}</p>
                            <p><b>Work:</b> {selectedProfile.work}</p>
                            <p><b>Exercise:</b> {selectedProfile.exercise}</p>
                            <p><b>Reason:</b> {selectedProfile.reason}</p>
                            <button onClick={handleConfirmProfile}>Proceed with Assessment</button>
                        </div>
                    )}
                    {showAssessment && selectedProfile && (
                        <AssesHome profile={selectedProfile} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
