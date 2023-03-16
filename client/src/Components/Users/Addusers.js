import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { addUser } from "../../Config/MyService";
import { useNavigate } from "react-router";
import { GrUpload } from "react-icons/gr";
export default function Addusers() {

  const navigate = useNavigate();
  let [info, setInfo] = useState({
    fname: "",
    email: "",
    address: "",
    mobile: "",
    // dept: "",
  });
  const [dept ,setDept] =  useState("")
  //--------------- Image upload -----------------
  let [image, setImage] = useState("");
  const url = image ? image : "./images/pic2.png";

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setInfo({ ...info, myimage: event.target.files[0] });
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  //-----------------------------------------------

  const inputData=(event)=>
  {
    console.log(event.target.value)
    // setDept(event.target.value);
    setInfo({ ...info,dept: event.target.value});
    console.log(info);

  }
  const handleChange = (event) => {
    setInfo({ ...info, [event.target.name]: event.target.value });
    console.log(info);
  };
  const AddUser = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("fname", info.fname);
    formData.append("email", info.email);
    formData.append("address", info.address);
    formData.append("mobile", info.mobile);
    formData.append("dept", info.dept);
    formData.append("myimage", info.myimage);
    console.log(info);
    // addUser(info).then((res) => {
    addUser(formData).then((res) => {
      if (res.data.err) {
        alert(res.data.err);
      } else {
        alert(res.data.msg);
        navigate("/");
      }
    });
  };
  return (
    <>
      <Container>
        <Form encType="multipart/form-data" className="Formcard">
          <h4>Please Enter Your Details</h4>
          <br />
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="fname"
              id="fname"
              placeholder="Enter FullName"
              onChange={handleChange}
            />
            {info.fname != '' && info.fname.length < 4 && <span className="text-danger">Name should be atleast 3 characters is Required *</span>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email Id"
              onChange={handleChange}
            />
            {info.email != '' && info.email.length < 3 && <span className="text-danger">Name should be atleast 3 characters is Required *</span>}

          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="address"
              id="address"
              placeholder="Enter Address"
              onChange={handleChange}
            />
            {info.address != '' && info.address.length < 4 && <span className="text-danger">Address should be atleast 4 characters is Required *</span>}

          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              name="mobile"
              id="mobile"
              placeholder="Enter Mobile No"
              onChange={handleChange}
            />
            {info.mobile != '' && info.mobile.length < 10 && <span className="text-danger">Mobile should be atleast 10 numbers is Required *</span>}

          </Form.Group>

          <Form.Select aria-label="Default select example" className="mb-3" onChange={inputData}>
            <option>Select Department</option>
            <option value="JS" name="dept" id="dept" >JS</option>
            <option value="REACT" name="dept" id="dept" >REACT</option>
            <option value="ANGULAR" name="dept" id="dept" >ANGULAR</option>
          </Form.Select>

          <div style={{ textAlign: "center" }}>
            <img src={url} className="filetype" width="80px" height="90px" />
            <br />
            <br />
            <label htmlFor="files">
              <GrUpload size="30px" color="blue" /> Upload your profile picture
            </label>
            <input
              type="file"
              id="files"
              style={{ display: "none" }}
              onChange={onImageChange}
              name="myimage"
              className="pl-5 mb-2 filetype"
            />
          </div>

          <Button variant="primary" type="submit" onClick={AddUser}>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}
