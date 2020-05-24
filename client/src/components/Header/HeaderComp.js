// import React, {useState, useEffect} from "react";
// import {Layout, Row, Col, Button, Popover, Icon, Dropdown, Menu,  } from 'antd';
// import { WrappedLogin, Register } from "../LoginForms";
// import '../../App.css';
// const { Header } = Layout;

// function HeaderComp() {
//     const [user, setUser] = useState(null);
//     const [loggedIn, setLoggedIn] = useState(false);
//     const [loggingIn, setLoggingIn] = useState(false);
//     const [visibleLogin, setVisibleLogin] = useState(false);
//   return (
//     <Header>
//       <Row>
//         <Col
//           xs={{ span: 17, offset: 1 }}
//           sm={{ span: 8, offset: 4 }}
//           md={{ span: 6, offset: 4 }}
//         >
//           <a href="/" className="logo">
//             <span className="emojis" role="img" aria-label="smiley emoji">
//               😎
//             </span>
//             Hankflix
//             <span className="emojis" role="img" aria-label="smiley emoji">
//               👨‍🎤
//             </span>
//           </a>
//         </Col>
//         <Col xs={0} sm={0} md={10}>
//           <div className="login">
//             {/* if the user is logged in, this will appear in the header */}
//             {loggedIn === true && (
//               <div className="loggedInText">
//                 <span style={{ color: "white" }}>
//                   {user}, we've been expecting you
//                 </span>
//                 <Button className="logout" type="default" onClick={this.logout}>
//                   Logout
//                 </Button>
//               </div>
//             )}
//             {/* if they aren't currently logged in, OR logging in, display the login/register buttons */}
//             {loggingIn === false && loggedIn === false && (
//               <div>
//                 <Popover
//                   content={<WrappedLogin login={this.login} />}
//                   title="Login"
//                   trigger="click"
//                   visible={visibleLogin}
//                   onVisibleChange={this.handleVisibleChangeLogin}
//                 >
//                   <Button className="login" type="primary">
//                     Log In
//                   </Button>
//                 </Popover>
//                 <Popover
//                   content={<Register hide={this.hide} login={this.login} />}
//                   title="Register"
//                   trigger="click"
//                   visible={this.state.visible}
//                   onVisibleChange={this.handleVisibleChange}
//                 >
//                   <Button className="register" type="primary">
//                     Register
//                   </Button>
//                 </Popover>
//               </div>
//             )}
//           </div>
//         </Col>
//         <Col xs={6} sm={6} md={0} align="center">
//           {this.state.loggedIn === true && (
//             <div className="loggedInText">
//               <span style={{ color: "white" }}>
//                 <span className="emojis" role="img" aria-label="smirk emoji">
//                   😏
//                 </span>
//                 <Button className="logout" type="default" onClick={this.logout}>
//                   Logout
//                 </Button>
//               </span>
//             </div>
//           )}
//           {this.state.loggedIn === false && (
//             <Dropdown
//               onVisibleChange={this.handleVisibleChangeMenuDropdown}
//               visible={this.state.visibleMenu}
//               overlay={
//                 <Menu>
//                   <Menu.Item key="1">
//                     <Icon type="user" />
//                     <Popover
//                       content={
//                         <WrappedLogin hide={this.hide} login={this.login} />
//                       }
//                       title="Login"
//                       popupAlign={{ offset: [0, -50] }}
//                       trigger="hover"
//                       visible={this.state.visibleLoginXS}
//                       onVisibleChange={this.handleVisibleChangeLoginXS}
//                     >
//                       <Button className="loginSmall" type="primary">
//                         Log In
//                       </Button>
//                     </Popover>
//                   </Menu.Item>
//                   <Menu.Item key="2">
//                     <Icon type="form" />
//                     <Popover
//                       content={<Register hide={this.hide} login={this.login} />}
//                       title="Register"
//                       trigger="hover"
//                       visible={this.state.visibleRegisterPop}
//                       onVisibleChange={this.handleVisibleChangeRegisterPop}
//                     >
//                       <Button className="register" type="primary">
//                         Register
//                       </Button>
//                     </Popover>
//                   </Menu.Item>
//                 </Menu>
//               }
//             >
//               <Button type="primary" style={{ marginLeft: 8 }}>
//                 <Icon type="down" />
//               </Button>
//             </Dropdown>
//           )}
//         </Col>
//       </Row>
//     </Header>
//   );
// }

// export default HeaderComp;