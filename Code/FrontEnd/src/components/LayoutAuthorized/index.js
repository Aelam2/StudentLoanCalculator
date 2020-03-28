import React from "react";
import styles from "./LayoutAuthorized.module.scss";

class LayoutAuthorized extends React.Component {
  render() {
    let { children } = this.props;
    return <div>{children}</div>;
  }
}

export default LayoutAuthorized;
