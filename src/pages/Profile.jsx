import React from 'react'
import Header from '../component/Header/Header'
import { useSelector } from 'react-redux'
function Profile() {
    const user = useSelector((state) =>state.user.user)
    console.log(user);

  return (
    <>
        <Header/>

        <div>Profile</div>
    </>
  )
}

export default Profile