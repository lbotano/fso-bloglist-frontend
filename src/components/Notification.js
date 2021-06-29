import React from 'react'

const Notification = ({ notification }) => notification ? (
  <div className={`notification${notification.error ? ' error' : ''}`}>
    {notification.text}
  </div>
) : (<></>)

export default Notification
