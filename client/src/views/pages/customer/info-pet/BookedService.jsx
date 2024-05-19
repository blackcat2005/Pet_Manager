import { useState } from "react";
import { Pagination } from "./MedicalRecord";
const services = [
  {
    id: 'ABCDFG',
    name: 'Dịch vụ lưu trữ',
    price: '400.000',
    status: 'Huỷ',
    registeredAt: '12/04/2024 08:24:24',
  },
  {
    id: 'ABCDFG2',
    name: 'Dịch vụ vệ sinh làm đẹp',
    price: '400.000',
    status: 'Hoàn thành',
    registeredAt: '12/04/2024 08:24:24',
  },
  {
    id: 'ABCDFG3',
    name: 'Dịch vụ khám bệnh',
    price: '400.000',
    status: 'Đang thực hiện',
    registeredAt: '12/04/2024 08:24:24',
  },
  {
    id: 'ABCDFG4',
    name: 'Dịch vụ lưu trữ',
    price: '400.000',
    status: 'Khởi tạo',
    registeredAt: '12/04/2024 08:24:24',
  },
];

const statusColors = {
  Huỷ: 'bg-zinc-300',
  'Hoàn thành': 'bg-sky-500',
  'Đang thực hiện': 'bg-red-500',
  'Khởi tạo': 'bg-lime-600',
};

export function ServiceTable() {
  const [selectedServices, setSelectedServices] = useState([]);

  const handleCheckboxChange = (serviceId) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(serviceId)
        ? prevSelected.filter((id) => id !== serviceId)
        : [...prevSelected, serviceId]
    );
  };

  const handleDelete = () => {
    const servicesToDelete = services.filter((service) =>
      selectedServices.includes(service.id)
    );
    console.log('Services to delete:', servicesToDelete);
  };

  return (
    <div className="flex flex-col pb-4 max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-2.5 justify-between px-2 py-4 w-full bg-white bg-opacity-0 max-md:flex-wrap max-md:max-w-full">
        <h2 className="text-2xl font-medium leading-8 text-black text-opacity-80">
          Dịch vụ đã đăng ký
        </h2>
        <div className="flex gap-4 text-sm leading-5">
          <div className="flex gap-1 py-1.5 text-black text-opacity-80">
            <div>Sắp xếp theo: Ngày</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/af6868c363bd70a17601ff26c778ba2e4a1d00a347e854ccd1c916a6aae9f0cf?apiKey=f19a917c094b4f6fa8172f34eb76d09c&"
              alt=""
              className="shrink-0 my-auto w-2.5 aspect-[0.71]"
            />
          </div>
          <button
            onClick={handleDelete}
            className="justify-center px-4 py-1 text-center text-white bg-red-600 rounded-sm border border-red-600 border-solid shadow-sm"
          >
            Xóa
          </button>
        </div>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full border-b">
            <th className="px-4 py-2 text-left">Chọn</th>
            <th className="px-4 py-2 text-left">Mã dịch vụ</th>
            <th className="px-4 py-2 text-left">Dịch vụ</th>
            <th className="px-4 py-2 text-left">Giá dịch vụ</th>
            <th className="px-4 py-2 text-left">Trạng thái</th>
            <th className="px-4 py-2 text-left">Thời gian đăng ký</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id} className="border-b">
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service.id)}
                  onChange={() => handleCheckboxChange(service.id)}
                />
              </td>
              <td className="px-4 py-2 text-sky-500">{service.id}</td>
              <td className="px-4 py-2">{service.name}</td>
              <td className="px-4 py-2">{service.price}</td>
              <td className="px-4 py-2">
                <div className="flex items-center">
                  <span
                    className={`inline-block w-2 h-2 mr-2 rounded-full ${statusColors[service.status]}`}
                  ></span>
                  {service.status}
                </div>
              </td>
              <td className="px-4 py-2">{service.registeredAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
}
