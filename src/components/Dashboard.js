import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);

    // Format date of birth to be more readable
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>User Dashboard</h1>
                <button onClick={logout} className="logout-button">Logout</button>
            </div>

            {user ? (
                <div className="user-info-card">
                    <h2>Personal Information</h2>

                    <div className="user-info-grid">
                        <div className="info-item">
                            <span className="info-label">NRIC:</span>
                            <span className="info-value">{user.nric}</span>
                        </div>

                        <div className="info-item">
                            <span className="info-label">Name:</span>
                            <span className="info-value">{`${user.first_name} ${user.last_name}`}</span>
                        </div>

                        <div className="info-item">
                            <span className="info-label">Date of Birth:</span>
                            <span className="info-value">{formatDate(user.date_of_birth)}</span>
                        </div>

                        <div className="info-item">
                            <span className="info-label">Gender:</span>
                            <span className="info-value">{user.gender}</span>
                        </div>

                        <div className="info-item address">
                            <span className="info-label">Address:</span>
                            <span className="info-value">{user.address}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="loading">Loading user information...</div>
            )}
        </div>
    );
};

export default Dashboard;