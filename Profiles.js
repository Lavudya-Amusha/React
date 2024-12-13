import React, { useState } from 'react';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import MapContainer from './MapContainer';

const profilesData = [
  {
    id: 1,
    name: 'John Doe',
    photo: 'https://via.placeholder.com/150',
    description: 'Software Engineer',
    address: '1600 Amphitheatre Parkway, Mountain View, CA',
  },
  // Add more profiles here
];

const Profiles = () => {
  const [profiles] = useState(profilesData);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleShowOnMap = (address) => {
    setSelectedAddress(address);
  };

  return (
    <div>
      <h1>Profiles</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {profiles.map((profile) => (
          <Card key={profile.id} style={{ margin: '10px', width: '300px' }}>
            <CardMedia component="img" height="150" image={profile.photo} alt={profile.name} />
            <CardContent>
              <Typography variant="h5">{profile.name}</Typography>
              <Typography>{profile.description}</Typography>
              <Button variant="contained" onClick={() => handleShowOnMap(profile.address)}>
                Show on Map
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedAddress && <MapContainer address={selectedAddress} />}
    </div>
  );
};

export default Profiles;

