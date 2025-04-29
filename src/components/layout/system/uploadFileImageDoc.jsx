import { Upload, Button, Image, Typography, Space } from 'antd';
import { PlusOutlined, FileAddOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Text } = Typography;

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const UploadImageAndDocument = ({
    fileList,
    setFileList,
    setImageFile,
    documentFile,
    setDocumentFile,
}) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleImageChange = ({ fileList: newFileList }) => {
        const latestFileList = newFileList.slice(-1);
        setFileList(latestFileList);
        setImageFile(latestFileList[0]?.originFileObj || null);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
                <p>Image</p>
                <br/>
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleImageChange}
                    beforeUpload={(file) => {
                        setImageFile(file);
                        return false;
                    }}
                    maxCount={1}
                    style={{ width: '100%' }}
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
            </div>

            <div>
                <p >Document</p>
                <br/>
                <Upload
                    beforeUpload={(file) => {
                        setDocumentFile(file);
                        return false;
                    }}
                    maxCount={1}
                    showUploadList={documentFile ? [{ name: documentFile.name }] : false}
                >
                    <Button icon={<FileAddOutlined />}>Select Document</Button>
                </Upload>
            </div>
        </Space>
    );
};

export default UploadImageAndDocument;
