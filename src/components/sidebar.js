import React, { useState } from "react";
import Sidebar from "react-sidebar";
import { Button, InputGroup, Input } from "reactstrap";
import { ToastContainer } from "react-toastify";
import List from "./list";
import { toastify } from "./toastify";
import { confirm_alert } from "./confirmAlert";

const SidebarComp = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddDisabled, setIsAddDisabled] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [list, setList] = useState([]);
  const [index, setIndex] = useState();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const onChangeHandler = () => {
    if (
      document.getElementById("firstName").value !== "" &&
      document.getElementById("lastName").value !== ""
    ) {
      setIsAddDisabled(false);
    } else {
      setIsAddDisabled(true);
    }
  };

  const addValueHandler = () => {
    if (!isEdit) {
      setList([
        ...list,
        {
          key: Math.random().toString().substring(0, 10),
          firstName: document.getElementById("firstName").value,
          lastName: document.getElementById("lastName").value,
        },
      ]);
      document.getElementById("firstName").value = "";
      document.getElementById("lastName").value = "";
      toggleSidebar();
      setIsAddDisabled(true);
      toastify("Value added successfully!", "success");
    } else {
      let newList = [...list];
      newList[index] = {
        key: list[index].key,
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
      };
      setList(newList);
      setIsSidebarOpen(false);
      setIsEdit(false);
      document.getElementById("firstName").value = "";
      document.getElementById("lastName").value = "";
      setIsAddDisabled(true);
      toastify("Value edited successfully!", "edit");
    }
  };

  const deleteValueHandler = async (index) => {
    let result = await confirm_alert();
    if (result) {
      let newList = [...list];
      newList.splice(index, 1);
      setList(newList);
      toastify("Value deleted successfully!", "delete");
    } else {
    }
  };

  const editValueHandler = (index) => {
    setIsSidebarOpen(true);
    setIsEdit(true);
    setIndex(index);
    document.getElementById("firstName").value = list[index].firstName;
    document.getElementById("lastName").value = list[index].lastName;
  };

  return (
    <div>
      <Sidebar
        sidebar={
          <div>
            <InputGroup>
              <Input
                onChange={() => onChangeHandler()}
                id="firstName"
                placeholder="First Name"
              />
              <Input
                onChange={() => onChangeHandler()}
                id="lastName"
                placeholder="Last Name"
              />
            </InputGroup>
            <Button
              onClick={addValueHandler}
              disabled={isAddDisabled}
              color="danger"
              size="sm"
            >
              {isEdit ? "Change Value" : "Add Value"}
            </Button>
          </div>
        }
        open={isSidebarOpen}
        onSetOpen={toggleSidebar}
        styles={{ sidebar: { background: "white" } }}
      >
        <Button outline color="primary" onClick={toggleSidebar}>
          Open sidebar to add data
        </Button>
        <List
          list={list}
          deleteValueHandler={deleteValueHandler}
          editValueHandler={editValueHandler}
        />
      </Sidebar>
      <ToastContainer />
    </div>
  );
};

export default SidebarComp;
