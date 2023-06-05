import React from 'react'
import './profile.css'

const Profile = () => {

  return (
    <div>
      <section class="profile">
        <div class="container">
            <div class="use-file">
                <div class="main-user-img">
                    <img src="images/profileimage.png" alt=""/>
                    <p style={{color: "aliceblue"}}>Your Photo</p>
                </div>
                <div class="webprofile">
                    <div class="main-file main-user">
                        <p>User Name</p>
                        <h3>{JSON.parse(localStorage.getItem('user')).name}</h3>
                    </div>
                    <div class="main-file main-email">
                        <p style={{marginRight:" 42px"}}>Email</p>
                        <h3>{JSON.parse(localStorage.getItem('user')).email}</h3>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}

export default Profile
