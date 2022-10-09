import React, { useEffect, useState } from 'react'
import { PageHeader, Divider, Row, Col, Card, Spin, Button, Image, Badge } from 'antd'
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

  const getCard = (item: ProductDataType) => {
    // Todo: The productImage is not public URL
    const { productName = '', type = '', price = 0, index = 0 } = item
    return (
      <Card
        hoverable
        bordered={true}
        className='product-card'
        cover={
          <Image
            height={400}
            alt={`${productName}-${type}`}
            className='product-img'
            fallback='products/no-image.png'
            src={`products/${type.toLowerCase()}.jpeg`}
          />
        }
        actions={[
          <Button type="link" block key={`view-more-${index}`}>Buy Now</Button>
        ]}
      >
        <Meta
          title={<div className='label-link card-title wordwrap'>{productName}</div>}
          description={`${price}`}
        />
      </Card>
    )
  }

  const getCardList = () =>
    productList.map((item: ProductDataType, index: number) => {
      const { isSale = false } = item
      return (
        <Col flex='1 1 25%' className='col-card' key={`card-${index}`}>
          {isSale ? (
            <Badge.Ribbon className='card-ribbon' color='red' text={'hot sale'}>
              {getCard(item)}
            </Badge.Ribbon>
          ) : (
            getCard(item)
          )}
        </Col>
      )
    })

  return (
    <div className='site-layout-content layout-padding'>
      <PageHeader ghost={false} title='Products'></PageHeader>
      <Divider />
      <Row wrap={true}>{getCardList()}</Row>
    </div>
  )
}
export default Products
