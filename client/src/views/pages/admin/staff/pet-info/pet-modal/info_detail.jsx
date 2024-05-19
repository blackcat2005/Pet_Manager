import React, { useState } from 'react';
import { Modal, Space } from 'antd';
import MedicalRecordModal from './medical_record';
import DietPlanModal from './diet_plan';

const InfoModal = ({visible, onCancel, selectedPet}) => {
    const [medicalRecordVisible, setMedicalRecordVisible] = useState(false);
    const [dietPlanVisible, setDietPlanVisible] = useState(false);

    const showMedicalRecord = () => {
        setMedicalRecordVisible(true);
    };

    const hideMedicalRecord = () => {
        setMedicalRecordVisible(false);
    };

    const showDietPlan = () => {
        setDietPlanVisible(true);
    };

    const hideDietPlan = () => {
        setDietPlanVisible(false);
    };
    
    return (
        <Modal
            title="Thông tin chi tiết"
            visible={visible}
            onCancel={onCancel}
            footer={null}
            width={900}
            >
            {selectedPet && (
            <div>
                <div style={{ display: 'flex', marginBottom: 20 }}>
                    <div style={{ flex: 1 }}>
                        <hr />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ flex: '0 0 150px', textAlign: 'center', marginRight: '20px' }}>
                                <img src={selectedPet.imgUrl} alt={selectedPet.name} style={{ borderRadius: '50%', width: 100, height: 100, marginTop: 20}} />
                            </div>
                                <div style={{ flex: 1, paddingRight: 20 }}>
                                    <p><strong>ID thú cưng:</strong> {selectedPet.id}</p>
                                    <p><strong>Tên thú cưng:</strong> {selectedPet.name}</p>
                                    <p><strong>Giới tính:</strong> {selectedPet.gender}</p>
                                    <p><strong>Tuổi:</strong> {selectedPet.age}</p>
                                    <p><strong>Cân nặng:</strong> {selectedPet.weight}</p>
                                    <p><strong>Chủng loại:</strong> {selectedPet.types}</p>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p><strong>ID khách hàng:</strong> {selectedPet.customerId}</p>
                                    <p><strong>Sức khỏe:</strong> {selectedPet.health}</p>
                                    <p><strong>Mô tả:</strong> {selectedPet.description}</p>
                                    <Space direction='vertical' size="middle">
                                    <a onClick={showMedicalRecord}>Xem hồ sơ bệnh án</a>
                                        <a onClick={showDietPlan}>Xem chế độ ăn</a>
                                    </Space>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        <MedicalRecordModal visible={medicalRecordVisible} onCancel={hideMedicalRecord} selectedPet={selectedPet}/>    
        <DietPlanModal visible={dietPlanVisible} onCancel={hideDietPlan} selectedPet={selectedPet}/>     
        </Modal>
    )
}
export default InfoModal;
