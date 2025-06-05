import {
    DoubleRightOutlined,
    EditOutlined,
    EllipsisOutlined,
    FilterOutlined,
    SettingOutlined
} from "@ant-design/icons";
import {
    Avatar, Card, List, Carousel, Row, Col, Button, Pagination, Typography, Popover, Empty, Form, Select, Input, FloatButton, Divider
} from 'antd';
import React, { useEffect, useState } from "react";
import '../styles/home/slideShow.css';
import { getTagApiHome } from "../utils/api";
import SystemImage from "../components/layout/system/systemImage";
import DownloadButton from "../components/layout/system/downloadDoc";

const { Title } = Typography;
const { Meta } = Card;

const HomePage = () => {
    const [tagList, setTagList] = useState([]);
    const [pageMap, setPageMap] = useState({});
    const [filteredTagIds, setFilteredTagIds] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const pageSize = 8;

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const res = await getTagApiHome();
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
            <Col key={system._id} span={3}>
                <a
                    href={system.linkAccess}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                >
                    <Card
                        hoverable
                        cover={
                            <div style={{ height: '180px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {system.image ?
                                    (<SystemImage
                                        systemId={system._id}
                                        style={{ width: '100%', height: 'auto', maxHeight: '100%', objectFit: 'contain' }}
                                    />) :
                                    (<img
                                        alt="default"
                                        src="https://api.mobifone.vn/images/banner/1744624612050_mobifone-32-years.jpg"
                                        style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                                    />)
                                }
                            </div>
                        }
                        styles={{
                            body: {
                                backgroundColor: '#f5f5f5', // Màu xám nhạt
                                padding: '16px'
                            }
                        }}
                    >
                        <Meta
                            title={
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>{system.name}</span>
                                    <Popover
                                        content={(
                                            <div style={{ maxWidth: 350, whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                                <p>Mô tả: {system.description}</p>
                                                <p>Link truy cập: {system.linkAccess}</p>
                                                <p>Tài liệu tham khảo: <DownloadButton system={system} />
                                                </p>
                                                <p>Đơn vị liên lạc: {system.contactPoint}</p>
                                                <p>Đơn vị chủ quản: {system.managingUnit}</p>
                                            </div>
                                        )}
                                        title={system.name}
                                        trigger="hover"
                                    >
                                        <span style={{ color: '#1677ff', fontWeight: "normal", fontSize: "14px" }}>Info</span>
                                    </Popover>
                                </div>
                            }
                            description={(
                                <div style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    {system.description || "Không có mô tả"}
                                </div>
                            )}
                        />
                    </Card>
                </a>
            </Col>
        ));
    };

    // Bộ lọc tag
    const filteredTags = filteredTagIds.length > 0
        ? tagList.filter(tag => filteredTagIds.includes(tag._id))
        : tagList;

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
            <Form
                layout="inline"
                style={{
                    margin: '20px',
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}
            >
                <Form.Item>
                    <Select
                        mode="multiple"
                        placeholder="Filter tag"
                        allowClear
                        style={{ width: 300 }}
                        maxTagCount="responsive"
                        options={tagList.map(tag => ({
                            label: tag.name,
                            value: tag._id
                        }))}
                        onChange={setFilteredTagIds}
                    />
                </Form.Item>
                <Form.Item>
                    <Input.Search
                        placeholder="Search system"
                        allowClear
                        onSearch={(value) => setSearchKeyword(value.trim().toLowerCase())}
                        style={{ width: 300 }}
                    />
                </Form.Item>
            </Form>

            {filteredTags.map((tag, index) => {
                const currentPage = pageMap[tag._id] || 1;
                let listSystem = tag.listSystem || [];

                // Thêm filter theo search keyword
                if (searchKeyword) {
                    listSystem = listSystem.filter(system =>
                        system.name?.toLowerCase().includes(searchKeyword)
                    );
                }

                const total = listSystem.length;
                const paginated = listSystem.slice((currentPage - 1) * pageSize, currentPage * pageSize);

                return (
                    <React.Fragment key={tag._id}>
                        {/* Thêm đường kẻ ngang trước mỗi tag (trừ tag đầu tiên) */}
                        {index > 0 && <Divider style={{ margin: '40px 0' }} />}

                        <div style={{ marginTop: index === 0 ? 40 : 20, margin: 20 }}>
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
                                    <Empty description="Không có hệ thống nào phù hợp" />
                                </div>
                            )}
                        </div>
                    </React.Fragment>
                );
            })}
            <FloatButton.BackTop />
        </>
    );
};

export default HomePage;