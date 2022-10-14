import { Button } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


const EditStudent = () => {

  let history = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    getDataApi()
    return () => {};
  }, []);
  const [myStudent, setMyStudent] = useState([]);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    //console.log(name,value);
    setMyStudent({ ...myStudent, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(myStudent);
    console.log(id);
    try {
      myStudent.id = id;
      await axios.put(`http://localhost:5000/api/${id}`, myStudent);
    } catch (error) {
      console.log(error.message);
    }
    history("/");
  };
  const getDataApi = async () => {
    try {
      const res = await (await axios.get(`http://localhost:5000/api/${id}`)).data
      setMyStudent(res[0])
    } catch (error) {
      console.log(error.message);
    }
  }
  

  return (
    <>
      <h2>Edit Student Data</h2>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={myStudent.name}
          onChange={handleInput}
          autoComplete="off"
        />

        <label>Department</label>
        <input
          type="text"
          name="dept"
          value={myStudent.dept}
          onChange={handleInput}
          autoComplete="off"
        />

        <Button variant="contained" component="label" onClick={handleSubmit}>
          Edit
        </Button>
      </div>
    </>
  );
};

export default EditStudent;
