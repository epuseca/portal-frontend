import { Form, Input, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { updateTagApi } from "../../../utils/api";
import { getSystemApi } from "../../../utils/api";

const EditTagModal = ({ visible, onClose, tag, onUpdate }) => {
    const [form] = Form.useForm();
    const [systemOptions, setSystemOptions] = useState([]);

    useEffect(() => {
        if (tag) {
            form.setFieldsValue({
                ...tag,
                listSystem: tag.listSystem?.map(system => system._id) || []
            });
        }
    }, [tag, form]);

    useEffect(() => {
        const fetchSystems = async () => {
            try {
                const res = await getSystemApi();
                setSystemOptions(res); // assuming res is array of system objects
            } catch (err) {
                notification.error({
                    message: "Error loading systems",
                    description: err.message,
                });
            }
        };
        fetchSystems();
    }, []);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const payload = { ...values, id: tag._id, };
            const res = await updateTagApi(payload);
            const fullListSystem = res.listSystem.map(id =>
                systemOptions.find(system => system._id === id)
            );
            const res_back = {
                ...res,
                listSystem: fullListSystem
            };
            notification.success({ message: "Tag updated successfully" });
            onUpdate(res_back);
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
                    rules={[{ required: false }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="listSystem"
                    label="List of Systems"
                    rules={[{ required: false }]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Select systems"
                        options={systemOptions.map(system => ({
                            label: system.name,
                            value: system._id,
                        }))}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditTagModal;
