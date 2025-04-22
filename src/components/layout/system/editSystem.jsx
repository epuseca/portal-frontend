import { Form, Input, Modal, notification } from "antd";
import { useEffect } from "react";
import { updateSystemApi } from "../../../utils/api";

const EditSystemModal = ({ visible, onClose, system, onUpdate }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (system) {
            form.setFieldsValue(system);
        }
    }, [system, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const payload = { ...values, id: system._id };
            console.log("Payload:", payload)
            const res = await updateSystemApi(payload);
            notification.success({ message: "System updated successfully" });
            onUpdate(res);
            onClose();
        } catch (err) {
            notification.error({ message: "Update failed", description: err.message });
        }
    };

    return (
        <Modal
            title="System User"
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
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: "Please input description" }]}
                >
                    <Input.TextArea rows={3} />
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
