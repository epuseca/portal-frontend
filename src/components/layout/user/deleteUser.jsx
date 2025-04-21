// src/components/user/UserDeleteButton.jsx
import { Button, Popconfirm } from "antd";

const UserDeleteButton = ({ user, onDelete }) => {
    const handleConfirm = () => {
        if (onDelete && user?._id) {
            onDelete(user._id);
        }
    };

    return (
        <Popconfirm
            title={`Are you sure to delete user "${user.name}"?`}
            onConfirm={handleConfirm}
            okText="Yes"
            cancelText="No"
        >
            <Button danger>Delete</Button>
        </Popconfirm>
    );
};

export default UserDeleteButton;
