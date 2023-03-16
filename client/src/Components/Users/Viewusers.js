import React, { useState, useEffect } from "react";
import { Container, Table, Modal, Form, Button } from "react-bootstrap";
import { RiEdit2Fill, RiDeleteBin5Line } from "react-icons/ri";
import ReactPaginate from "react-paginate";
import { getUser, editUser, deleteUser } from "../../Config/MyService";
import Addusers from "./Addusers";
export default function Viewusers() {
  const [userdata, setUserData] = useState([]);
  let [info, setInfo] = useState({
    fname: "",
    email: "",
    address: "",
    mobile: "",
    dept: "",
  });
  const [showadd, setShowadd] = useState(false);
  const [userval, setUserval] = useState({});
  const [searchdata, setSearchdata] = useState([]);

  const handleChange = (event) => {
    setInfo({ ...info, [event.target.name]: event.target.value });
    console.log(info);
  };
//-----------------SEARCH FUNCTIONALITY----------------------
  const EnableSearch = (event) => {
    console.log(event.target.value);
    let data = event.target.value;
    if (data !== "") {
      var newUserList = userdata.filter((val) => {
        if (val.fname.toLowerCase().includes(data.toLowerCase())) {
          return val;
        }
      });
      setSearchdata(newUserList);
    } else {
      setSearchdata(userdata);
    }
  };
//-------------------PAGINATION FUNCTIONALITY ----------------
  const dataperpage = 3;
  const [pagenumber, setPagenumber] = useState(0);
  const pagevisited = pagenumber * dataperpage;
  const pagecount = Math.ceil(userdata.length / dataperpage);
  const handlePageClicked = ({ selected }) => {
    setPagenumber(selected);
  };
//------------------------------------------------------------
  const SubmitEditUser = (id) => {
    console.log("Edit User submission");
    console.log(id);
    editUser(info, id).then((res) => {
      console.log(res.data);
      alert("User Edited Successfully");
    });
    setShowadd(false);
  };
  const EditUsers = (val) => {
    setInfo(val);
    console.log({ info });
    setShowadd(true);
    console.log(val._id);
  };

  const DeleteUser = (id) => {
    console.log("Delete user called");
    deleteUser(id).then((res) => {
      console.log(id._id);
      alert("User Deleted :(");
    });
    GetUser();
  };
  const handleClose = () => setShowadd(false);

  useEffect(() => {
    GetUser();
  }, []);

  const GetUser = () => {
    getUser().then((res) => {
      if (res.data.user) {
        console.log(res.data.user);
        let data1 = res.data.user;
        setUserData(data1);
        setSearchdata(data1);
        console.log([data1]);
        console.log(userdata);
      } else {
        console.log(res.data.err);
      }
    });
  };

  return (
    <div>
      <Container>
        <input
          type="text"
          class="form-control form-control1"
          placeholder="Search..."
          onChange={EnableSearch}
        />
        <br />
        <Table striped bordered hover responsive>
          <thead className="thead-color">
            <tr>
              <th>Id</th>
              <th>Profile</th>
              <th>FullName</th>
              <th>Email Id</th>
              <th>Address</th>
              <th>Mobile No</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          {searchdata.length > 0 ? (
            searchdata
              .slice(pagevisited, pagevisited + dataperpage)
              .map((val, index) => (
                <tbody>
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      {
                        <img
                          src={`/images/${val.myimage}`}
                          width="80px"
                          height="80px"
                          alt="No Profile found"
                        />
                      }
                    </td>
                    <td>{val.fname}</td>
                    <td>{val.email}</td>
                    <td>{val.address}</td>
                    <td>{val.mobile}</td>
                    <td>{val.dept}</td>
                    <td>
                      <RiEdit2Fill
                        color="blue"
                        size="25px"
                        onClick={() => {
                          EditUsers(val);
                        }}
                      />{" "}
                      <RiDeleteBin5Line
                        size="25px"
                        color=""
                        onClick={() => {
                          DeleteUser(val);
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              ))
          ) : (
            <tr>
              <td colSpan={8}>
                <h5>No data found</h5>
              </td>
            </tr>
          )}
        </Table>

        <Modal show={showadd} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Users Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="Formcard">
              <h4>Please Enter Your Details</h4>
              <br />
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="id"
                  id="id"
                  placeholder="Enter id"
                  value={info._id}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="fname"
                  id="fname"
                  placeholder="Enter FullName"
                  value={info.fname}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email Id"
                  value={info.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Enter Address"
                  value={info.address}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  name="mobile"
                  id="mobile"
                  placeholder="Enter Mobile No"
                  value={info.mobile}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="dept"
                  id="dept"
                  placeholder="Enter Department"
                  value={info.dept}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                onClick={() => {
                  SubmitEditUser(info._id);
                }}
              >
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          pageCount={pagecount}
          onPageChange={handlePageClicked}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
        />
        <br />
      </Container>
    </div>
  );
}
