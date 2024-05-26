import React, { useState, useEffect } from 'react'
import PetSider from './Sider'
import PetHeader from './Header'
import BasicInfo from './BasicInfo'
import { MedicalRecordSection } from './MedicalRecord'
import { ServiceTable } from './BookedService'
import DietPlan from './Diet'
import { useParams } from 'react-router-dom'
import pet from 'api/pet'

function PetInfo() {
  const [activeButton, setActiveButton] = useState('basicInfo')
  const [selectedPet, setSelectedPet] = useState({})
  const { slug } = useParams()

  useEffect(() => {
    const fetchPetInfo = async () => {
      try {
        const res = await pet.getPetInfo(slug)
        setSelectedPet(res.data)
      } catch (error) {
        console.error('Error fetching pet info:', error)
      }
    }
    fetchPetInfo()
  }, [slug])

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId)
  }

  const renderContent = () => {
    switch (activeButton) {
      case 'basicInfo':
        return <BasicInfo selectedPet={selectedPet} setSelectedPet={setSelectedPet} />
      case 'medicalRecord':
        return <MedicalRecordSection />
      case 'diet':
        return <DietPlan />
      case 'services':
        return <ServiceTable />
      default:
        return <div>Thông tin cơ bản</div>
    }
  }

  return (
    <>
      <div className="flex flex-col">
        <PetHeader />
        <div className="flex flex-col justify-center px-6 mt-3 w-full bg-white max-md:pl-5 max-md:max-w-full">
          <div className="px-10 py-10 max-md:px-5 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <PetSider
                selectedPet={selectedPet}
                activeButton={activeButton}
                onButtonClick={handleButtonClick}
              />
              <div className="flex flex-col ml-5 w-[74%] max-md:ml-0 max-md:w-full">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PetInfo
