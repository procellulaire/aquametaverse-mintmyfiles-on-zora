import React from "react";
import { Dropdown } from "react-bootstrap";

export default function TestPage() {
    const handleOnChange = (e) => {
        //setForm({ ...form, [e.target.id]: e.target.value });
        console.log("value",e.target.value)
        console.log("id",e.target.id)
      };
  return (
    <div>
      <Dropdown onChange={handleOnChange} id="edition">
                <Dropdown.Toggle variant="success">
                  Edition Size
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item  onChange={handleOnChange} value="Open Edition">Open Edition</Dropdown.Item>
                  <Dropdown.Item  onChange={handleOnChange} value="Fixed">Fixed</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              

              <select id="edition" onChange={handleOnChange} className="dropdown-toggle btn btn-success" >
                  <option value="Java">Java</option>
                  <option value="C++">C++</option>
               </select>
    </div>
  );
}
