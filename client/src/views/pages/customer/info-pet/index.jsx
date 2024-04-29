import React from 'react'
import { Card } from 'antd'
const { Meta } = Card
const InfoPet = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: '20px',
    }}
  >
    <Card
      hoverable
      style={{
        width: 240,
      }}
      cover={
        <img
          alt="example"
          src="https://images.ctfassets.net/ub3bwfd53mwy/5zi8myLobtihb1cWl3tj8L/45a40e66765f26beddf7eeee29f74723/6_Image.jpg?w=750"
        />
      }
    >
      <Meta title="Bim" description="Loài : chó" />
    </Card>
    <Card
      hoverable
      style={{
        width: 240,
      }}
      cover={
        <img
          alt="example"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPWPEafxuosEHJ7_ing9CyhZmX5MSmynoMASKjIQ14jA&s"
        />
      }
    >
      <Meta title="Bim" description="Loài : chó" />
    </Card>
    <Card
      hoverable
      style={{
        width: 240,
      }}
      cover={
        <img
          alt="example"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsQ09x75ApZJz0iP_zM7YgN7C74PkhgBsbis67xZJ4Rw&s"
        />
      }
    >
      <Meta title="Bim" description="Loài : chó" />
    </Card>
    <Card
      hoverable
      style={{
        width: 240,
      }}
      cover={
        <img
          alt="example"
          src="https://worldanimalfoundation.org/wp-content/uploads/2023/09/Cute-dogs.jpg"
        />
      }
    >
      <Meta title="Bim" description="Loài : chó" />
    </Card>
    <Card
      hoverable
      style={{
        width: 240,
      }}
      cover={
        <img
          alt="example"
          src="https://worldanimalfoundation.org/wp-content/uploads/2023/09/Cute-dogs.jpg"
        />
      }
    >
      <Meta title="Bim" description="Loài : chó" />
    </Card>
  </div>
)
export default InfoPet
