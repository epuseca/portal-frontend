import { Form, Input, Modal, notification } from "antd";
import { useEffect } from "react";
import { updateTagApi } from "../../../utils/api";

const EditTagModal = ({ visible, onClose, tag, onUpdate }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (tag) {
            form.setFieldsValue(tag);
        }
    }, [tag, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const payload = { ...values, id: tag._id };
            const res = await updateTagApi(payload);
            notification.success({ message: "Tag updated successfully" });
            onUpdate(res);
            onClose();
        } catch (err) {
            notification.error({ message: "Update failed", description: err.message });
        }
    };

    return (
        <Modal
            title="Tag User"
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
                    rules={[
                        { required: true, message: "Please input description" },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="listSystem"
                    label="ListSystem"
                    rules={[{ required: false, message: "Please input listSystem" }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditTagModal;
