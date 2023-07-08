import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export function withRouter(Children){
    return(props)=>{
        const match={params:useParams()};
        return  <Children{...props} match={match}/>
    }
}
const emailState = {
    emailId: '',
    error: ''
}
const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

class UpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // step 2
            id:this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: '',
            department:'',
            salary:'',
            gender:'',
            dob:'',
            image:''
       
            
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then((res)=>{
            let employee =res.data[0];
            this.setState({...this.state,firstName:employee.first_name,
            lastName:employee.last_name,
             emailId:employee.email_id,
             department:employee.department,
             salary:employee.salary,
             gender:employee.gender,
             dob:employee.dob,
             image:employee.image

    });
});

    }
    handleLogout= () =>{
        const confirm= window.confirm("Are you sure ?");
        if(confirm){
                window.location.href="/";
            }
            else{
                window.location.href="/employees"
            }
     }
    handleHomePage=() =>{
        window.location.href="/employees";
     }
    updateEmployee = (e) => {
        e.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId,department :this.state.department,salary:this.state.salary,gender:this.state.gender,dob:this.state.dob,image:this.state.image};
        console.log('employee => ' + JSON.stringify(employee));

       
        // const conf= window.confirm("Do you want to update ?");
        if (this.state.firstName.length === 0) {
            alert("firstName field is Empty");
          }
         else if (this.state.lastName.length === 0) {
            alert("lastName field is Empty");
          }
          else if(!this.state.emailId || regex.test(this.state.emailId) === false){
            this.setState({
                error: alert( "email format is incorrect"),
                emailState
            });
            return false;
            
        
         }
          else if (this.state.department.length === 0) {
            alert("Department field is Empty");
          }
          else if (this.state.salary.length === 0) {
            alert("salary field is Empty");
          }
          else if (this.state.gender.length === 0) {
            alert("gender field is Empty");
          }
          else if (this.state.dob.length === 0) {
            alert("dob field is Empty");
          }

        else if(window.confirm("Do you want to save ?"))
        { EmployeeService.updateEmployee(employee,this.state.id)
            .then(res =>{
            <Link to='/employees'> this.props.history.push('/employees');</Link>
        
            
                window.location.replace("/employees");
                
            });

            }
        
    }
    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }

    changeDepartmentHandler= (event) => {
        this.setState({department: event.target.value});
    }
    changeSalaryHandler= (event) => {
        this.setState({salary: event.target.value});
    }
    changeGenderHandler= (event) => {
        this.setState({gender: event.target.value});
    }
    changeDobHandler= (event) => {
        this.setState({dob: event.target.value});
    }

    cancel(){
        this.props.history.push('/employees');
    }
     handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
      
        reader.onload = (event) => {
          const base64String = event.target.result.split(",")[1];
          this.setState({image:base64String});
        };
      
        reader.onerror = (error) => {
          console.log("Error: ", error);
        };
      
        if (file) {
          reader.readAsDataURL(file);
        }
      };
       renderUserImage = () => {
        if (this.state.image) {
          return (
            <img
              src={`data:image/jpeg;base64,${this.state.image}`}
              alt="User"
              style={{height:150, width:150}}
            />
          );
        }
        return null;
      };
    render(){
        return( <div style={{backgroundImage:`url('https://www.freepsd360.com/wp-content/uploads/2022/11/Stage-Light-Background-HD-Free-Download-4.jpg')`, height: '1170px'}}>
             <div className = "contair"><br/>
                        <div className='btn-group btn-group-lg d-flex ' role="group" aria-label="....">
                            <button type="button" className="btn btn-outline-light w-100" onClick={()=>this.handleHomePage()}>Home Page</button>
                            <button type="button" className="btn btn-outline-light w-100 active" >edit</button>
                            <button type="button" className="btn btn-outline-light w-100" onClick={()=>this.handleLogout()}>{"LOGOUT"}</button>
                        </div>
                        </div>
            
               <div className = "container">
                    <div className = "row">
                        <div className = " w-50 vh-50 justify-content-center align-items-center" style={{ margin: '5rem',backgroundColor:'' }}>
                            
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                          <h3 className="text-center" style={{fontFamily:'cursive',color:'gold'}} >Update employee</h3>
                                        <label style={{fontFamily:'-moz-initial',color:'gold'}}> First Name: </label>
                                        <input placeholder="First Name" name="firstName" className="form-control" 
                                            value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                          
                                    </div>
                                    <div className = "form-group">
                                        <label style={{fontFamily:'-moz-initial',color:'gold'}}> Last Name: </label>
                                        <input placeholder="Last Name" name="lastName" className="form-control" 
                                            value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label style={{fontFamily:'-moz-initial',color:'gold'}}> Email Id: </label>
                                        <input placeholder="Email Address" name="emailId" className="form-control" 
                                            value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label style={{fontFamily:'-moz-initial',color:'gold'}}> Department: </label>
                                        <select placeholder="Department" name="department" className="form-control" 
                                            value={this.state.department} required onChange={this.changeDepartmentHandler}>
                                               <option>None</option>
                                                <option>FullStackDeveloper</option>
                                                <option>Tester</option>
                                                <option>JavaDeveloper</option>
                                                <option>sales</option>

                                         </select>
                                    </div>
                                    <div className = "form-group">
                                        <label  type="top-down" style={{fontFamily:'-moz-initial',color:'gold'}}> Salary: </label>
                                        <input placeholder="salary" type="number"  name="salary" className="form-control" 
                                            value={this.state.salary} onChange={this.changeSalaryHandler}/>
                                    </div>
                                    <div className = "form-group">
                                       
                                        {/* <select placeholder="Enter M or F" name="gender" className="form-control" 
                                            value={this.state.gender} onChange={this.changeGenderHandler}>
                                                 <option>None</option>
                                                <option>Male</option>
                                                <option>Female</option>
                                        </select> */}
                                        <div className="radio">
                                        <label style={{fontFamily:'-moz-initial',color:'gold'}}> Gender:&nbsp; </label>
                                    <label style={{fontFamily:'-moz-initial',color:'gold',fontSize:20}}>
                                        <input
                                           type="radio"
                                           value="Male"
                                           checked={this.state.gender === "Male"}
                                            onChange={this.changeGenderHandler}
                                               />
                                            Male &nbsp;  
                                            </label>
                                    <label style={{fontFamily:'-moz-initial',color:'gold',fontSize:20}}>
                                        <input
                                           type="radio"
                                           value="Female"
                                           checked={this.state.gender === "Female"}
                                            onChange={this.changeGenderHandler}
                                               />
                                            Female
                                            </label>
                                          </div>
                                    </div>
                                    <div className = "form-group">
                                        <label style={{fontFamily:'-moz-initial',color:'gold'}}> DateofBirth: </label>
                                        <input placeholder="dob" name="dob" className="form-control"  type='date'
                                            value={this.state.dob} onChange={this.changeDobHandler}/>
                                    </div>
                                    <div className="form-group">
                                          <label style={{fontFamily:'-moz-initial',color:'gold'}} >Image</label>
                                          <input type="file"  accept="image/*"   onChange={this.handleImageChange}  className="form-control"  required />
                                             {this.renderUserImage()}
                                          <small className="form-text text-muted">Upload a profile picture for the user.</small>
                                    </div>
                                    <div className = "form-group">

                                    <Link to='/employees'><button className="btn btn-success"  onClick={this.updateEmployee}>Save</button></Link>
                                    <Link to='/employees'> <button className="btn btn-danger"  style={{marginLeft: "10px"}}>Cancel</button></Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

               </div>
        </div>
    )
}
        
    }


export default withRouter(UpdateEmployeeComponent)
