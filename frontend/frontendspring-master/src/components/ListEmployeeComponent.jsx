import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';
import { Link } from 'react-router-dom';
import CreateEmployeeComponent from './CreateEmployeeComponent';
import axios from 'axios';


class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                employees: []
        }
         this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }
    

    deleteEmployee(id){
        const conf= window.confirm("Do you want to delete ?");

        if(conf){
            EmployeeService.deleteEmployee(id)
            .then( res => {
                this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
                window.location.reload();

            });
          
    
        // axios.delete('http://localhost:8090/api/v1/employees/'+id)
    
        // .then(res => {
    
        //   window.location.reload();
         
    
        // })
    
        // .catch(err => console.log(err));
    
    //     EmployeeService.deleteEmployee(id).then( res => {
    //         this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
    //     });
     }
    
}
 renderUserImage = (employee) => {
    if (employee.image && typeof employee.image === 'string') {
      const blobData = atob(employee.image);
      const arrayBuffer = new ArrayBuffer(blobData.length);
      const uintArray = new Uint8Array(arrayBuffer);
      for (let i = 0; i < blobData.length; i++) {
        uintArray[i] = blobData.charCodeAt(i);
      }
      const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
  
      const base64String = URL.createObjectURL(blob);
      return (
        <img
          src={base64String}
          alt="User"
          style={{height:70, width:70}}
        />
      );
    } else if (employee.image && Array.isArray(employee.image)) {
      const base64String = btoa(String.fromCharCode.apply(null, employee.image));
      return (
        <img
          src={`data:image/jpeg;base64,${base64String}`}
          alt="User"
          style={{height:70, width:70}}
        />
      );
    }
    return null;
  };
  
handleLogout= () =>{
    const confirm= window.confirm("Are you sure ?");
    if(confirm){
            window.location.href="/";
        }
        else{
            window.location.href="/employees";
        }
 }
    handleAdd=() =>{
        window.location.href="/add-employee"
    }
    viewEmployee(id){
        <Link to={`/view-employee/${id}`}>this.props.history.push(`/view-employee/${id}`);</Link>
    }
    editEmployee(id){
        <Link to={`/update-employee/${id}`}>this.props.history.push(`/update-employee/${id}`);</Link>
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data});
        });
    }

    addEmployee(){

        this.props.history.push('/add-employee');
    }

    render() {
        return (
            
            <div style={{backgroundImage:`url('https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=996&t=st=1686046074~exp=1686046674~hmac=44cdc311ec1c664717a43b4d23466521150e7c2cf626e80f66cc0bb3139e92ac')`, height: '900px'}}>
                 <br></br>
                 <div className='containe'>
                <div className='btn-group btn-group-lg d-flex' role="group" aria-label="....">
                <button type="button" className="btn btn-outline-dark w-100 active">Home Page</button>
                <button type="button" className="btn btn-outline-dark w-100" onClick={() =>this.handleAdd()} >Add New Employee</button>
                <button type="button" className="btn btn-outline-dark w-100" onClick={()=>this.handleLogout()}>{"LOGOUT"}</button>
                    </div>
                    </div>
                {/* <div>
                    <br/>
                <Link to='/'> <button  class="btn btn-danger btn-lg float-right" size="xl" style={{marginRight: "10px",size:'xl'}}>{"LOGOUT->"}</button></Link>
                </div> */}
                <div className='container'>
                    {/* <h2 className="text-center">Employees List</h2> */}
                    {/* <div className = "row">
                        <Link to='/add-employee'><button className='btn btn-primary'>Add Employee</button></Link>                    
                    </div> */}
                    <br></br>
                    <div className = "row">
                        <table className = "table table-striped table-bordered"  class="table table-hover">

                            <thead class='thead-dark'>
                                <tr>
                                    <th style={{height:"0px",width:"0px"}} > Employee Image</th>
                                    <th> Employee First Name</th>
                                    <th> Employee Last Name</th>
                                    <th> Employee Email Id</th>
                                    <th> Employee Department</th>
                                    <th> Employee Salary</th>
                                    <th> Employee Gender</th>
                                    <th> Employee DateOfBirth</th>
                                    <th style={{width:"300px",textAlign:"center",fontSize:'20px'}}> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map(
                                        employee => 
                                        <tr key = {employee.id}>
                                            <td style={{height:"0px",width:"0px"}}>{this.renderUserImage(employee)}</td>
                                             <td> {employee.first_name} </td>   
                                             <td> {employee.last_name}</td>
                                             <td> {employee.email_id}</td>
                                             <td> {employee.department}</td>
                                             <td> {employee.salary}</td>
                                             <td> {employee.gender}</td>
                                             <td> {employee.dob}</td>
                                             <td>
                                             <Link to={`/update-employee/${employee.id}`}><button style={{marginLeft:"20px"}} onClick={ () => this.editEmployee(employee.id)} className="btn btn-success" >Edit</button></Link>
                                             <Link to={'/employees'}><button style={{marginLeft:"20px"}} onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete </button></Link>
                                             <Link to={`/view-employee/${employee.id}`}><button style={{marginLeft:"20px"}}onClick={ () => this.viewEmployee(employee.id)} className="btn btn-info">View</button></Link>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListEmployeeComponent
