import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { updatedata } from "./context/ContextProvider";

const Edit = () => {
  /* const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata); */
  const { updata, setUPdata } = useContext(updatedata);

  const history = useNavigate();
  const [inpval, setINP] = useState({
    name: "",
    email: "",
    age: "",
    work: "",
    add: "",
    des: "",
    mobile: "",
  });

  const setData = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };
  const { id } = useParams("");
  console.log(id);

  const getdata = async () => {
    const res = await fetch(
      `https://vineesh-mern-crud.herokuapp.com/getuser/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setINP(data);
      console.log("getdata");
    }
  };
  useEffect(() => {
    getdata();
  }, []);

  const updateuser = async (e) => {
    e.preventDefault();

    const { name, email, work, add, mobile, des, age } = inpval;

    const res2 = await fetch(
      `https://vineesh-mern-crud.herokuapp.com/updateuser/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          work,
          add,
          mobile,
          des,
          age,
        }),
      }
    );

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 422 || !data2) {
      alert("fill the data");
    } else {
      setUPdata(data2);
      history("/");
    }
  };

  return (
    <div>
      <form>
        <h2>
          <center>Edit your details</center>
        </h2>
        <div className="container my-3 " style={{ border: "2px solid black" }}>
          <div className=" row">
            <div className="form-group mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="exampleInputPassword1">Name</label>
              <input
                type="text"
                value={inpval.name}
                onChange={setData}
                name="name"
                className="form-control"
                placeholder="name"
              />
            </div>

            <div className="form-group mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="exampleInputPassword1"> Email</label>
              <input
                type="email"
                value={inpval.email}
                onChange={setData}
                name="email"
                className="form-control"
                placeholder="email"
              />
            </div>

            <div className="form-group mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="exampleInputPassword1">Age</label>
              <input
                onChange={setData}
                type="number"
                value={inpval.age}
                className="form-control"
                name="age"
                placeholder="age"
              />
            </div>
            <div className="form-group mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="exampleInputPassword1">Work</label>
              <input
                type="text"
                onChange={setData}
                value={inpval.work}
                className="form-control"
                name="work"
                placeholder="work"
              />
            </div>
            <div className="form-group mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="exampleInputPassword1">Address</label>
              <input
                type="text"
                onChange={setData}
                value={inpval.add}
                className="form-control"
                name="add"
                placeholder="Address"
              />
            </div>
            <div className="form-group mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="exampleInputPassword1">Mobile</label>
              <input
                type="tel"
                onChange={setData}
                value={inpval.mobile}
                className="form-control"
                name="mobile"
                placeholder="Contact no"
              />
            </div>

            <div className="form-group mb-3 col-lg-12 col-md-12 col-12">
              <label htmlFor="exampleInputEmail1">Description</label>
              <textarea
                className="form-control"
                name="des"
                onChange={setData}
                value={inpval.des}
                placeholder="Enter description"
              />
            </div>

            <button type="submit" onClick={updateuser} class="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Edit;
