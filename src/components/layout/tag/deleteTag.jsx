// src/components/user/UserDeleteButton.jsx
import { Button, Popconfirm } from "antd";

const TagDeleteButton = ({ tag, onDelete }) => {
    const handleConfirm = () => {
        if (onDelete && tag?._id) {
            onDelete(tag._id);
        }
    };

    return (
        <Popconfirm
            title={`Are you sure to delete user "${tag.name}"?`}
            onConfirm={handleConfirm}
            okText="Yes"
            cancelText="No"
        >
            <Button danger>Delete</Button>
        </Popconfirm>
    );
};

export default TagDeleteButton;
