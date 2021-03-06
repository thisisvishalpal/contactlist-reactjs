import React, { Component } from "react";
// import ContentArea from "./../components/ContentArea";
import axios from "axios";
import { List, FlexboxGrid, Avatar, Container, Alert } from "rsuite";

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
class Favourite extends Component {
  state = {
    contactList: [],
  };
  componentDidMount = async () => {
    let localStorageList = localStorage.getItem("contactList");

    if (localStorageList) {
        let z = JSON.parse(localStorageList)
        let filterContacts = z.filter(x=>x.status===true)
        // console.log(z)
      this.setState({
        contactList: filterContacts,
      });
    } else {
    await axios
      .get("https://reqres.in/api/users?page=2")
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.data);
          let data = res.data.data;
          data.map((x) => (x.status = false));
          this.setState({
            contactList: data,
          });
        }
      })
      .catch((err) => console.log(err));
  };
  };
  handleActiveInactive = async (data) => {
    const elementsIndex = this.state.contactList.findIndex(
      (element) => element.id === data.id
    );
    let newArray = [...this.state.contactList];
    newArray[elementsIndex] = {
      ...newArray[elementsIndex],
      status: !newArray[elementsIndex].status,
    };
    this.setState({
      contactList: newArray,
    });
    this.success()
    let encryUpdatedList = JSON.stringify(newArray);
    localStorage.setItem("contactList", encryUpdatedList);
    // console.log(localStorage.getItem("contactList"));
  };
  success = ()=>{
      Alert.success("Succeed")
  }
  handleContact = () =>{
      console.log('handle contact')
  }
  render() {
    // const data = this.state.contactList;
    // console.log(data);
    if(this.state.contactList.length){
      return (
        <Container>
          <List hover>
            {this.state.contactList.map((item, index) => (
              <List.Item key={item["first_name"]} index={index}    >
                <FlexboxGrid  >
                  <FlexboxGrid.Item colspan={12} style={styleCenter}>
                    <Avatar size="lg" circle src={item.avatar} />
                  </FlexboxGrid.Item>
                  <FlexboxGrid.Item
                    colspan={12}
                    style={{
                      ...styleCenter,
                      flexDirection: "column",
                      alignItems: "flex-start",
                      overflow: "hidden",
                    }}
                  >
                    <div  style={titleStyle}>{item["first_name"]}</div>
                    <div style={slimText}>
                      <div>{" " + item["last_name"]}</div>
                      <div>{item["email"]}</div>
                    </div>
                  </FlexboxGrid.Item>
                  {/* <FlexboxGrid.Item
                    colspan={8}
                    style={{
                      ...styleCenter,
                    }}
                  >
                    <Toggle
                      name="status"
                      size="md"
                      checkedChildren="Fav"
                      //   unCheckedChildren="Inactive"
                      defaultChecked={Number(item.status) === 1 ? true : false}
                      onChange={() => this.handleActiveInactive(item)}
                    />
                  </FlexboxGrid.Item> */}
                </FlexboxGrid>
              </List.Item>
            ))}
          </List>
        </Container>
      );

    }else{
      return(<h4 className="text-center m-5">
        Please Add Contacts To Favourite from Home
      </h4>)
    }
  }
}

export default Favourite;
