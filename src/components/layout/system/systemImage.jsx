import { useEffect, useState } from "react";
import { getSystemByIdApi } from "../../../utils/api"; // đúng path
import { getImageSystemApi } from "../../../utils/api";

const SystemImage = ({ systemId }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchSystem = async () => {
            try {
                const system = await getSystemByIdApi(systemId);
                if (!system || !system.image || !system.image.data) {
                    setImageUrl(null);
                } else {
                    const url = await getImageSystemApi(systemId);
                    setImageUrl(url);
                }
            } catch (error) {
                console.error("Lỗi fetch system:", error);
                setImageUrl(null);
            } finally {
                setLoading(false);
            }
        };
        fetchSystem();
    }, [systemId]);
    if (loading) return <div>Loading...</div>;
    if (!imageUrl) {
        return <div>No image...</div>;
    }
    return (
        <img
            src={imageUrl}
            alt="system"
            style={{
                width: '50px',
                height: '50px',
                objectFit: 'cover',
                borderRadius: '4px'
            }}
        />
    );
};

export default SystemImage;
