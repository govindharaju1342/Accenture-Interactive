import React from 'react'
import { Button, Badge, Image, Row, Col, Card } from 'antd'
import { ProductDataType } from '../../DTO'
const { Meta } = Card

const GridView: React.FC<Props> = (props: Props) => {
  const { filtersData } = props

  const getCard = (item: ProductDataType) => {
    // Todo: The productImage is not a public URL
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
          <Button type='link' block key={`view-more-${index}`}>
            Buy Now
          </Button>,
        ]}
      >
        <Meta
          title={<div className='label-link card-title wordwrap'>{productName}</div>}
          description={`${price}`}
        />
      </Card>
    )
  }

  const getCardList = () => {
    return filtersData.length === 0 ? (
      <Col flex='1 1 100%'>
        <div className='no-data'>No Product Found</div>
      </Col>
    ) : (
      filtersData.map((item: ProductDataType, index: number) => {
        const { isSale = false } = item
        return (
          <Col flex='1 1 25%' className='col-card' key={`card-${index}`}>
            {isSale ? (
              <Badge.Ribbon className='card-ribbon' color='purple' text={'hot sale'}>
                {getCard(item)}
              </Badge.Ribbon>
            ) : (
              getCard(item)
            )}
          </Col>
        )
      })
    )
  }
  return (
    <div className='site-card-wrapper'>
      <Row wrap={true}>{getCardList()}</Row>
    </div>
  )
}
export default GridView

// Product Props types
type Props = {
  filtersData: ProductDataType[]
}
