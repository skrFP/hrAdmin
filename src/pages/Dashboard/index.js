import React, { Component } from "react"
import MetaTags from "react-meta-tags"
import { Container } from "reactstrap"
import SalesAnalytics from "./SalesAnalytics"
class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>ihelp админ нүүр </title>
          </MetaTags>
          <Container fluid>
            <h4>Нүүр</h4>
            <SalesAnalytics />
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default Dashboard
