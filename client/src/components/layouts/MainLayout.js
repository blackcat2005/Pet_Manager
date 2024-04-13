import React from 'react'
// import Header from 'components/header'
// import SiderBar from 'components/siderbar'
// import useAuth from 'hooks/useAuth'
import { Layout } from 'antd'

import 'components/layouts/main-layout.scss'

function MainLayout(props) {
    const { collapsed } = useAuth()

    return (
        <div className="body-wrapper">
            <div className="content-wrapper">
                <Layout
                    className={
                        collapsed ? 'main-layout collapsed' : 'main-layout'
                    }
                >
                    {/* <SiderBar className="main-layout__siderbar" /> */}
                    <Layout className="main-layout__content">
                        {/* <Header className="main-layout__content__header" /> */}
                        <div className="main-layout__content__main">
                            <div className="main-layout__content__main__component">
                                <props.component />
                                <div className="main-layout__content__main__footer"></div>
                            </div>
                        </div>
                    </Layout>
                </Layout>
            </div>
        </div>
    )
}

export default MainLayout
