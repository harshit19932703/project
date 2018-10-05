import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Col
} from "reactstrap";
import "./style.css";

class ListComponent extends Component {
  constructor(p) {
    super(p);
  }

  render() {
    const mydata = (this.props.data || []).items || [];
    var content;
    if (this.props.data === null) {
      content = <div className="nodata">ENTER TAGS TO BEGIN SEARCH</div>;
    } else if (this.props.data) {
      var len = ((this.props.data || {}).items || []).length;
      if (len >= 1) {
        content = mydata.map((item, i) => {
          if (item.author != null) {
            var dp = item.author.avatar_url;
          }
          return (
            <Col md="3" key={i}>
              <Card>
                <a href={item.author ? item.author.html_url : ''} target="_blank"><CardImg top width="100px" src={dp} alt="Github Image Link" /></a>
                <CardBody>
                <a href={item.author ? item.author.html_url : ''} target="_blank"> <CardTitle>Author : {item.commit.author.name} </CardTitle></a>
                  <CardSubtitle>
                    Committer: {item.commit.committer.name}
                  </CardSubtitle>
                  <CardText>CommitMessage: {item.commit.message}</CardText>
                </CardBody>
              </Card>
            </Col>
          );
        });
      } else {
        content = (
          <div className="nodata">NO DATA FOR THESE TAGS.TRY AGAIN!!</div>
        );
      }
    }
    return <div className="cardclass">{content}</div>;
  }
}

export default ListComponent;
