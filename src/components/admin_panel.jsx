import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios'

const api = axios.create({
  baseURL: '/api'
})

function validateEmail(email){
  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}

function parseJwt(token) {
  if (!token) { return; }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

function AdminPanel() {
  var columns = [
    { title: 'ID', field: 'id', editable: 'never' },
    { title: 'Username', field: 'username', editable: 'never' },
    { title: 'Email', field: 'email' },
    { title: 'Date Registered', field: 'date_registered', editable: 'never' },
    { title: 'Admin', field: 'is_admin', 
      lookup : {false: 'false',
                true: 'true'}
    }
  ]
  const [data, setData] = useState([]);
  const [isAdmin, setRole] = useState(false)

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  const token = localStorage.getItem('token');

  useEffect(() => { 
    if (token){
      var userDetails = parseJwt(token)
      var user_role = userDetails.identity['is_admin']
      if (user_role == 'admin'){
        setRole(true)
      }
    }
    api.get("/userRecords")
        .then(res => {               
            setData(res.data.results)
         })
         .catch(error=>{
             console.log("Error: ", error.message)
         })
  }, [])

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = []
    if(newData.email === "" || validateEmail(newData.email) === false){
      errorList.push("Please enter a valid email")
    }
    if(errorList.length < 1){
      api.post("/userRecordsUpdate", newData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}` 
        }
    })
      .then(res => {
        const dataUpdate = [...data];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setData([...dataUpdate]);
        resolve()
        setIserror(false)
        setErrorMessages([])
      })
      .catch(error => {
        setErrorMessages(["Update failed! Server error"])
        setIserror(true)
        resolve()
        
      })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()

    }    
  }
  
  const handleRowDelete = (oldData, resolve) => {
    
    api.post("/userRecordsDelete", {id : oldData.id}, {
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
      }
    })
      .then(res => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve()
      })
      .catch(error => {
        console.log(error)
        setErrorMessages(["Delete failed! Server error"])
        setIserror(true)
        resolve()
      })
  }
  if (isAdmin){
     return (
       <div>
       <hr className="m-0"></hr>
       <section className="site-section p-3 p-lg-5 d-flex align-items-left" id="admin_panel">
         <div className="w-100">
           <h2 className="mb-5">Admin Panel</h2>
        <MaterialTable
        title="Registered Users"
        columns={columns}
        data={data}
        editable={{
          onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
              handleRowUpdate(newData, oldData, resolve);
              
          }),
          onRowDelete: (oldData) =>
          new Promise((resolve) => {
            handleRowDelete(oldData, resolve)
            window.location.reload(false)
          }),
        }}
      />
      </div>
      </section>
      </div>
    );
  }else{
    return <></>;
  }
}
export default AdminPanel;
