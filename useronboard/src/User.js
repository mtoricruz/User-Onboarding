import React from 'react'

function User({ details }) {
    if (!details) {
        return <h3>Working on fetching your user&apos;s details..</h3>
    }
    return (
        <div className='user container two'>
            <h2>{details.name}</h2>
            <p>Email: {details.email}</p>
            <p>Password, that you should not see but here it is anyways: {details.password}</p>
        </div>
    )
}

export default User