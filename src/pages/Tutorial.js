import React, { Component } from "react";

class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      objects: [
        {
          firstName: "John Carlo",
          lastName: "Franco",
          age: 30,
          occupation: "Software Engineer",
          gender: "male",
        },
        {
          firstName: "Andrew",
          lastName: "Tamayo",
          age: 30,
          occupation: "Operation Manager",
          gender: "male",
        },
        {
          firstName: "Allan",
          lastName: "Bernardo",
          age: 22,
          occupation: "Interm",
          gender: "male",
        },
        {
          firstName: "Precy",
          lastName: "Bernardo",
          age: 22,
          occupation: "Interm",
          gender: "female",
        },
        {
          firstName: "Alicia",
          lastName: "Bernardo",
          age: 22,
          occupation: "Interm",
          gender: "female",
        },
      ],
    };
  }
  render() {
    const user = this.state.objects;
    console.log("User", user);
    return (
      <>
        <div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Age</th>
                <th scope="col">Occupation</th>
                <th scope="col">Gender</th>
              </tr>
            </thead>
            <tbody>
              {user
                .filter((user) => user.gender === "male" && user.age === 30)
                .map((user) => {
                  return (
                    <>
                      <tr>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.age}</td>
                        <td>{user.occupation}</td>
                        <td>{user.gender}</td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default Tutorial;
