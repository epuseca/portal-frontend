import React, { useContext, useState } from 'react';
import { UsergroupAddOutlined, HomeOutlined, MailOutlined, SettingOutlined, CodeSandboxOutlined, SlackOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

const Header = () => {

    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext)
    console.log(">>>Check auth:", auth)
    const items = [
        {
            label: (
                <Link to="/">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/MobiFone_logo.svg/768px-MobiFone_logo.svg.png"
                        alt="Logo"
                        style={{ height: '32px', verticalAlign: 'middle' }}
                    />
                </Link>
            ),
            key: 'logo',
        },
        {
            label: <Link to={'/'}>Home page</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        ...(auth.isAuthenticated ? [{
            label: <Link to={'/user'}>Users</Link>,
            key: 'user',
            icon: <UsergroupAddOutlined />,
        }] : []),
        ...(auth.isAuthenticated ? [{
            label: <Link to={'/tag'}>Tags</Link>,
            key: 'tag',
            icon: <CodeSandboxOutlined />,
        }] : []),
        ...(auth.isAuthenticated ? [{
            label: <Link to={'/system'}>Systems</Link>,
            key: 'system',
            icon: <SlackOutlined />,
        }] : []),
        {
            label: `Welcome ${auth?.user?.email ?? ""}`,
            key: 'SubMenu',
            icon: <UserOutlined />,
            children: [
                ...(auth.isAuthenticated
                    ?
                    [{
                        label: <span onClick={() => {
                            localStorage.clear("access_token");
                            setCurrent("home");
                            navigate("/");
                            setAuth({
                                isAuthenticated: false,
                                user: {
                                    email: "",
                                    name: ""
                                }
                            });
                        }}>Đăng xuất</span>,
                        key: 'logout'
                    },]
                    :
                    [{
                        label: <Link to={"/login"}>Đăng nhập</Link>,
                        key: 'login'
                    },]),
            ],
        },

    ];
    const [current, setCurrent] = useState('mail');
    const onClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
    return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items.filter(item => item.key !== 'SubMenu')} />
        <Menu mode="horizontal" selectedKeys={[]} items={[items.find(item => item.key === 'SubMenu')]} />
    </div>
);

};
export default Header;