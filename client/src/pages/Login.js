import React, { useState } from "react";
import { Button, Checkbox, Container, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router";

export default function Login() {
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [values, setvalues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const onChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
    update(_, result) {
      navigate("../", { replace: true });
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.errors);
      setErrors(err.graphQLErrors[0].extensions.errors);
      // setErrors(
      //   err && err.graphQLErrors[0]
      //     ? err.graphQLErrors[0].extensions.exception.errors
      //     : {}
      // );
    },
    variables: values,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    loginUser();
  };

  return (
    <React.Fragment>
      <Container>
        <Form
          onSubmit={onSubmit}
          noValidate
          className={loading ? "loading" : ""}
        >
          <h1>Login</h1>
          <Form.Input
            label="Username"
            placeholder="Username.."
            name="username"
            type="text"
            value={values.username}
            error={errors.username ? true : false}
            onChange={onChange}
          />
          <Form.Input
            label="Password"
            placeholder="Password.."
            name="password"
            type="password"
            value={values.password}
            error={errors.password ? true : false}
            onChange={onChange}
          />
          <Button type="submit" primary>
            Login
          </Button>
        </Form>
        {Object.keys(errors).length > 0 && (
          <div className="ui error message">
            <ul className="list">
              {Object.values(errors).map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </React.Fragment>
  );
}
const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
