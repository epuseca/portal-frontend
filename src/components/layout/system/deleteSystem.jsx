// src/components/user/UserDeleteButton.jsx
import { Button, Popconfirm } from "antd";

const SystemDeleteButton = ({ system, onDelete }) => {
    const handleConfirm = () => {
        if (onDelete && system?._id) {
            onDelete(system._id);
        }
    };

    return (
        <Popconfirm
            title={`Are you sure to delete system: "${system.name}"?`}
            onConfirm={handleConfirm}
            okText="Yes"
            cancelText="No"
        >
            <Button danger>Delete</Button>
        </Popconfirm>
    );
};

export default SystemDeleteButton;
