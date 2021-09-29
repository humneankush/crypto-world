import React from "react";
import "./App.css";
import { Layout, Space, Typography } from "antd";
import { Switch, Route, Link } from "react-router-dom";
import {
  Navbar,
  HomePage,
  CryptoCurrencies,
  CryptoDetails,
  Exchanges,
  News,
} from "./components";

function App() {
  return (
    <div className="app">
      {/* navbar using flex design */}
      <div className="navbar">
        <Navbar />
      </div>
      {/* main content with footer at the end  */}
      <div className="main">
        <Layout>
          <div className="routes">
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/exchanges">
                <Exchanges />
              </Route>
              <Route exact path="/cryptocurrencies">
                <CryptoCurrencies />
              </Route>
              <Route exact path="/crypto/:coinId">
                <CryptoDetails />
              </Route>
              <Route exact path="/news">
                <News />
              </Route>
            </Switch>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            Copyright © 2021
            <Link to="/">CryptoWorld Inc.</Link> <br />
            All Rights Reserved.
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
