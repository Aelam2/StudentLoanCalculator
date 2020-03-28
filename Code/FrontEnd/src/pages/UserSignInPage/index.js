import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { LockTwoTone, UserOutlined, FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import LoginFields from "./FormMap";
import styles from "./UserSignInPage.module.scss";

class UserSignInPage extends React.Component {
  onFinish = values => {
    console.log("Received values of form: ", values);
  };

  render() {
    return (
      <div className={`${styles.main} ${styles.login}`}>
        <Form
          name="local-login"
          initialValues={{
            remember: true
          }}
          onFinish={this.onFinish}
        >
          <Form.Item {...LoginFields.UserName}>
            <Input
              prefix={
                <UserOutlined
                  className="site-form-item-icon"
                  style={{
                    color: "#1890ff"
                  }}
                  className={styles.prefixIcon}
                />
              }
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item {...LoginFields.UserName}>
            <Input prefix={<LockTwoTone className="site-form-item-icon" className={styles.prefixIcon} />} type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a
              className="login-form-forgot"
              href=""
              style={{
                float: "right"
              }}
            >
              Forgot password
            </a>
          </Form.Item>
          <Form.Item>
            <Button size="large" className={styles.submit} type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>

          <div className={styles.other}>
            <div className={styles.alternative}>
              <Button shape="circle" className={styles.socialMedia} icon={<GoogleOutlined />} size="large" />
              <Button shape="circle" className={styles.socialMedia} icon={<FacebookOutlined />} size="large" />
            </div>

            <Link className={styles.register} to="/user/sign-up">
              Create New Account
            </Link>
          </div>
        </Form>
      </div>
    );
  }
}

export default UserSignInPage;
