import React from "react"

let Profile = (props) => {
    debugger
    return (
        <div>
            <div>
                {props.userName}
            </div>
            <div>
                <button onClick={props.logout}>Выйти</button>
            </div>
        </div>
    )
}

export default Profile;