import React, { useEffect, useContext, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import "../App.css";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { adddata } from "./context/ContextProvider";
import { updatedata, deldata } from "./context/ContextProvider";
const Home = () => {
  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);
  const { udata, setUdata } = useContext(adddata);
  const { updata, setUPdata } = useContext(updatedata);
  const { dltdata, setDLTdata } = useContext(deldata);
  const getdata = async (e) => {
    const res = await fetch("https://vineesh-mern-crud.herokuapp.com/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 404 || !data) {
      alert("error");
      console.log("error");
    } else {
      setUserdata(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const deleteuser = async (id) => {
    const res2 = await fetch(
      `https://vineesh-mern-crud.herokuapp.com/deleteuser/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("user deleted");
      setDLTdata(deletedata);

      getdata();
    }
  };

  return (
    <>
      {udata ? (
        <>
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>{udata.name}</strong> added succesfully!
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}
      {updata ? (
        <>
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>{updata.name}</strong> updated succesfully!
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}
      {dltdata ? (
        <>
          <div
            class="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>{dltdata.name}</strong> deleted succesfully!
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}

      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-2">
            <Link to="/register" className="btn btn-warning">
              Add data
            </Link>
          </div>
          <table className="table table-hover ">
            <thead className="table-dark mt-4">
              <tr>
                <th scope="col">Id</th>
                <th scope="col"> Name</th>
                <th scope="col">Email</th>
                <th scope="col">Work</th>
                <th scope="col">Contact</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {getuserdata.map((element, id) => {
                return (
                  <>
                    <tr>
                      <th scope="row">{id + 1}</th>
                      <td>{element.name}</td>
                      <td>{element.email}</td>
                      <td>{element.work}</td>
                      <td>{element.mobile}</td>

                      <td className="d-flex  justify-contain-between">
                        <NavLink to={`view/${element._id}`}>
                          <button className="btn btn-success">
                            {" "}
                            <VisibilityIcon />
                          </button>
                        </NavLink>

                        <NavLink to={`edit/${element._id}`}>
                          {" "}
                          <button className="btn btn-primary mx-4">
                            {" "}
                            <ModeEditOutlineTwoToneIcon />
                          </button>
                        </NavLink>

                        <button
                          className="btn btn-danger"
                          onClick={() => deleteuser(element._id)}
                        >
                          {" "}
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
