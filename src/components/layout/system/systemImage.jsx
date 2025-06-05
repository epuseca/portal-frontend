import { useEffect, useState } from "react";
import { getSystemByIdApi, getImageSystemApi } from "../../../utils/api";
import { Spin } from "antd"; // <- nếu bạn đã dùng Ant Design rồi

const SystemImage = ({ systemId,reloadKey, style }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSystem = async () => {
            try {
                // const system = await getSystemByIdApi(systemId);
                // if (!system || !system.image || !system.image.data) {
                //     setImageUrl(null);
                // } else {
                const url = await getImageSystemApi(systemId);
                setImageUrl(url);
                // }
            } catch (error) {
                console.error("Lỗi fetch system:", error);
                setImageUrl(null);
            } finally {
                setLoading(false);
            }
        };
        fetchSystem();
    }, [systemId, reloadKey]);

    const imageStyle = {
        width: '50px',
        height: '50px',
        objectFit: 'cover',
        borderRadius: '4px',
        backgroundColor: '#fff', // màu trắng nền khi loading
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...(style || {}),
    };

    if (loading) {
        return (
            <div style={imageStyle}>
                <Spin size="small" />
            </div>
        );
    }

    if (!imageUrl) {
        return (
            <div style={imageStyle}></div>
        );
    }
    

    return (
        <img
            src={imageUrl}
            alt="system"
            style={imageStyle}
        />
    );
};

export default SystemImage;
