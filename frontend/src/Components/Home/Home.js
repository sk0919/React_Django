import React,  { Component }   from 'react';
import './Home.css';

import  {Navbar, NavDropdown, Nav, NavItem, Form, FormControl, Button} from 'react-bootstrap' 
import {Link, Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';

import CreateEntry from '../Services/CreateEntry'
import UpdateEntry from '../Services/UpdateEntry'
import Contact from '../Contact/Contact';
import About from '../About/About';
import Logout from '../auth/logout/Logout'


class Home extends Component {

    constructor(props) {
        super(props)
        let loggedIn = false;

        const token = localStorage.getItem("token")
         if (token) loggedIn = true;

        this.state = {
             
        }

    }

   
    
    render() {
        if(this.state.loggedIn === false){
            return <Redirect to="/login" />
        }
        return (
            <div id="main_body">
                <Router>
                    {/* Navigation bar starts from here  */}
                    <Navbar bg="lite" expand="md">
                    <Navbar.Brand href="#"><strong>My React Application</strong></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    
                        <Nav className="mr-auto " >
                            <NavItem  href="#" className="nav-link">Home</NavItem>
                            <NavDropdown title="Services" id="basic-nav-dropdown" bg="primary" variant="success">
                            <NavItem href="#">
                                <Link to='/create'>Create</Link>
                            </NavItem>
                            <NavItem href="#">
                                <Link to="/update">update</Link>
                            </NavItem>
                            <NavItem href="#">
                                <Link to="/delete">delete</Link>
                            </NavItem>
                            <NavItem href="#">
                            <Link to="/getlist">fetch all</Link>
                            </NavItem>
                            {/* <NavDropdown.Divider />
                            <NavDropdown.Item href="#">Separated link</NavDropdown.Item> */}
                            </NavDropdown>
                            <NavItem href="#" className="nav-link"><Link to='/about'>About</Link></NavItem>
                            <NavItem href="#" className="nav-link"><Link to='/contact'>Contact us</Link></NavItem>
                            <NavItem href="#" className="nav-link"><Link to='/logout' >Logout</Link></NavItem>
                        </Nav>

                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button  variant="success">Search</Button>
                        </Form>

                        </Navbar.Collapse>
                    </Navbar>
                    {/* Navigation bar end above */}
                    {/* routing code below  */}
                    <Switch>

                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/contact">
                            <Contact />
                        </Route>
                        <Route path="/create">
                            <CreateEntry />
                        </Route>
                        <Route path="/update">
                            <UpdateEntry />
                        </Route>
                        
                        
                </Switch>

                {/* routing code end */}
            </Router>
        </div>
        )
    }
}

export default Home;

