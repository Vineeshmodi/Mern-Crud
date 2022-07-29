import pic from "./profile.PNG";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import Card from "@mui/material/Card";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import WorkIcon from "@mui/icons-material/Work";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import EmailIcon from "@mui/icons-material/Email";
import CardContent from "@mui/material/CardContent";
import DescriptionIcon from "@mui/icons-material/Description";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Detail = () => {
  const history = useNavigate();
  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);

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
      setUserdata(data);
      console.log("getdata");
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
      alert("user delete update");
      console.log("user deleted");
      history("/");
    }
  };
  return (
    <div className="container my-3">
      <h2 style={{ fontWeight: 400, textTransform: "uppercase" }}>
        WELCOME <b>{getuserdata.name}</b>
      </h2>
      <Card sx={{ maxWidth: 950 }}>
        <CardContent>
          <div className="addbtn ">
            <Link to={`/edit/${getuserdata._id}`}>
              {" "}
              <button className="btn btn-danger mx-2">
                <ModeEditOutlineTwoToneIcon />
              </button>
            </Link>
            <button
              className="btn btn-success"
              onClick={() => deleteuser(getuserdata._id)}
            >
              {" "}
              <DeleteIcon />
            </button>
          </div>

          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <img src={pic} style={{ width: "50px" }} alt=""></img>
              <h3 className="mt-3">
                Name:<span style={{ fontweight: 600 }}>{getuserdata.name}</span>
              </h3>
              <h3 className="mt-3">
                Age:<span style={{ fontweight: 600 }}>{getuserdata.age}</span>
              </h3>
              <p className="mt-3">
                <EmailIcon /> Email:
                <span style={{ fontweight: 400 }}>{getuserdata.email}</span>
              </p>
              <p className="mt-3">
                <WorkIcon /> Occupation:
                <span style={{ fontweight: 400 }}>{getuserdata.work}</span>
              </p>
            </div>
            <div className="right_view col-lg-6 col-md-6 col-12">
              <p className="mt-3">
                <PhoneEnabledIcon /> Mobile:
                <span style={{ fontweight: 300 }}>{getuserdata.mobile}</span>
              </p>
              <p className="mt-3">
                <LocationCityIcon /> Location:
                <span style={{ fontweight: 300 }}>{getuserdata.add}</span>
              </p>
              <p className="mt-3">
                <DescriptionIcon /> Description:
                <span style={{ fontweight: 300 }}>{getuserdata.des}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Detail;
