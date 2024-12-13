import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [viewSummary, setViewSummary] = useState(false);
  const [viewMap, setViewMap] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const [newProfile, setNewProfile] = useState({
    name: '', description: '', contact: '', interests: '', lat: '', lng: '', photoUrl: '', location: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState([]);

  useEffect(() => {
    const savedProfiles = JSON.parse(localStorage.getItem('profiles'));
    if (savedProfiles) {
      setProfiles(savedProfiles);
      setFilteredProfiles(savedProfiles);
    }
  }, []);

  useEffect(() => {
    const filtered = profiles.filter(profile =>
      profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.contact.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProfiles(filtered);
  }, [searchQuery, profiles]);

  const handleViewSummary = (profile) => {
    setSelectedProfile(profile);
    setViewSummary(true);
    setViewMap(false);
  };

  const handleViewMap = (profile) => {
    setSelectedProfile(profile);
    setViewMap(true);
    setViewSummary(false);
  };

  const handleAddUser = () => {
    const newUser = {
      id: profiles.length + 1,
      name: newProfile.name,
      description: newProfile.description,
      contact: newProfile.contact,
      interests: newProfile.interests,
      location: { lat: parseFloat(newProfile.lat), lng: parseFloat(newProfile.lng) },
      photoUrl: newProfile.photoUrl,
    };
    const updatedProfiles = [...profiles, newUser];
    setProfiles(updatedProfiles);
    localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
    setNewProfile({ name: '', description: '', contact: '', interests: '', lat: '', lng: '', photoUrl: '' });
  };

  const handleDeleteUser = (id) => {
    const updatedProfiles = profiles.filter((profile) => profile.id !== id);
    setProfiles(updatedProfiles);
    localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
  };

  return (
    <div className="App">
      <header className="header">
        <h1>User Profile Management</h1>
      </header>

      {isAdmin && (
        <div className="admin-dashboard">
          <h2>Add New User</h2>
          <div className="add-user-form">
            <input type="text" placeholder="Name" value={newProfile.name} onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })} />
            <input type="text" placeholder="Description" value={newProfile.description} onChange={(e) => setNewProfile({ ...newProfile, description: e.target.value })} />
            <input type="text" placeholder="Contact" value={newProfile.contact} onChange={(e) => setNewProfile({ ...newProfile, contact: e.target.value })} />
            <input type="text" placeholder="Interests" value={newProfile.interests} onChange={(e) => setNewProfile({ ...newProfile, interests: e.target.value })} />
            <input type="text" placeholder="Latitude" value={newProfile.lat} onChange={(e) => setNewProfile({ ...newProfile, lat: e.target.value })} />
            <input type="text" placeholder="Longitude" value={newProfile.lng} onChange={(e) => setNewProfile({ ...newProfile, lng: e.target.value })} />
            <input type="text" placeholder="Photo URL" value={newProfile.photoUrl} onChange={(e) => setNewProfile({ ...newProfile, photoUrl: e.target.value })} />
            <button onClick={handleAddUser}>Add User</button>
          </div>

          <div className="search-bar">
            <input type="text" placeholder="Search by Name, Contact, or Location" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>

          <div className="profiles-list">
            <h3>Existing Users</h3>
            <div className="profile-cards">
              {filteredProfiles.map((profile) => (
                <div key={profile.id} className="profile-card">
                  <img src={profile.photoUrl || 'https://via.placeholder.com/150'} alt={profile.name} className="profile-photo" />
                  <div className="profile-details">
                    <h4>{profile.name}</h4>
                    <p>{profile.description}</p>
                    <button className="btn" onClick={() => handleViewSummary(profile)}>View Summary</button>
                    <button className="btn" onClick={() => handleViewMap(profile)}>View Map</button>
                    <button className="btn btn-delete" onClick={() => handleDeleteUser(profile.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {viewSummary && selectedProfile && (
        <div className="profile-summary">
          <h2>{selectedProfile.name}'s Summary</h2>
          <p><strong>Description:</strong> {selectedProfile.description}</p>
          <p><strong>Contact:</strong> {selectedProfile.contact}</p>
          <p><strong>Interests:</strong> {selectedProfile.interests}</p>
          <button className="btn" onClick={() => setViewSummary(false)}>Close Summary</button>
        </div>
      )}

      {viewMap && selectedProfile && selectedProfile.location.lat && selectedProfile.location.lng && (
        <div className="map-container">
          <iframe
            width="100%"
            height="400"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAN5x-MQGYh4YNhTvCAT9q5bbmJI69GPXE&q=${selectedProfile.location.lat},${selectedProfile.location.lng}`}
            allowFullScreen
          ></iframe>
          <button className="btn" onClick={() => setViewMap(false)}>Close Map</button>
        </div>
      )}
    </div>
  );
};

export default App;

