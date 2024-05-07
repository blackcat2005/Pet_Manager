import { Button } from 'antd';
import React, { useEffect, useState } from 'react';

export const Ticket = (props) => {
    const { setStepCurrent, serviceCurrent, setServiceCurrent, dataRegister, setDataRegister } = props;
    const convertDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    }

    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');

    useEffect(() => {
        if (serviceCurrent === 'service_02') {
            setDateStart(convertDate(dataRegister.date[0].$d));
            setDateEnd(convertDate(dataRegister.date[1].$d));
        } else {
            setDateStart(convertDate(convertDate(dataRegister.date.$d)));
            setDateEnd('')
        }
    }, [])

    const handleRegister = () => {
        setDataRegister({});
        setServiceCurrent('service_01')
        setStepCurrent(0);
    }

    return (
        <div className="service-register__content__form-ticket">
            <div className='card-body'>
                <div className='card-body__header'>
                    {
                        (serviceCurrent === "service_01" && <>Phiếu khám bệnh</>)
                        ||
                        (serviceCurrent === "service_02" && <>Phiếu dịch vụ lưu trữ</>)
                        ||
                        (serviceCurrent === "service_03" && <>Phiếu dịch vụ vệ sinh làm đẹp</>)
                    }
                    <span>#ABCD</span>
                </div>
                <div className='card-body__content'>
                    <div className='card-body__content__left'>
                        <div>Thông tin thú cưng</div>
                        <div>Họ và tên: Bin</div>
                        <div>Giới tính: Đực</div>
                        <div>Tuổi: 3 tuổi</div>
                        <div>Cân nặng: 10kg</div>
                    </div>
                    <div className='card-body__content__right'>
                        <div style={{ visibility: "hidden" }}> 1</div>
                        <div>Trạng thái: <span style={{ color: "#1890ff" }}>Khởi tạo</span></div>
                        {
                            serviceCurrent === "service_02" ?
                                <>
                                    <div>Loại phòng: VIP</div>
                                    <div>Ngày bắt đầu: {dateStart}</div>
                                    <div>Ngày kết thúc: {dateEnd}</div>
                                </>
                                :
                                <>
                                    <div>Ngày khám: {dateStart}</div>
                                    <div>Ca khám: Ca 1</div>
                                    <div style={{ visibility: "hidden" }}> 1</div>
                                </>
                        }

                    </div>
                </div>
            </div>

            <div style={{ fontSize: "16px" }}>
                Bạn muốn đăng ký tiếp 1 dịch vụ khác 👉
                <Button type="primary" onClick={() => handleRegister()}>Đăng kí tiếp</Button>
            </div>

        </div>
    )
}