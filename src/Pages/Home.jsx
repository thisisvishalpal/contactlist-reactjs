import React, { Component } from "react";
// import ContentArea from "./../components/ContentArea";
import axios from "axios";
import { List, FlexboxGrid, Avatar, Toggle,Container } from "rsuite";

const styleCenter = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "60px",
};

const slimText = {
  fontSize: "0.666em",
  color: "#97969B",
  fontWeight: "lighter",
  paddingBottom: 5,
};

const titleStyle = {
  paddingBottom: 5,
  whiteSpace: "nowrap",
  fontWeight: 500,
};

// const dataStyle = {
//   fontSize: "1.2em",
//   fontWeight: 500,
// };
class Home extends Component {
  state = {
    contactList: [],
  };
  componentDidMount = async () => {
    await axios.get("https://reqres.in/api/users?page=2").then((res) => {
      if (res.status === 200) {
        console.log(res.data.data);
        this.setState({
          contactList: res.data.data,
        });
      }
    });
  };
  render() {
    const data = this.state.contactList;
    console.log(data);
    return (
      <Container>
        <List hover>
          {this.state.contactList.map((item, index) => (
            <List.Item key={item["first_name"]} index={index}>
              <FlexboxGrid>
                <FlexboxGrid.Item colspan={8} style={styleCenter}>
                  <Avatar size="lg" circle src={item.avatar} />
                </FlexboxGrid.Item>
                <FlexboxGrid.Item
                  colspan={8}
                  style={{
                    ...styleCenter,
                    flexDirection: "column",
                    alignItems: "flex-start",
                    overflow: "hidden",
                  }}
                >
                  <div style={titleStyle}>{item["first_name"]}</div>
                  <div style={slimText}>
                    <div>{" " + item["last_name"]}</div>
                    <div>{item["email"]}</div>
                  </div>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item
                  colspan={8}
                  style={{
                    ...styleCenter,
                  }}
                >
                  <Toggle size="md" />
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </List.Item>
          ))}
        </List>
      </Container>
    );
  }
}

export default Home;
