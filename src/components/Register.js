import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adddata } from "./context/ContextProvider";

const Register = () => {
  const { udata, setUdata } = useContext(adddata);
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
  const addinpdata = async (e) => {
    e.preventDefault();
    const { name, email, age, add, des, mobile, work } = inpval;
    const res = await fetch(
      "https://vineesh-mern-crud.herokuapp.com/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          age,
          add,
          des,
          mobile,
          work,
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    if (res.status === 422 || !data) {
      alert("error");
      console.log("error");
    } else {
      alert("Data Added successfully ,U can now view edit you data ");
      console.log("Data added");
      history("/");
      setUdata(data);
    }
  };

  return (
    <div>
      <form>
        <h2>
          <center>Register Here</center>
        </h2>
        <div className="container my-3 " style={{ border: "2px solid black" }}>
          <div className=" row">
            <div className="form-group mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="exampleInputPassword1">Name</label>
              <input
                required={true}
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
                required={true}
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
                required={true}
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
                required={true}
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
                required={true}
                className="form-control"
                name="add"
                placeholder="Address"
              />
            </div>
            <div className="form-group mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="exampleInputPassword1">Mobile</label>
              <input
                type="tel"
                required={true}
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
                required={true}
                onChange={setData}
                value={inpval.des}
                placeholder="Enter description"
              />
            </div>

            <button
              type="submit"
              onClick={addinpdata}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
