// @ts-nocheck
import { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select, Upload, message, Typography, Layout, Card, Tooltip, Modal, Spin } from 'antd';
import { ExclamationCircleOutlined, InfoCircleOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import useGetUserProfile from '../hooks/useFetch';
import useUpdateProfile from '../hooks/useProfileUpdate';
import { deleteAccount, uploadAvatar } from '../api/api';
import { UserProfile } from '../utils/types';
import moment from 'moment';
import useDeleteAccount from '../hooks/useDeleteAccount';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;
const { Content } = Layout;
const { confirm } = Modal;



export default function ProfilePage() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState<UploadFile[]>([]);
    const { data, isLoading, error } = useGetUserProfile();
    const { mutate: updateProfile } = useUpdateProfile();
    const { mutate: deleteAccount, isSuccess } = useDeleteAccount();

    const onFinish = async (values: UserProfile) => {

        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('bio', values.bio);
        formData.append('gender', values.gender);
        if (avatar.length > 0) {
            formData.append('profile_picture', avatar[0].originFileObj);
        }

        try {
            await updateProfile(formData)
        } catch (error) {
            message.error("Details update failed")
        }
    };

    const handleAvatarChange = ({ fileList }: { fileList: UploadFile[] }) => {
        setAvatar(fileList);
        if (fileList.length > 0) {
            const formData = new FormData();
            formData.append('profile_picture', fileList[0].originFileObj);
            uploadAvatar(formData);
        }
    };

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                name: data?.name || "",
                email: data?.email || "",
                bio: data?.bio || "",
                gender: data?.gender || "",
                avatar: data?.avatar ? [data.avatar] : [],
            });
            if (data.profile_picture) {
                setAvatar([{ url: data.profile_picture }]);
            }
        }
    }, [data, form]);


    const showDeleteConfirm = () => {
        confirm({
            title: 'Are you sure you want to delete your account?',
            icon: <ExclamationCircleOutlined />,
            content: 'This action cannot be undone. All your data will be permanently deleted.',
            okText: 'Yes, delete my account',
            okType: 'danger',
            cancelText: 'No, keep my account',
            onOk() {
                deleteAccount();
                navigate("/");
            },
        });
    }

    if (isLoading) {
        return (
            <Layout style={ { minHeight: '100vh' } }>
                <Content style={ { display: 'flex', justifyContent: 'center', alignItems: 'center' } }>
                    <Spin size="large" />
                </Content>
            </Layout>
        );
    }

    if (error) return <div>Error loading profile</div>;

    return (
        <Layout style={ { minHeight: '100vh' } }>
            <Content style={ { padding: '50px', width: '100%', maxWidth: '800px', margin: '0 auto' } }>
                <Card style={ { width: '100%' } }>
                    <Title level={ 2 } style={ { textAlign: 'center', marginBottom: 24 } }>
                        Your Profile
                    </Title>
                    <Form
                        form={ form }
                        layout="vertical"
                        onFinish={ onFinish }
                    >
                        <Form.Item>
                            <Upload
                                listType="picture-circle"
                                fileList={ avatar }
                                onChange={ handleAvatarChange }
                                maxCount={ 1 }
                            >
                                { avatar.length === 0 && (
                                    <div>
                                        <UploadOutlined />
                                        <div style={ { marginTop: 8 } }>Upload Avatar</div>
                                    </div>
                                ) }
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            name="name"
                            label="Name"
                            rules={ [{ required: true, message: 'Please input your name!' }] }
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="Email"
                            rules={ [
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'Please enter a valid email!' },
                            ] }
                            help="This field is read-only and cannot be edited."
                        >
                            <Input readOnly suffix={
                                <Tooltip title="Email address cannot be changed.">
                                    <InfoCircleOutlined style={ { color: 'rgba(0,0,0,0.45)' } } />
                                </Tooltip>
                            } />
                        </Form.Item>

                        <Form.Item name="bio" label="Bio">
                            <Input.TextArea />
                        </Form.Item>

                        <Form.Item name="gender" label="Gender">
                            <Select>
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                                <Option value="other">Other</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={ { width: '100%' } }>
                                Update Profile
                            </Button>
                        </Form.Item>
                    </Form>
                    <div style={ { marginTop: '24px', borderTop: '1px solid #f0f0f0', paddingTop: '24px' } }>
                        <Button danger onClick={ showDeleteConfirm } style={ { width: '100%' } }>
                            Delete My Account
                        </Button>
                    </div>
                </Card>
            </Content>
        </Layout>
    );
}
