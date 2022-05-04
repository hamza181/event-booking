import React, { Component } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { toastSuccess } from "../components/Toaster/Toaster";
import AuthContext from "../context/auth-context";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }
  state = {
    isLogin: true,
  };

  static contextType = AuthContext;

  switchModeHandler = () => {
    this.setState((prevState) => {
      return { isLogin: !prevState.isLogin };
    });
  };

  clickLogin = () => {
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
            query {
                login(email: "${email}", password: "${password}") {
                    userId
                    token
                    tokenExpiration
                }
            }
                `,
    };

    if (!this.state.isLogin) {
      requestBody = {
        query: `
            mutation {
                createUser(userInput: {email: "${email}", password: "${password}"}) {
                    _id
                    email
                }
            }
            `,
      };
    }
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
        }
        if (this.state.isLogin) toastSuccess("Logged in successfully!");
        if (!this.state.isLogin) toastSuccess("Signup up successfully!");
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <>
        <ToastContainer />
        <Container>
          <div
            className="col-4 me-auto ms-auto mt-5"
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <Card>
              <Card.Body>
                <Form>
                  <h3 className="text-center">
                    {" "}
                    {this.state.isLogin ? "Login" : "Signup"}
                  </h3>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      ref={this.emailEl}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      ref={this.passwordEl}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-center">
                    <Button variant="primary" onClick={this.clickLogin}>
                      {this.state.isLogin ? "Login" : "Signup"}
                    </Button>
                  </div>
                  <p className="text-center mt-3">
                    {this.state.isLogin ? "Don't" : "Already"} have an account?{" "}
                    <span
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={this.switchModeHandler}
                    >
                      {this.state.isLogin ? "Register" : "Login"}
                    </span>
                  </p>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </>
    );
  }
}

export default Auth;
