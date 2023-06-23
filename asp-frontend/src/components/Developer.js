import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useEffect, useState } from "react";
 
function Developer() {
 
const [id, setId] = useState("");
const [devName, setName] = useState("");
const [software, setSoftware] = useState("");
const [developers, setDevs] = useState([]);
  useEffect(() => {
    (async () => await Load())();
  }, []);
  async function Load() {
    
    const result = await axios.get("https://localhost:7228/api/Developer/GetDeveloper");
    setDevs(result.data);
    console.log(result.data);
  }
  async function save(event) {
  
   // event.preventDefault();
    try {
      
          if(devName!=="" || software!==""){
            await axios.post("https://localhost:7228/api/Developer/AddDeveloper", {
            
            devName: devName,
            software: software,
          
          });
          alert("You have registered a developer");
              setId("");
              setName("");
              setSoftware("");
              Load();
          }
          else{
            alert("please insert required details before you can register a developer");
          }
         
    } 
    catch (err) {
      alert(err);
    }
  }
 
  async function editDeveloper(developers) {
    setName(developers.devName);
    setSoftware(developers.software);
    setId(developers.id);
  }
 
  async function DeleteDeveloper(id) {
  await axios.delete("https://localhost:7228/api/Developer/DeleteDeveloper/" + id);
   alert("You deleted a developer of id " + id);
   setId("");
   setName("");
   setSoftware("");
   Load();
  }
 
  async function update(event) {
    event.preventDefault();
    try {
 
  await axios.patch("https://localhost:7228/api/Developer/UpdateDeveloper/"+  id, //developers.find((u) => u.id === id).id ||
        {
          id: id,
          devName: devName,
          software: software,
        }
      );
      alert("Developer Updated");
      setId("");
      setName("");
      setSoftware("");
      Load();

    } catch (err) {
      alert(err);
    }
  }
 
    return (
      <div>
        <h1  align="center" >Developer Information</h1>
      <div class="container mt-4">
        <form>
          <div class="form-group">
          
            <input
              type="text"
              class="form-control"
              id="id"
              hidden
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
 
            <label>Developer Name</label>
            <input
              type="text"
              class="form-control"
              id="devName"
              value={devName}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>Software</label>
            <input
              type="text"
              class="form-control"
              id="software"
              value={software}
              onChange={(event) => {
                setSoftware(event.target.value);
              }}
            />
          </div>
          <div>
            <button class="btn btn-primary mt-4" onClick={save}>
              Register
            </button>
            <button class="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>
      <br></br>
 
      <table class="table table-primary" align="center">
        <thead>
          <tr>
            <th scope="col">Developer Id</th>
            <th scope="col">Developer Name</th>
            <th scope="col">Software</th>     
            <th scope="col">Option</th>
          </tr>
        </thead>
        {developers.map((developer) =>{ //mapping through an array of developers
          return (
            <tbody>
              <tr>
                <th scope="row">{developer.id} </th>
                <td>{developer.devName}</td>
                <td>{developer.software}</td>
                
                <td>
                  <button
                    type="button"
                    class="btn btn-warning"
                    onClick={() => editDeveloper(developer)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => DeleteDeveloper(developer.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
        
      </div>
    );
  }
  
  export default Developer;