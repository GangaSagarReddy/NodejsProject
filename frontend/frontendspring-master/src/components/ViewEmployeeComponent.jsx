import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


export function withRouter(Children){
    return(props)=>{
        const match={params:useParams()};
        return  <Children{...props} match={match}/>
    }
}
class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then( res => {
            this.setState({employee: res.data});
        })
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
    render() {
        return (
            
            <div  style={{ backgroundImage:`url('https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700383971.jpg')` , height:'1000px'}}>
                 <div className = "contair"><br/>
                        <div className='btn-group btn-group-lg d-flex ' role="group" aria-label="....">
                            <button type="button" style={{backgroundColor:'black'}}  className="btn btn-outline-light w-100" onClick={()=>this.handleHomePage()}>Home Page</button>
                            <button type="button" style={{backgroundColor:'black'}} className="btn btn-outline-light w-100 " >Add New Employee</button>
                            <button type="button"style={{backgroundColor:'white'}} className="btn btn-outline-light w-100 active" >View</button>
                            <button type="button" style={{backgroundColor:'black'}} className="btn btn-outline-light w-100" onClick={()=>this.handleLogout()}>{"LOGOUT"}</button>
                        </div>
                        </div>
                <div>
                <Link to='/employees'> <button className="btn btn-danger" size="xl" style={{marginLeft: "10px",size:'xl'}}>{"<<Back"}</button></Link>
                </div>
                <div className = "  justify-content-center align-items-center" style={{ margin: '8rem'}}>
                <div className = "card col-md-6 onset-md-5" >
                    <h3 className = "text-center" style={{fontFamily:'cursive',color:'blue',fontSize:30}}> View Employee Details</h3>
                    <div className = "card-body">
                    <div className = "row">
                            <label style={{fontFamily:'cursive',color:'blue'}}> Employee image:  </label>
                            <div>  <img
              src={`data:image/jpeg;base64,${this.state.employee.image}`}
              alt="User"
              style={{height:150, width:150}}
            /></div>
                        </div>
                        <div className = "row">
                            <label style={{fontFamily:'cursive',color:'blue'}}> Employee First Name:  </label>
                            <div> { this.state.employee.firstName }</div>
                        </div>
                        <div className = "row">
                            <label style={{fontFamily:'cursive',color:'blue'}}> Employee Last Name: </label>
                            <div> { this.state.employee.lastName }</div>
                        </div>
                        <div className = "row">
                            <label style={{fontFamily:'cursive',color:'blue'}}> Employee Email ID: </label>
                            <div> { this.state.employee.emailId }</div>
                        </div>
                        <div className = "row">
                            <label style={{fontFamily:'cursive',color:'blue'}}> Employee Department: </label>
                            <div> { this.state.employee.department }</div>
                        </div>
                        <div className = "row">
                            <label style={{fontFamily:'cursive',color:'blue'}}> Employee Salary: </label>
                            <div> { this.state.employee.salary }</div>
                        </div>
                        <div className = "row">
                            <label style={{fontFamily:'cursive',color:'blue'}}> Employee Gender: </label>
                            <div> { this.state.employee.gender }</div>
                        </div>
                        <div className = "row">
                            <label style={{fontFamily:'cursive',color:'blue'}}> Employee DateOfBirth: </label>
                            <div> { this.state.employee.dob }</div>
                        </div>
                    </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(ViewEmployeeComponent);
