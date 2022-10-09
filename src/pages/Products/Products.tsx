import React, { useEffect, useState } from 'react'
import { PageHeader, Divider, Row, Col, Card, Spin, Skeleton, Image } from 'antd'
import { getProductList } from '../../services'
import { ProductDataType } from '../../DTO'
const { Meta } = Card
const Products: React.FC = () => {
  const [loader, setLoader] = useState<boolean>(true)
  const [productList, setProductList] = useState<ProductDataType[]>([])

  useEffect(() => {
    const getData = async () => {
      const productData = await getProductList()
      setProductList(productData)
      console.log('productData', productData)

      setLoader(false)
    }
    if (loader) {
      getData()
    }
  }, [loader])
  const getCards = () =>
    productList.map((item: any, index: number) => (
      <Col flex='1 1 25%' className='col-card' key={`card-${item.index}`}>
        <Card
          bordered={true}
          style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', margin: '10px' }}
          actions={[]}
        >
          <Skeleton loading={false} avatar active>
            <Meta
              title={<div className='label-link card-title wordwrap'>{item.productName}</div>}
              description={`${item.price}`}
            />
          </Skeleton>
        </Card>
      </Col>
    ))

  return (
    <div className='site-layout-content layout-padding'>
      <PageHeader ghost={false} title='Products'>
      </PageHeader>
      <Divider />
      <Row wrap={true}>{getCards()}</Row>
    </div>
  )
}
export default Products
