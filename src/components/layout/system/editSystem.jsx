import { Form, Input, Modal, notification, Upload, Button } from "antd";
import { useEffect, useState } from "react";
import { editSystemApiWithImage } from "../../../utils/api"; // Import cái mới

import { UploadOutlined } from '@ant-design/icons'; // Thêm icon upload

const EditSystemModal = ({ visible, onClose, system, onUpdate }) => {
    const [form] = Form.useForm();
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (system) {
            const { name, description, linkAccess, linkInstruct, managingUnit, contactPoint } = system;
            form.setFieldsValue({ name, description, linkAccess, linkInstruct, managingUnit, contactPoint });
            setFile(null); // Reset file mỗi lần mở modal mới
        }
    }, [system, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const payload = { ...values, id: system._id };
            console.log("Payload:", payload, "Image File:", file);
            const res = await editSystemApiWithImage(payload, file);
            if (res) {
                notification.success({ message: "System updated successfully" });
                onUpdate(res);
                onClose();
            } else {
                notification.error({ message: "Update failed", description: "Error during update" });
            }
        } catch (err) {
            notification.error({ message: "Update failed", description: err.message });
        }
    };

    const propsUpload = {
        beforeUpload: (file) => {
            setFile(file);
            return false; // Không auto upload
        },
        maxCount: 1,
    };

    return (
        <Modal
            title="Edit System"
            open={visible}
            onOk={handleSubmit}
            onCancel={onClose}
            okText="Submit"
            cancelText="Cancel"
            width={800}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: "Please input name" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Upload New Image">
                    <Upload {...propsUpload} showUploadList={{ showRemoveIcon: true }}>
                        <Button icon={<UploadOutlined />}>Select Image</Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="linkAccess"
                    label="Link Access"
                >
                    <Input placeholder="https://..." />
                </Form.Item>

                <Form.Item
                    name="linkInstruct"
                    label="Link Instruct"
                >
                    <Input placeholder="https://..." />
                </Form.Item>

                <Form.Item
                    name="managingUnit"
                    label="Managing Unit"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="contactPoint"
                    label="Contact Point"
                >
                    <Input />
                </Form.Item>



            </Form>
        </Modal>
    );
};

export default EditSystemModal;
