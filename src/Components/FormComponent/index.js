import React, { Component, Fragment } from "react";
import ListComponent from "../ListComponent";
import { Container, Row, Col } from "reactstrap";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import "./style.css";

class FormComponent extends Component {
  constructor(p) {
    super(p);
    this.state = {
      tag1: null,
      tag2: null,
      data: null
    };
  }
  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };
  sendtags = () => {
    if (this.state.tag1 && this.state.tag2) {
      this.fetchdata();
    } else {
      alert("Fill Both the Tags To get Search Results");
    }
  };
  async fetchdata() {
    const { tag1, tag2 } = this.state;
    var response = await fetch(
      `https://api.github.com/search/commits?q=${tag1} ${tag2}`,
      { headers: { Accept: "  application/vnd.github.cloak-preview" } }
    );
    var data = await response.json();
    this.setState({ data: data });
  }
  render() {
    return (
      <Fragment>
        <Row className="container">
          <Col md="2" style={{ lineHeight: "35px" }}>
            Enter Search Tags:
          </Col>
          <Col md="4">
            <InputGroup>
              <InputGroupAddon addonType="prepend">Tag1</InputGroupAddon>
              <Input
                placeholder="Type a Tag"
                name="tag1"
                onChange={this.handleChange}
              />
            </InputGroup>
          </Col>
          <Col md="4">
            <InputGroup>
              <InputGroupAddon addonType="prepend">Tag2</InputGroupAddon>
              <Input
                placeholder="Type a Tag"
                name="tag2"
                onChange={this.handleChange}
              />
            </InputGroup>
          </Col>
          <Col md="2">
            <Button color="primary" onClick={this.sendtags}>
              FindCommits
            </Button>
          </Col>
        </Row>

        <ListComponent data={this.state.data} />
      </Fragment>
    );
  }
}

export default FormComponent;
