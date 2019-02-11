import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Button } from 'antd';
import API from '../../utils/AUTH';
import './Register.css';
    
  class RegistrationForm extends Component {
    constructor(props) {
      super(props)
      this.state = {
        confirmDirty: false,
        autoCompleteResult: [],
        error: '',
        validateStatus: '',
      };
    }

  
    handleSubmit = (e) => {
      e.preventDefault();
      // hide the register popover
      this.props.hide();
      this.setState({ validateStatus: '' })
      this.setState({ error: '' })
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
        API.signup(values)
        .then((res, err) => {
          if (err) {
            console.log(err);
          }
          else {
            console.log(res)
            API.login(res.data.email, res.data.password)
            this.props.login(res.data.email)

            if(res.data.error) {
              console.log(res.data.error)
              const errorMessage = res.data.error
              this.setState({ validateStatus: "error" })
              this.setState({ error: errorMessage })
            };
          }
        })
        ;
      });
    }
    resetValidate = () => {
      this.setState({ validateStatus: '' })
      this.setState({ error: '' })
    }
    handleConfirmBlur = (e) => {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
  
    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('👯‍Passwords must match!👯‍');
      } else {
        callback();
      }
    }
  
    validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    }
  
    render() {
      const { getFieldDecorator } = this.props.form;
  
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
  
      return (
        <Form 
          onSubmit={this.handleSubmit}
          layout="vertical"

          >
          <Form.Item
            {...formItemLayout}
            label="E-mail"
            validateStatus={this.state.validateStatus}
            help={this.state.error}
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input onChange={this.resetValidate}/>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Password"
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please input your password!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input type="password" />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Confirm Password"
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} />
            )}
          </Form.Item>   
          <Form.Item
            {...formItemLayout}
            label={(
                <span>
                  Phone Number&nbsp;
                  <Tooltip title="📟To enable text notifications of downloads📟">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              )}
          >
            {getFieldDecorator('phone', {
              rules: [{ required: false, message: 'Please input your phone number!' }],
            })(
              <Input style={{ width: '100%' }} />
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Register</Button>
          </Form.Item>
        </Form>
      );
    }
  }
  
  const Register = Form.create({ name: 'register' })(RegistrationForm);
  
  export { Register };