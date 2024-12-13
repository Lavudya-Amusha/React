import React from "react";

const AdminPanel = () => {
  // Add admin panel functionality here, like managing profiles or performing other actions.
  return (
    <div>
      <h2>Admin Panel</h2>
      <button onClick={() => alert('Admin Panel is working!')}>Test Admin Panel</button>
      {/* You can add more features like editing or deleting profiles here */}
    </div>
  );
};

export default AdminPanel;

