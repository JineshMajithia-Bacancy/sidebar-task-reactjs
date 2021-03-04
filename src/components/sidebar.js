import React, { useState } from "react";
import Sidebar from "react-sidebar";
import { Button, InputGroup, Input } from "reactstrap";
import List from "./list";

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
    if (document.getElementById("input_text").value !== "") {
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
          value: document.getElementById("input_text").value,
        },
      ]);
      document.getElementById("input_text").value = "";
      toggleSidebar();
      setIsAddDisabled(true);
    } else {
      let newList = [...list];
      newList[index] = {
        key: list[index].key,
        value: document.getElementById("input_text").value,
      };
      setList(newList);
      setIsSidebarOpen(false);
      setIsEdit(false);
      document.getElementById("input_text").value = "";
      setIsAddDisabled(true);
    }
  };

  const deleteValueHandler = (index) => {
    let newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  const editValueHandler = (index) => {
    setIsSidebarOpen(true);
    setIsEdit(true);
    setIndex(index);
    document.getElementById("input_text").value = list[index].value;
  };

  return (
    <div>
      <Sidebar
        sidebar={
          <div>
            <InputGroup>
              <Input
                onChange={() => onChangeHandler()}
                id="input_text"
                placeholder="Any Value"
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
          Open sidebar
        </Button>
        <List
          list={list}
          deleteValueHandler={deleteValueHandler}
          editValueHandler={editValueHandler}
        />
      </Sidebar>
    </div>
  );
};

export default SidebarComp;
