import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [myStudemt, setMyStudemt] = useState([]);
  const getDataApi = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api");
      setMyStudemt(res.data);
      //console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/${id}`);
    } catch (error) {
      console.log(error.message);
    }
    console.log("clicked", id);
  };

  useEffect(() => {
    getDataApi();
    return () => {};
  }, [handleDelete]);

  return (
    <>
      <div className="nav-div">
        <div>
          <h1>Student App</h1>
        </div>
        <div>
          <Link to="/new">
            <Button variant="outlined" startIcon={<AddIcon />}>
              Add
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <table id="students">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myStudemt && myStudemt.length > 0
              ? myStudemt.map((students) => {
                  const { id, name, dept } = students;
                  return (
                    <>
                      <tr key={id}>
                        <td>{id}</td>
                        <td>{name}</td>
                        <td>{dept}</td>
                        <td>
                          <Link to={`/edit/${id}`}>
                            <Button variant="outlined" startIcon={<EditIcon />}>
                              Edit
                            </Button>
                          </Link>

                          <Button
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDelete(`${id}`)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    </>
                  );
                })
              : "No Data Found"}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
