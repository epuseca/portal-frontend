import { notification, Table } from "antd";
import { useEffect, useState } from "react";
import { getSystemApi } from "../utils/api";

const SystemPage = () => {
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        const fetchUser = async () => {
            const res = await getSystemApi()
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
            title: 'Link Access',
            dataIndex: 'linkAccess',
        },
        {
            title: 'Link Instruct',
            dataIndex: 'linkInstruct',
        },
        {
            title: 'Managing Unit',
            dataIndex: 'managingUnit',
        },
        {
            title: 'Contact Point',
            dataIndex: 'contactPoint',
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
export default SystemPage