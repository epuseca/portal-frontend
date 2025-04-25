import React, { useContext } from 'react';
import {
    LockOutlined,
    UserOutlined,
    ArrowLeftOutlined,
} from '@ant-design/icons';
import {
    LoginFormPage,
    ProFormText,
    ProFormCheckbox,
} from '@ant-design/pro-components';
import { Button, Divider, message, theme } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../components/context/auth.context';
import { loginApi } from '../utils/api';
import loginBG from '../assets/loginBG.jpg'
const LoginPage = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);
    const { token } = theme.useToken();

    const handleLogin = async (values) => {
        const { email, password } = values;

        const res = await loginApi(email, password);
        if (res && res.EC === 0) {
            localStorage.setItem('access_token', res.access_token);
            message.success('Đăng nhập thành công!');
            setAuth({
                isAuthenticated: true,
                user: {
                    email: res?.user?.email ?? '',
                    name: res?.user?.name ?? '',
                },
            });
            navigate('/');
        } else {
            message.error(res?.EM ?? 'Đăng nhập thất bại!');
        }
    };

    return (
        <div style={{ backgroundColor: 'white', height: '100vh' }}>
            <LoginFormPage
                logo="https://ppclink.com/wp-content/uploads/2021/12/icon_MyMobiFone.png"
                title={<span style={{ color: '#000', fontFamily: 'Arial, sans-serif' }}>Portal Mobifone</span>}
                subTitle={<span style={{ color: '#000', fontFamily: 'Verdana, sans-serif' }}>Login to system</span>}
                backgroundImageUrl={loginBG}
                // backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
                containerStyle={{
                    backgroundColor: 'rgba(205, 205, 205, 0.4)',
                    backdropFilter: 'blur(4px)',
                }}
                submitter={{
                    searchConfig: {
                        submitText: 'LOG IN',
                    },
                }}
                onFinish={handleLogin}
            >
                <ProFormText
                    name="email"
                    fieldProps={{
                        size: 'large',
                        prefix: <UserOutlined className="prefixIcon" />,
                    }}
                    placeholder="Email"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập email!',
                        },
                    ]}
                />
                <ProFormText.Password
                    name="password"
                    fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined className="prefixIcon" />,
                    }}
                    placeholder="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu!',
                        },
                    ]}
                />

                <Divider />
                <Link to="/">
                    <ArrowLeftOutlined style={{ marginBottom: 30 }} /> Back to homepage
                </Link>
            </LoginFormPage>
        </div>
    );
};

export default LoginPage;
