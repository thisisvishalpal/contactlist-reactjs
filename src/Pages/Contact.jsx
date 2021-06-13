import React, { Component } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
class Contact extends Component {
  state = {
    data: [{}],
  };
  componentDidMount = async () => {
    if (this.props.match.params.id) {
      const id = this.props.match.params.id.match(/\d/g).join("");
      let contactList = localStorage.getItem("contactList");
      let decryptedData = JSON.parse(contactList);
      if (decryptedData) {
        let finalContact = decryptedData.filter(
          (x) => Number(x.id) === Number(id)
        );
        this.setState({ data: finalContact });
      }
      //   this.setState({data:finalContact})
    }
  };
  render() {
    if (this.props.match.params.id) {
      return (
        <div>
          <Container>
            <Row className="text-center my-5 ">
              <Col className="d-flex justify-content-center ">
                <span className="align-middle">
                  <Card style={{ width: "14rem" }} >
                    <Card.Img
                      variant="top"
                      className="rounded-circle"
                      src={this.state.data[0].avatar}
                    />
                    <Card.Body>
                      <Card.Title>{this.state.data[0].first_name}</Card.Title>
                      <Card.Text>{this.state.data[0].email}</Card.Text>
                      <Button className="m-2" variant="primary" href="#/">
                        Go Home
                      </Button>
                    </Card.Body>
                  </Card>
                </span>
              </Col>
            </Row>
          </Container>
        </div>
      );
    } else {
      return (
        <h4 className="text-center m-5">Please Select Contacts from Home.</h4>
      );
    }
  }
}

export default Contact;
