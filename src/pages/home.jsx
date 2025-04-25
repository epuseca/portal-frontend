import { DoubleRightOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons"
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
    const carouselImages = [
        'https://api.mobifone.vn/images/banner/1744624612050_mobifone-32-years.jpg',
        'https://api.mobifone.vn/images/banner/1728634466668_3.jpg',
        'https://api.mobifone.vn/images/banner/1744624612050_mobifone-32-years.jpg',
        'https://api.mobifone.vn/images/banner/1728634466668_3.jpg',
    ];

    const renderCards = (listSystem = []) => {
        return listSystem.map((system) => (
            <Col key={system._id} span={6}>
                <a
                    href={system.linkAccess}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}

                >
                    <Card
                        hoverable
                        title={system.name}
                        extra={(
                            <Popover content={(
                                <div>
                                    <p>Mô tả: {system.description}</p>
                                    <p>Link truy cập: {system.linkAccess}</p>
                                    <p>Tài liệu tham khảo: {system.linkInstruct}</p>
                                    <p>Đơn vị liên lạc: {system.contactPoint}</p>
                                    <p>Đơn vị chủ quản: {system.managingUnit}</p>
                                </div>
                            )} title={system.name} trigger="hover">
                                <span style={{ color: '#1677ff' }}>More</span>
                            </Popover>
                        )}
                        cover={
                            <img
                                alt="example"
                                src="https://api.mobifone.vn/images/banner/1744624612050_mobifone-32-years.jpg"
                                style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                            />
                        }
                    // actions={[
                    //     <SettingOutlined key="setting" />,
                    //     <DoubleRightOutlined key="access" />
                    // ]}
                    >
                        <Meta
                            avatar={<Avatar src="https://ppclink.com/wp-content/uploads/2021/12/icon_MyMobiFone.png" />}
                            title={system.name}
                            description={
                                <div style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    {system.description || "Không có mô tả"}
                                </div>
                            }
                        />
                    </Card>
                </a>
            </Col>
        ));
    };


    return (
        <>
            <Carousel autoplay>
                {carouselImages.map((src, idx) => (
                    <div key={idx}>
                        <img
                            src={src}
                            alt={`slide-${idx}`}
                            className="carousel-image"
                        />
                    </div>
                ))}
            </Carousel>
            {tagList.map((tag) => {
                const currentPage = pageMap[tag._id] || 1;
                const listSystem = tag.listSystem || [];
                const total = listSystem.length;
                const paginated = listSystem.slice((currentPage - 1) * pageSize, currentPage * pageSize);

                return (
                    <React.Fragment key={tag._id}>
                        <div style={{ marginTop: 40, margin: 20 }}>
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