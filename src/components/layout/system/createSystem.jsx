import React, { useState } from 'react';
import {
    Button,
    Col,
    Divider,
    Form,
    Image,
    Input,
    notification,
    Row,
    Typography,
    Upload,
} from 'antd';
import {
    ArrowLeftOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import MenuPage from '../menu';
import { createSystemApiWithImage } from '../../../utils/api';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const CreateSystem = () => {
    const [file, setFile] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const navigate = useNavigate();

    const onFinish = async (values) => {
        const res = await createSystemApiWithImage(values, file);
        console.log("res: ", res);
        if (res) {
            notification.success({
                message: "CREATE SYSTEM",
                description: "Success",
            });
            navigate("/system");
        } else {
            notification.error({
                message: "CREATE SYSTEM",
                description: "Error",
            });
        }
    };

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChange = ({ fileList: newFileList }) => {
        const latestFileList = newFileList.slice(-1); // chỉ giữ 1 ảnh
        setFileList(latestFileList);
        setFile(latestFileList[0]?.originFileObj || null);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <Row gutter={0}>
            <Col span={6}>
                <MenuPage
                    defaultSelectedKeys={["6"]}
                    defaultOpenKeys={["sub3"]}
                />
            </Col>
            <Col span={18} style={{ padding: 16 }}>
                <Typography.Title level={3}>Create New System</Typography.Title>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the system name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Description" name="description">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Link Access" name="linkAccess">
                        <Input placeholder="https://..." />
                    </Form.Item>

                    <Form.Item label="Link Instruction" name="linkInstruct">
                        <Input placeholder="https://..." />
                    </Form.Item>

                    <Form.Item label="Managing Unit" name="managingUnit">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Contact Point" name="contactPoint">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Upload Image">
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            beforeUpload={(file) => {
                                setFile(file);
                                return false; // prevent auto upload
                            }}
                            maxCount={1}
                        >
                            {fileList.length >= 1 ? null : uploadButton}
                        </Upload>

                        {previewImage && (
                            <Image
                                wrapperStyle={{ display: 'none' }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                }}
                                src={previewImage}
                            />
                        )}
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>

                <Divider />
                <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/system')}>
                    Back to System List
                </Button>
            </Col>
        </Row>
    );
};

export default CreateSystem;
