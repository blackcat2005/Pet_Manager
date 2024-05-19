import * as React from "react";
import 'tailwindcss/tailwind.css';

function DietPlan() {
  const dietPlan = {
    name: "Chế độ ăn",
    type: "Giảm cân",
    duration: "12/01/2024 - 12/03/2024",
    meals: [
      {
        name: "Bữa sáng",
        items: [
          { name: "Cơm", description: "Ngày 3 bữa", unit: "Bát", quantity: 3 },
          { name: "Cơm", description: "Sáng 2 viên, tối 2 viên sau ăn", unit: "Viên", quantity: 30 },
          { name: "Rau", description: "Sáng 2 viên, tối 2 viên sau ăn", unit: "Viên", quantity: 30 },
        ],
      },
      {
        name: "Bữa trưa",
        items: [
          { name: "Cơm", description: "Ngày 3 bữa", unit: "Bát", quantity: 3 },
          { name: "Cơm", description: "Sáng 2 viên, tối 2 viên sau ăn", unit: "Viên", quantity: 30 },
          { name: "Rau", description: "Sáng 2 viên, tối 2 viên sau ăn", unit: "Viên", quantity: 30 },
        ],
      },
      {
        name: "Bữa tối",
        items: [
          { name: "Cơm", description: "Ngày 3 bữa", unit: "Bát", quantity: 3 },
          { name: "Cơm", description: "Sáng 2 viên, tối 2 viên sau ăn", unit: "Viên", quantity: 30 },
          { name: "Rau", description: "Sáng 2 viên, tối 2 viên sau ăn", unit: "Viên", quantity: 30 },
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col px-5 max-w-[746px]">
      <h1 className="w-full text-3xl font-medium leading-10 text-black text-opacity-80 max-md:max-w-full">
        {dietPlan.name}
      </h1>
      <section className="flex flex-col justify-center mt-11 w-full bg-white rounded-sm border border-solid border-zinc-100 max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-col p-6 w-full max-md:px-5 max-md:max-w-full">
          <div className="flex gap-7 flex-row ">
            <p className="w-[130px] text-base font-medium leading-6 text-black text-opacity-80">
              {dietPlan.name}
            </p>
            <p className="text-sm leading-5 text-black text-opacity-80">
              {dietPlan.type}
            </p>
          </div>
          <div className="flex gap-7 items-center mt-2 ">
            <p className="w-[130px] text-base font-medium leading-6 text-black text-opacity-80">
              Thời gian áp dụng
            </p>
            <p className="text-base font-medium leading-6 text-black text-opacity-80">
              {dietPlan.duration}
            </p>
          </div>
        </div>
      </section>
      <div className="overflow-y-auto max-h-[300px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      {dietPlan.meals.map((meal, index) => (
        <React.Fragment key={index}>
          <h2 className="mt-7 w-full text-base font-medium leading-6 text-black text-opacity-80 max-md:max-w-full">
            {meal.name}
          </h2>
          <div className="">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên thực phẩm</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mô tả</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đơn vị tính</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {meal.items.map((item, itemIndex) => (
                  <tr key={itemIndex}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{itemIndex + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.unit}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </React.Fragment>
      ))}
      </div>
      
    </div>
  );
}

export default DietPlan;
