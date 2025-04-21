// src/components/layout/user/EditUserModal.jsx
import { Form, Input, Modal, notification } from "antd";
import { useEffect } from "react";
import { updateUserApi } from "../../../utils/api";

const EditUserModal = ({ visible, onClose, user, onUpdate }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (user) {
            form.setFieldsValue(user);
        }
    }, [user, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const payload = { ...values, id: user._id };
            const res = await updateUserApi(payload);
            notification.success({ message: "User updated successfully" });
            onUpdate(res); 
            onClose(); 
        } catch (err) {
            notification.error({ message: "Update failed", description: err.message });
        }
    };

    return (
        <Modal
            title="Edit User"
            open={visible}
            onOk={handleSubmit}
            onCancel={onClose}
            okText="Submit"
            cancelText="Cancel"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: "Please input name" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: "Please input email" },
                        { type: "email", message: "Invalid email format" }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="role"
                    label="Role"
                    rules={[{ required: true, message: "Please input role" }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditUserModal;
