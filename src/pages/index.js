import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import "../images/style.css";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from "react-promise-tracker";
import Loader from "react-loader-spinner";
import Container from '@material-ui/core/Container';

const IndexPage = () => {
  const [isupdate, setisupdate] = useState(false);
  const [isdelete, setisdelete] = useState(false);
  const [isload, setisload] = useState(false);
  const [mydata, setData] = useState([]);

  const LoadingIndicator = () => {
    const { promiseInProgress } = usePromiseTracker();
    return (
      promiseInProgress && (
        <div
          style={{
            width: "100%",
            height: "100",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
        </div>
      )
    );
  };

  useEffect(() => {
    console.log("useEffect Called");

    trackPromise(
      fetch(`/.netlify/functions/readall`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);

          console.log("Data: " + JSON.stringify(data));
        })
    );
  }, [isdelete, isload, isupdate]);

  //delete query

  async function deleteid(e) {
    setisdelete(true);
    console.log("deleted");
    console.log(e.ref["@ref"].id);
    await fetch(`/.netlify/functions/delete`, {
      method: "post",
      body: JSON.stringify({ id: e.ref["@ref"].id }),
    });
    setisdelete(false);
  }

  //update

  async function updateid(e) {
    setisupdate(true);
    console.log("updated");
    const inputname = prompt("Enter Name");
    const inputage = prompt("Enter Age");
    const inputcnic = prompt("Enter Cnic");
    const inputemail = prompt("Enter Email");
    console.log(e.ref["@ref"].id);
    await fetch(`/.netlify/functions/update`, {
      method: "post",
      body: JSON.stringify({
        id: e.ref["@ref"].id,
        updatename: inputname,
        updateage: inputage,
        updatecnic: inputcnic,
        updateemail: inputemail,
      }),
    });
    setisupdate(false);
  }

  return (
    <div>
    
      <Formik
        initialValues={{ name: "", age: "", cnic: "" , email:"" }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Required";
          }
        }}
        //create query

        onSubmit={(values) => {
          console.log(values);
          setisload(true);
          fetch(`/.netlify/functions/create`, {
            method: "post",
            body: JSON.stringify(values),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Data: " + JSON.stringify(data));
            });
          setisload(false);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
        
        <div className="card">
            <h1>CRUD APP!</h1>
            <form id="create-course-form" onSubmit={handleSubmit}>
              <TextField
                id="outlined-basic"
                label="NAME"
                variant="outlined"
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <br />
              <br />
              <TextField
                id="outlined-basic"
                label="Age"
                variant="outlined"
                type="number"
                name="age"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.age}
              />
              <br />
              <br />
              <TextField
                id="outlined-basic"
                label="CNIC"
                variant="outlined"
                type="number"
                name="cnic"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cnic}
              />
              <br />
              <br />
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                // style={{ background: "green" }}
                onClick={handleSubmit}
              >
                ADD
              </Button>
            </form>{" "}
          </div>
        )}
      </Formik>

      <br />
      <br />

      <h3 alignItems="center">DATABASE </h3>
      <LoadingIndicator />
      
    <div className="table"> 
          <table className="customers">
            <tr className="customers tr">
              <th className="customers td ">Name</th>
              <th className="customers td "> Email</th>
              <th className="customers td "> Cnic</th>
              <th className="customers td ">Age</th>
              <th className="customers td "> Update</th>

              <th className="customers td "> Delete</th>
            </tr>
            {mydata.map((e) => {
              const id = e.ref["@ref"].id;
              console.log(id);
              return (
                <tr className="customers tr">
                  <td className="customers td ">{e.data.name}</td>
                  <td className="customers td ">{e.data.email}</td>
                  <td className="customers td ">{e.data.cnic}</td>
                  <td className="customers td ">{e.data.age}</td>

                  <td>
                    <Button
                      style={{ fontSize: "10px", width: "3px" }}
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        deleteid(e);
                      }}
                    >
                      delete{" "}
                    </Button>
                  </td>
                  <td>
                    <Button
                      style={{ fontSize: "10px", width: "3px", radius: "50%" }}
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        updateid(e);
                      }}
                    >
                      {" "}
                      update{" "}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </table>
          </div>
        
    </div>
  );
};

export default IndexPage;
