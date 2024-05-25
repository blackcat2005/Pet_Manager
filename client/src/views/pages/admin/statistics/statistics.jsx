import './statistics.scss';
import React, { useState } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const Statistics = () => {
    const dataset = [
        {
            london: 59,
            paris: 57,
            newYork: 86,
            seoul: 21,
            month: "Jan",
        },
        {
            london: 50,
            paris: 52,
            newYork: 78,
            seoul: 28,
            month: "Fev",
        },
        {
            london: 47,
            paris: 53,
            newYork: 106,
            seoul: 41,
            month: "Mar",
        },
        {
            london: 54,
            paris: 56,
            newYork: 92,
            seoul: 73,
            month: "Apr",
        },
        {
            london: 57,
            paris: 69,
            newYork: 92,
            seoul: 99,
            month: "May",
        },
        {
            london: 60,
            paris: 63,
            newYork: 103,
            seoul: 144,
            month: "June",
        },
        {
            london: 59,
            paris: 60,
            newYork: 105,
            seoul: 319,
            month: "July",
        },
        {
            london: 65,
            paris: 60,
            newYork: 106,
            seoul: 249,
            month: "Aug",
        },
        {
            london: 51,
            paris: 51,
            newYork: 95,
            seoul: 131,
            month: "Sept",
        },
        {
            london: 60,
            paris: 65,
            newYork: 97,
            seoul: 55,
            month: "Oct",
        },
        {
            london: 67,
            paris: 64,
            newYork: 76,
            seoul: 48,
            month: "Nov",
        },
        {
            london: 61,
            paris: 70,
            newYork: 103,
            seoul: 25,
            month: "Dec",
        },
    ];

    const valueFormatter = (value) => `${value}VNĐ`;

    const chartSetting = {
        yAxis: [
            {
                label: "doanh thu (1.000.000VNĐ)",
            },
        ],
        series: [{ dataKey: "seoul", label: "Tổng doanh thu tháng", valueFormatter }],
        height: 500,
        sx: {
            [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
                transform: "translateX(-10px)",
            },
        },
    };

    return (
        <div className='statistics'>
            <div className='statistics__title'>
                statistics
            </div>
            <div className='statistics__content'>
                <div className='statistics__content__item'>
                    <Card title="Doanh thu" style={{ width: 400, height: 175 }}>
                        <div className='data'>
                            123,456 VNĐ
                        </div>
                        <div className='evaluate'>
                            <Statistic
                                title=""
                                value={11.28}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<ArrowUpOutlined />}
                                suffix="%"
                            />
                            <span className='text'>So với tháng trước</span>
                        </div>


                    </Card>
                    <Card title="Truy cập" style={{ width: 250, height: 175 }}>
                        <div className='data'>
                            8,765 lượt
                        </div>
                    </Card>
                    <Card title="Thanh toán" style={{ width: 250, height: 175 }}    >
                        <div className='data'>
                            8,765 lượt
                        </div>
                    </Card>
                </div>

                <div className='statistics__content__item'>
                    <Card title="Tỉ lệ sử dụng dịch vụ" style={{ width: '100%' }}>
                        <PieChart
                            series={[
                                {
                                    data: [
                                        { id: 0, value: 10, label: 'Khám/Chữa bệnh' },
                                        { id: 1, value: 15, label: 'Vệ sinh/Làm đẹp' },
                                        { id: 2, value: 20, label: 'Lưu trữ' },
                                    ],
                                },
                            ]}
                            width={500}
                            height={200}
                        />
                    </Card>
                </div>

                <div className='statistics__content__item'>
                    <Card title="Doanh thu" style={{ width: '100%' }}>
                        <div style={{ width: '100%' }}>
                            <BarChart
                                dataset={dataset}
                                {...chartSetting}
                            />
                        </div>

                    </Card>
                </div>

            </div>
        </div >
    )
}

export default Statistics;



