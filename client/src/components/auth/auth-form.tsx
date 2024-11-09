import { useEffect, useState } from 'react';
import { Form, Input, Button, Tabs, Card, Typography, Layout } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import useLogin from '../../hooks/useLogin';
import useSignUp from '../../hooks/useSignup';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { TabPane } = Tabs;
const { Content } = Layout;

export default function AuthForm() {
    const [activeTab, setActiveTab] = useState('login');
    const { mutate: login, isSuccess: isLogIn } = useLogin();
    const { mutate: signup, isSuccess: isSignUp } = useSignUp();
    const navigate = useNavigate();


    const onFinish = (values: any) => {
        if (activeTab === "login") {
            try {
                login({ email: values.email, password: values.password });
                if (isLogIn) {
                    navigate("/me")
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error(error.message || "Something went wrong during login.");
                } else {
                    console.error("An unknown error occurred.");
                }
            }
        } else {
            try {
                signup({
                    name: values.name,
                    email: values.email,
                    password: values.confirm_password,
                });
                if (isSignUp) {
                    navigate("/me");
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error(error.message || "Something went wrong during signup.");
                } else {
                    console.error("An unknown error occurred.");
                }
            }
        }
    };

    useEffect(() => {
        if (isLogIn || isSignUp) {
            navigate("/me");
        }
    }, [isLogIn, isSignUp])

    return (
        <Layout style={ { minHeight: '100vh' } }>
            <Content style={ { display: 'flex', justifyContent: 'center', alignItems: 'center' } }>
                <Card style={ { width: '100%', maxWidth: 400 } }>
                    <Tabs activeKey={ activeTab } onChange={ setActiveTab } centered>
                        <TabPane tab="Login" key="login">
                            <Title level={ 2 } style={ { textAlign: 'center', marginBottom: 24 } }>
                                Login
                            </Title>
                            <Form
                                name="login"
                                initialValues={ { remember: true } }
                                onFinish={ onFinish }
                                layout="vertical"
                            >
                                <Form.Item
                                    name="email"
                                    rules={ [{ required: true, message: 'Please input your email!' }] }
                                >
                                    <Input prefix={ <MailOutlined /> } type="email" placeholder="Email" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={ [{ required: true, message: 'Please input your Password!' }] }
                                >
                                    <Input.Password prefix={ <LockOutlined /> } placeholder="Password" />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" style={ { width: '100%' } }>
                                        Log in
                                    </Button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                        <TabPane tab="Sign Up" key="signup">
                            <Title level={ 2 } style={ { textAlign: 'center', marginBottom: 24 } }>
                                Sign Up
                            </Title>
                            <Form
                                name="signup"
                                onFinish={ onFinish }
                                layout="vertical"
                            >
                                <Form.Item
                                    name="name"
                                    rules={ [{ required: true, message: 'Please input your Name!' }] }
                                >
                                    <Input prefix={ <UserOutlined /> } placeholder="Name" />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    rules={ [
                                        { required: true, message: 'Please input your Email!' },
                                        { type: 'email', message: 'Please enter a valid email!' }
                                    ] }
                                >
                                    <Input prefix={ <MailOutlined /> } type="email" placeholder="Email" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={ [
                                        { required: true, message: 'Please input your Password!' },
                                        { min: 6, message: 'Password must be at least 6 characters long!' }
                                    ] }
                                >
                                    <Input.Password prefix={ <LockOutlined /> } placeholder="Password" />
                                </Form.Item>
                                <Form.Item
                                    name="confirm_password"
                                    dependencies={ ['password'] }
                                    rules={ [
                                        { required: true, message: 'Please confirm your password!' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The two passwords do not match!'));
                                            },
                                        }),
                                    ] }
                                >
                                    <Input.Password prefix={ <LockOutlined /> } placeholder="Confirm Password" />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" style={ { width: '100%' } }>
                                        Sign Up
                                    </Button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Card>
            </Content>
        </Layout>
    );
}