import React from "react";
import { Table, Button, Alert } from "reactstrap";

const List = (props) => {
  if (props.list.length === 0) {
    return (
      <div>
        <Alert color="danger">No data to display!</Alert>
      </div>
    );
  } else {
    const display_list = props.list.map((element, index) => {
      return (
        <div>
          <Table bordered>
            <tbody>
              <tr>
                <td>{element.key}</td>
                <td>{element.value}</td>
                <td>
                  <Button
                    color="danger"
                    onClick={() => props.deleteValueHandler(index)}
                  >
                    Delete
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => props.editValueHandler(index)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      );
    });

    return <div>{display_list}</div>;
  }
};

export default List;
