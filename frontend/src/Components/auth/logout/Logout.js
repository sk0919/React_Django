import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class Logout extends Component {
    constructor(props) {
        super(props)
        //console.log("Test form logout " + window.location.href)
        localStorage.removeItem("token")
        
    }
    
    render() {
        {console.log("test form render")}
        return (
            <div>
                <h1>You have been logged out!!!</h1>
                <Link to="/" > Login Again </Link>
            </div>
        )
    }
}

export default Logout;
