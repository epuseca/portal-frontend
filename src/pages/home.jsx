import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons"
import { Avatar, Card, List, Carousel, Row, Col, Button, Pagination, Typography, Popover, Empty } from 'antd';
import React, { useEffect, useState } from "react";
import '../styles/home/slideShow.css'; // Nếu tách CSS
import { getTagApiHome } from "../utils/api";

const { Title } = Typography;
const { Meta } = Card;

const HomePage = () => {
    const [tagList, setTagList] = useState([]);
    const [pageMap, setPageMap] = useState({}); // lưu page cho từng tag._id

    const pageSize = 4;

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const res = await getTagApiHome();
                console.log("response: ", res)
                if (!res?.message) {
                    setTagList(res);
                }
            } catch (error) {
                console.error("Lỗi khi gọi API getTagApi:", error);
            }
        };
        fetchTags();
    }, []);

    const handlePageChange = (tagId, page) => {
        setPageMap(prev => ({
            ...prev,
            [tagId]: page
        }));
    };

    const renderCards = (listSystem = []) => {
        return listSystem.map((system) => (
            <Col key={system._id} span={6}>
                <Card
                    title={system.name}
                    extra={
                        <Popover content={(
                            <div>
                                <p>Mô tả: {system.description}</p>
                                <p>Link truy cập: {system.linkAccess}</p>
                                <p>Tài liệu tham khảo: {system.linkInstruct}</p>
                                <p>Đơn vị liên lạc: {system.contactPoint}</p>
                                <p>Đơn vị chủ quản: {system.managingUnit}</p>
                            </div>
                        )} title={system.name} trigger="hover">
                            <a href="#">More</a>
                        </Popover>
                    }
                    cover={
                        <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                    }
                    actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />
                    ]}
                >
                    <Meta
                        avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                        title={system.name}
                        description={system.description || "Không có mô tả"}
                    />
                </Card>
            </Col>
        ));
    };

    return (
        <>
            <Carousel autoplay>
                <div><h3>1</h3></div>
                <div><h3>2</h3></div>
                <div><h3>3</h3></div>
                <div><h3>4</h3></div>
            </Carousel>

            {tagList.map((tag) => {
                const currentPage = pageMap[tag._id] || 1;
                const listSystem = tag.listSystem || [];
                const total = listSystem.length;
                const paginated = listSystem.slice((currentPage - 1) * pageSize, currentPage * pageSize);

                return (
                    <React.Fragment key={tag._id}>
                        <div style={{ marginTop: 40 }}>
                            <Title level={3}>{tag.name}</Title>

                            {total > 0 ? (
                                <>
                                    <Row gutter={[16, 16]}>
                                        {renderCards(paginated)}
                                    </Row>

                                    {total > pageSize && (
                                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                                            <Pagination
                                                current={currentPage}
                                                pageSize={pageSize}
                                                total={total}
                                                onChange={(page) => handlePageChange(tag._id, page)}
                                            />
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div style={{ textAlign: 'center', width: '100%' }}>
                                    <Empty description="Không có hệ thống nào trong tag này" />
                                </div>
                            )}
                        </div>
                    </React.Fragment>
                );
            })}
        </>
    );
};

export default HomePage;