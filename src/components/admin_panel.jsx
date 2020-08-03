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

function MaterialTableDemo() {
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

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  useEffect(() => { 
    api.get("/userRecords")
        .then(res => {               
            setData(res.data)
         })
         .catch(error=>{
             console.log("Error")
         })
  }, [])

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = []
    if(newData.email === "" || validateEmail(newData.email) === false){
      errorList.push("Please enter a valid email")
    }

    if(errorList.length < 1){
      api.patch("/users/"+newData.id, newData)
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
    }else{
      setErrorMessages(errorList)
      setIserror(true)
      resolve()

    }    
  }

  const handleRowAdd = (newData, resolve) => {
    //validation
    let errorList = []
    if(newData.username === undefined){
      errorList.push("Please enter username")
    }
    if(newData.email === undefined || validateEmail(newData.email) === false){
      errorList.push("Please enter a valid email")
    }

    if(errorList.length < 1){ //no error
      api.post("/users", newData)
      .then(res => {
        let dataToAdd = [...data];
        dataToAdd.push(newData);
        setData(dataToAdd);
        resolve()
        setErrorMessages([])
        setIserror(false)
      })
      .catch(error => {
        setErrorMessages(["Cannot add data. Server error!"])
        setIserror(true)
        resolve()
      })
    }else{
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }
  }

  const handleRowDelete = (oldData, resolve) => {
    
    api.delete("/users/"+oldData.id)
      .then(res => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve()
      })
      .catch(error => {
        setErrorMessages(["Delete failed! Server error"])
        setIserror(true)
        resolve()
      })
  }


  return (
    <MaterialTable
      title="Registered Users"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: (newData) =>
        new Promise((resolve) => {
          handleRowAdd(newData, resolve)
        }),
        onRowUpdate: (newData, oldData) =>
        new Promise((resolve) => {
            handleRowUpdate(newData, oldData, resolve);
            
        }),
        onRowDelete: (oldData) =>
        new Promise((resolve) => {
          handleRowDelete(oldData, resolve)
        }),
      }}
    />
  );
}

export default MaterialTableDemo;
