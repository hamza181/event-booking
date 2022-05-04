import React, { Component } from "react";
import { MyModal } from "../components/Modal";
import { Form, Input, Button, DatePicker } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { toastSuccess } from "../components/Toaster/Toaster";
import AuthContext from "../context/auth-context";

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      formData: {
        title: "",
        price: 0,
        date: "",
        description: "",
      },
    };
    this.onChange = this.onChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }
  static contextType = AuthContext;

  handleShow = () => {
    this.setState({
      modalShow: true,
    });
  };
  onClose = () => {
    this.setState({
      modalShow: false,
    });
  };

  onFinish = (values) => {
    console.log("Success:", values);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  onDateChange(date, dateString) {
    console.log(date, dateString);
    this.setState((prevState) => {
      return {
        formData: {
          ...prevState.formData,
          date: dateString,
        },
      };
    });
  }

  onChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState((prevState) => {
      return {
        formData: {
          ...prevState.formData,
          [name]: value,
        },
      };
    });
  }

  onSubmit = (e) => {
    debugger;

    let { title, price, date, description } = this.state.formData;
    console.log(
      "🚀 ~ file: Events.js ~ line 55 ~ Events ~ description",
      description
    );
    console.log("🚀 ~ file: Events.js ~ line 55 ~ Events ~ date", date);
    console.log("🚀 ~ file: Events.js ~ line 55 ~ Events ~ price", price);
    console.log("🚀 ~ file: Events.js ~ line 55 ~ Events ~ title", title);
    let requestBody = {
      query: `
              mutation {
                  createEvent(eventInput: {title: "${title}", description: "${description}", price: ${price}, date: "${date}"}) {
                    _id
                    title
                    description
                    price
                    date
                    creator {
                        _id
                        email

                    }
                  }
              }
              `,
    };

    const token = this.context.token;

    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
          debugger
        this.onClose();
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
          debugger
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render(props) {
    return (
      <>
        <div className="d-flex justify-content-center mt-2">
          <Button type="primary" onClick={this.handleShow}>
            Add Event
          </Button>
        </div>
        <MyModal
          show={this.state.modalShow}
          onHide={this.onClose}
          onSubmit={this.onSubmit}
          title="Add Event"
        >
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 18 }}
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter title" }]}
            >
              <Input name="title" onChange={this.onChange} />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              type="float"
              rules={[{ required: true, message: "Please enter price" }]}
            >
              <Input name="price" onChange={this.onChange} />
            </Form.Item>

            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "Please enter date" }]}
            >
              <DatePicker
                name="date"
                onChange={this.onDateChange}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please enter description" }]}
            >
              <TextArea name="description" rows={4} onChange={this.onChange} />
            </Form.Item>
          </Form>
        </MyModal>
      </>
    );
  }
}

export default Events;
