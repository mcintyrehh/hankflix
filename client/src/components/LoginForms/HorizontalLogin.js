import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import AUTH from "../../utils/AUTH";

  
  function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
  
  class HorizontalLoginForm extends Component {
    componentDidMount() {
      // To disabled submit button at the beginning.
      this.props.form.validateFields();
    }
  
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          console.log(values.userName, values.password)
          AUTH.login(values.userName, values.password)
          .then((res, err) => {
            if (err) {console.log(err)}
            else {console.log(res)};
          })
          this.props.login(values.userName);
        }
      });
    }
  
    render() {
      const {
        getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
      } = this.props.form;
  
      // Only show error after a field is touched.
      const userNameError = isFieldTouched('userName') && getFieldError('userName');
      const passwordError = isFieldTouched('password') && getFieldError('password');
      return (
        <Form style={{marginTop: "12.5px" }} layout="vertical" onSubmit={this.handleSubmit}>
          <Form.Item
            validateStatus={userNameError ? 'error' : ''}
            help={userNameError || ''}
          >
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </Form.Item>
          <Form.Item
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
          >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="current-password" placeholder="Password" />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }
  
  const WrappedLogin = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);
  
  export { WrappedLogin }