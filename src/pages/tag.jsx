import { notification, Table } from "antd";
import { useEffect, useState } from "react";
import { getTagApi } from "../utils/api";

const TagPage = () => {
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        const fetchUser = async () => {
            const res = await getTagApi()
            if (!res?.message) {
                setDataSource(res)
            } else {
                notification.error({
                    message: "Unauthorized",
                    description: res.message
                })
            }
        }
        fetchUser();
    }, [])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Id',
            dataIndex: '_id',
        },
    ];

    return (
        <div style={{ padding: 30 }}>
            <Table
                dataSource={dataSource}
                columns={columns}
                rowKey={"_id"}
            />
        </div>
    )
}
export default TagPage