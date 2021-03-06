import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Table, Form, Input, Button, Image, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import data from "../data/product.json";

const { Title } = Typography;

const columns = [
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
    responsive: ["lg"],
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Stock",
    dataIndex: "stock",
  },
  {
    title: "Photo",
    dataIndex: "thumbnail",
    render: (thumbnail) => (
      <Image
        style={{ width: "70px", height: "70px", objectFit: "cover" }}
        src={thumbnail}
        alt="Product"
      />
    ),
    responsive: ["md"],
  },
  {
    title: "Action",
    dataIndex: "id",
    render: (id) => (
      <Link to={`/detail/${id}`}>
        <Button type="primary">Detail</Button>
      </Link>
    ),
  },
];

export default function Home() {
  const [productData, setProductData] = useState(data);
  const [search, setSearch] = useState(localStorage.getItem("search"));

  useEffect(() => {
    if (localStorage.getItem("search")) {
      filterProduct(localStorage.getItem("search"));
    }
  }, []);

  const onFinish = () => {
    localStorage.setItem("search", search);

    filterProduct(search);
  };

  const filterProduct = (search) => {
    const productDataFiltered = data.filter((product) => {
      return product.title
        .trim()
        .toLowerCase()
        .includes(search.trim().toLowerCase());
    });

    setProductData(productDataFiltered);
  };

  return (
    <div>
      <Title style={{ textAlign: "center", marginBottom: "20px" }} level={3}>
        Home Page
      </Title>
      <Row justify="center">
        <Col span={18}>
          <Form
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item name="search" style={{ marginBottom: "15px" }}>
              <Row justify="center">
                <Col span={16}>
                  <Input
                    placeholder="Search product by title"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Col>
                <Col span={2} style={{ backgroundColor: "red" }}>
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                    icon={<SearchOutlined />}
                  ></Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
          <Table columns={columns} dataSource={productData} rowKey="id" />
        </Col>
      </Row>
    </div>
  );
}
