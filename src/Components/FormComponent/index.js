import React, { Component, Fragment } from "react";
import ListComponent from "../ListComponent";
import { Row, Col } from "reactstrap";
import { Button, Input, InputGroup, InputGroupAddon } from "reactstrap";
import "./style.css";

class FormComponent extends Component {
  constructor(p) {
    super(p);
    this.state = {
      tag1: null,
      tag2: null,
      data: null,
      isLoad:true,
    };
  }
  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };
  enterPressed(event) {
    var code = event.keyCode || event.which;
    if(code === 13) { 
      this.sendtags()
    } 
}
  sendtags = () => {
    if (this.state.tag1 && this.state.tag2) {
      this.fetchdata()
    } else {
      alert("Fill Both the Tags To get Search Results");
    }
  };
  async fetchdata() {
    const { tag1, tag2 } = this.state;
    this.setState({isLoad:false})
    var response = await fetch(
      `https://api.github.com/search/commits?q=${tag1} ${tag2}`,
      { headers: { Accept: "  application/vnd.github.cloak-preview" } }
    );
    var data = await response.json();
    this.setState({ data: data});
  }
  render() {
    var LIST;
    if(this.state.isLoad && this.state.data == null){
      LIST=<div className="nodata">ENTER TAGS TO BEGIN SEARCH</div>
    }
    if(this.state.isLoad == false)
    {
      LIST=<div className="nodata">FETCHING DATA.....</div>
    }
    if(this.state.isLoad == false && this.state.data !=null){
      LIST=<ListComponent data={this.state.data}></ListComponent>
    }
    
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
                onKeyPress={this.enterPressed.bind(this)}
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
                onKeyPress={this.enterPressed.bind(this)}
              />
            </InputGroup>
          </Col>
          <Col md="2">
            <Button color="primary" onClick={this.sendtags}>
              FindCommits
            </Button>
          </Col>
        </Row>

        {LIST}
      </Fragment>
    );
  }
}

export default FormComponent;
