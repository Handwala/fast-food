import React from 'react'
import "../css/App.css"
import "../css/Sidebar.css"

const sidebar = () => {
  return (
    <div className="sidebar">
    <div className="sidebar2">
      <div className="logo">
        <h2>GoMeal</h2>
      </div>
      <nav>
        <ul>
          <li>Dashboard</li>
          <li>Food Order</li>
          <li>Favorites</li>
          <li>Messages</li>
          <li>Order History</li>
          <li>Bills</li>
          <li>Settings</li>
        </ul>
      </nav>
      <div className="upgrade">
        <button>Upgrade</button>
      </div>
    </div>
    </div>
  )
}

export default sidebar