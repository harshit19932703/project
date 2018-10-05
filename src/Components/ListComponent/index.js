import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,Col } from 'reactstrap';
import './style.css'

class ListComponent extends Component {
  constructor(p) {
    super(p);
  }

  render() {
    const mydata = (this.props.data || []).items || [];
    var content;
    if (this.props.data === null) {
      content = <div className="nodata">ENTER TAGS TO BEGIN SEARCH</div>
    } else if (this.props.data) {
      content = mydata.map((item, i) => {
        if (item.author != null) {
          var dp = item.author.avatar_url;
        }
        return (
          <Col md="3" key={i}>
            <Card>
              <CardImg
                top
                width="100px"
                src={dp}
                alt="Github Image Link"
              />
              <CardBody>
                <CardTitle>Author : {item.commit.author.name} </CardTitle>
                <CardSubtitle>Committer: {item.commit.committer.name}</CardSubtitle>
                <CardText>CommitMessage: {item.commit.message}</CardText>
              </CardBody>
            </Card>
          </Col>
        );
      });
    }
    return <div className="cardclass">{content}</div>;
  }
}

export default ListComponent;
