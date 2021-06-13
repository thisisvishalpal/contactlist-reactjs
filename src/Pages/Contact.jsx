import React, { Component } from "react";
import { Card, Button, Container,Row,Col } from "react-bootstrap";
import axios from 'axios';
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
      }else{
        await axios
      .get("https://reqres.in/api/users?page=2")
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.data.data);
          let data = res.data.data;
          data.map((x) => (x.status = false));
          let finalContact = data.filter(
            (x) => Number(x.id) === Number(id)
          );
          this.setState({
             data:finalContact
          });
        }
      })
      .catch((err) => console.log(err));
      }
      //   this.setState({data:finalContact})
    }
  };
  render() {
    if (this.props.match.params.id) {
      return (
        <div>
          <Container  >
            <Row className='text-center my-5 '>
              <Col className="d-flex justify-content-center " >
                <Card style={{ width: "14rem" }} className="align-middle">
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
              </Col>
            </Row>
          </Container>
        </div>
      );
    } else {
      return (<h4 className="text-center m-5">
      Please Select Contacts from Home.
    </h4>);
    }
  }
}

export default Contact;
