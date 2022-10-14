import { Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const AddStudent = () => {
  let history = useNavigate();
  const [myStudent, setMyStudent] = useState({
    name: "",
    dept: "",
  });
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMyStudent({ ...myStudent, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api", myStudent);
    } catch (error) {
      console.log(error.message);
    }
    history("/");
  };
  return (
    <>
      <h2>New Student Data</h2>
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
          ADD
        </Button>
      </div>
    </>
  );
};

export default AddStudent;
