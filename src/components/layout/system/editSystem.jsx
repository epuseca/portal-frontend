// src/pages/system/EditSystemModal.jsx
import { Form, Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { editSystemApiWithImage, uploadSystemDocumentApi } from "../../../utils/api";
import UploadImageAndDocument from '../system/uploadFileImageDoc';

const EditSystemModal = ({ visible, onClose, system, onUpdate }) => {
    const [form] = Form.useForm();
    const [file, setFile] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [documentFile, setDocumentFile] = useState(null);

    useEffect(() => {
        if (system) {
            const { name, description, linkAccess, managingUnit, contactPoint } = system;
            form.setFieldsValue({ name, description, linkAccess, managingUnit, contactPoint });
            if (system.imageSystem) {
                setFileList([
                    {
                        uid: '-1',
                        name: 'image.png',
                        status: 'done',
                        url: system.imageSystem,
                    }
                ]);
            } else {
                setFileList([]);
            }
            setFile(null);
            setDocumentFile(null);
        }
    }, [system, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const payload = { ...values, id: system._id };
            let res = await editSystemApiWithImage(payload, file);
            if (res) {
                if (documentFile) {
                    const uploadResult = await uploadSystemDocumentApi(res._id, documentFile);
                    // Giả sử uploadResult chứa thông tin file mới
                    if (uploadResult && uploadResult.document) {
                        res = { ...res, document: uploadResult.document };
                    }
                }
                notification.success({ message: "System updated successfully" });
                onUpdate(res); // Gửi đầy đủ thông tin đã có document mới
                onClose();
            } else {
                notification.error({ message: "Update failed", description: "Error during update" });
            }
        } catch (err) {
            notification.error({ message: "Update failed", description: err.message });
        }
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

                <Form.Item >
                    <UploadImageAndDocument
                        fileList={fileList}
                        setFileList={setFileList}
                        setImageFile={setFile}
                        documentFile={documentFile}
                        setDocumentFile={setDocumentFile}
                    />
                </Form.Item>

                <Form.Item name="description" label="Description">
                    <Input />
                </Form.Item>
                <Form.Item name="linkAccess" label="Link Access">
                    <Input placeholder="https://..." />
                </Form.Item>
                <Form.Item name="managingUnit" label="Managing Unit">
                    <Input />
                </Form.Item>
                <Form.Item name="contactPoint" label="Contact Point">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditSystemModal;
