import React , { useState, useEffect } from 'react';
import './css/CreateEntry.css';
//import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import  {Dropdown, } from 'react-bootstrap';
import $ from 'jquery';

function CreateEntry() {

    const initialValue = [];

    const [data, setData] = useState(initialValue);

    document.body.querySelector("*").onClick = (e) => {
        e.style="overflow: hidden;";
        console.log('hi');
    }
    //creating custom search function for table 

	$("#plan-search").on("keyup", function() {
        console.log("keyup")
        let searchPlan = $(this).val().toLowerCase();
        $("#plan-list").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(searchPlan) > -1)
        });
    })

    function onKeyUpValue(event) {
        console.log(event.target.value);
        let searchPlan = event.target.value.toLowerCase();
        $("#plan-list").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(searchPlan) > -1)
        });
    }


    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [staten, setStateN] = useState("");
    const [country, setCountry] = useState("");

    function handleForm(event){
        console.log('button clicked')

        fetch('http://127.0.0.1:8000/v1/users/fetchAndCreateUser/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Accept': 'application/json',
                'Content-Type': 'application/json',               
            },  
            body: JSON.stringify({
                fname: fname,
                lname: lname,
                phone: phone,
                email: email,
                state: staten,
                country:country
            })
        }).catch(function(error) {
            console.log('Looks like there was a problem: \n', error);
          });

        event.preventDefault();
    }

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts`)
        .then(res => res.json())
        .then(res => {
         setData(res);
        })     
      }, [] );
      
      //console.log(data)
      let optionItems = data.map((item) =>
                <Dropdown.Item id="plan-list" className="menu-item" key={item.id} eventKey={[item.title,item.id]}>{item.title}</Dropdown.Item>
        );
//----------------------------------------
    //handling the select option 
    let initialPlanValue = []
    const [val,setVal]=useState(initialPlanValue);

    function handlePlanSelection(event){
        console.log(event);
        console.log("hello");
        // useEffect(() => {
        //     fetch(`https://jsonplaceholder.typicode.com/posts/${event[1]}`)
        //     .then(res => res.json())
        //     .then(res => {
        //      setVal(res);
        //     })     
        // }, [] );
        //setVal(event);
    }

    // let subMenuItems = val.map((item) =>
    //     <Dropdown.Item className="menu-item" key={item.id} eventKey={[item.title,item.id]}>{item.title}</Dropdown.Item>
    // );

    return (

        <div id = "create_body">
                <div className="col-md-4" id="awesome-view">
                    <form onSubmit={handleForm}>
                        <p className="h4 col-md-7">Create New Users</p>
                        <br></br>
                            <div className="form-row"> 
                                <div className="form-group col-md-7">
                                    <input type="text" className="form-control" name="fname" 
                                    value={fname} onChange={e => setFname(e.target.value)} placeholder="First Name" />
                                </div>
                                <div className="form-group col-md-7">
                                    <input type="text" className="form-control" name="lname"
                                     value={lname} onChange={e => setLname(e.target.value)}  placeholder="Last Name" />
                                </div>
                            </div>

                            <div className="form-row"> 
                                <div className="form-group col-md-7">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                        <input type="text" className="form-control" name="email"
                                         value={email} onChange={e => setEmail(e.target.value)}  placeholder="Email" />
                                    </div>
                                </div>
                                <div className="form-group col-md-7">
                                    <input type="text" className="form-control" name="phone"
                                     value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" />
                                </div>
                             </div>

                            <div className="form-row"> 
                                <div className="form-group col-md-7">
                                    <input type="text" className="form-control" name="state"
                                     value={staten} onChange={e => setStateN(e.target.value)} placeholder="State" />
                                </div>
                                <div className="form-group col-md-7">
                                    <input type="text" className="form-control" name="country"
                                     value={country} onChange={e => setCountry(e.target.value)}  placeholder="Country" />
                                </div>
                            </div>

                            <div className="form-group col-md-4">
                                    <button type="submit" className="btn btn-primary" >Create</button>
                            </div>
                </form>
            </div>
            <div className="col-md-4" id="awesome-view">
                <div className="cont-blog">
                    <div className="image blog-inner">
                        <div className="dropdown-form-section">
                            <Dropdown onSelect={handlePlanSelection}>
                                <Dropdown.Toggle id="dropdown-basic-button" title="Dropdown button">
                                    Select Plan
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="dropdown-menu-form">
                                    <input id="plan-search" type="text" placeholder="Search" onKeyUp={onKeyUpValue.bind(this)}/>
                                    {optionItems}
                                </Dropdown.Menu>

                            </Dropdown>
                            {/* dynamic render selected content */}
                            {   val=='' ? null : <p>you have selected plan : {val}</p>  }
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default CreateEntry;
