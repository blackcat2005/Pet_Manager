import React, { useState, useEffect } from 'react';
import pet from 'api/pet';
import { useParams } from "react-router-dom";

// Hàm để lấy nhãn dựa trên tên trường
function getLabel(key) {
  switch (key) {
    case 'fullname':
      return 'Tên';
    case 'sex':
      return 'Giới tính';
    case 'species':
      return 'Loài';
    case 'age':
      return 'Tuổi';
    case 'weight':
      return 'Cân nặng';
    case 'health':
      return 'Tình trạng sức khỏe';
    case 'description':
      return 'Mô tả';
    default:
      return '';
  }
}

function FormField({ label, value, name, onChange }) {
  return (
    <div className="flex flex-col pb-6 text-sm leading-5">
      <div className="text-black text-opacity-80">{label}</div>
      <div className="flex flex-col justify-center mt-2 whitespace-nowrap bg-white rounded-sm border border-solid border-zinc-300 text-black text-opacity-30">
        <input
          name={name}
          value={value}
          onChange={onChange}
          className="justify-center items-start px-3 py-1.5 bg-white rounded-sm border border-solid border-zinc-300 max-md:pr-5"
        />
      </div>
    </div>
  );
}

export default function BasicInfo() {
  const { slug } = useParams();
  const [petInfo, setPetInfo] = useState({
    fullname: '',
    sex: '',
    species: '',
    age: '',
    weight: '',
    health: '',
    description: '',
  });

  useEffect(() => {
    const fetchPetInfo = async () => {
      try {
        const res = await pet.getPetInfo(slug);
        const { fullname, sex, species, age, weight, health, description } = res.data;
        setPetInfo({ fullname, sex, species, age, weight, health, description });
      } catch (error) {
        console.error("Error fetching pet info:", error);
      }
    };
    fetchPetInfo();
  }, [slug]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (["fullname", "sex", "species", "age", "weight", "health", "description"].includes(name)) {
      setPetInfo(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(petInfo); // Ghi log dữ liệu petInfo sau khi submit
  };

  return (
    <div className="flex flex-col max-md:mt-10 max-md:max-w-full">
      <h2 className="text-3xl font-medium leading-10 text-black text-opacity-80 max-md:max-w-full">
        Thông tin cơ bản
      </h2>
      <div className="mt-14 max-md:mt-10 max-md:max-w-full">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow self-stretch text-sm leading-5 max-md:mt-10">
                {Object.entries(petInfo).slice(0, 4).map(([key, value]) => (
                  <FormField
                    key={key}
                    label={getLabel(key)} // Lấy nhãn từ hàm getLabel
                    value={value}
                    name={key}
                    onChange={handleChange}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col self-stretch max-md:mt-10">
                {Object.entries(petInfo).slice(4).map(([key, value]) => (
                  <FormField
                    key={key}
                    label={getLabel(key)} // Lấy nhãn từ hàm getLabel
                    value={value}
                    name={key}
                    onChange={handleChange}
                  />
                ))}
                <button type="submit" className="flex gap-2 justify-center self-start px-4 py-1 bg-sky-500 rounded-sm border border-sky-500 border-solid shadow-sm">
                  <div className="flex justify-center items-center my-auto w-3.5 h-3.5 bg-white bg-opacity-0">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/f62e3da3d899ab0910ed104ad5b97380a4ef9c1816746d613b35722e4ba666d2?apiKey=f19a917c094b4f6fa8172f34eb76d09c&"
                      alt=""
                      className="w-3.5 aspect-square"
                    />
                  </div>
                  <span className="text-sm leading-5 text-center text-white">Lưu thay đổi</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}


