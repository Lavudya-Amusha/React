import React, { useEffect } from "react";

function MapComponent({ address, name }) {
  useEffect(() => {
    const loadGoogleMapsAPI = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAN5x-MQGYh4YNhTvCAT9q5bbmJI69GPXE&v=3.exp`;
      script.async = true;
      script.defer = true;
      script.onload = () => initializeMap();
      document.body.appendChild(script);
    };

    const initializeMap = () => {
      if (!window.google) {
        console.error("Google Maps API failed to load.");
        return;
      }

      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 0, lng: 0 },
        zoom: 8,
      });

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK") {
          map.setCenter(results[0].geometry.location);
          new window.google.maps.Marker({
            map,
            position: results[0].geometry.location,
            title: name,
          });
        } else {
          console.error("Geocode failed: " + status);
        }
      });
    };

    if (!window.google) {
      loadGoogleMapsAPI();
    } else {
      initializeMap();
    }
  }, [address, name]);

  return <div id="map" style={{ height: "500px", width: "100%" }}></div>;
}

export default MapComponent;

