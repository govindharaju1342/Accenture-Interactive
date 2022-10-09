import React, { useEffect, useState } from 'react'
import { Input, PageHeader, Divider, Row, Col, Card, Spin, Button, Image, Badge } from 'antd'
import { getProductList } from '../../services'
import { ProductDataType } from '../../DTO'
import { get } from '../../utils/helpers'

const { Meta } = Card
const { Search } = Input
const Products: React.FC = () => {
  const [loader, setLoader] = useState<boolean>(true)
  const [productList, setProductList] = useState<ProductDataType[]>([])
  const [searchKey, setSearchKey] = useState<string>('')
  const [filterData, setFilterData] = useState({} as any)

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

  const getFilterListData = () => {
    let searchResult = productList
    if (searchKey) {
      searchResult = searchResult.filter((plan: any) =>
        get(plan, 'productName', '').toLowerCase().match(searchKey.toLowerCase()),
      )
    }
    return searchResult
  }

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
    const filtersData = getFilterListData()
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
              <Badge.Ribbon className='card-ribbon' color='red' text={'hot sale'}>
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

  return loader ? (
    <Card style={{ paddingLeft: 0, paddingRight: 0 }}>
      <div style={{ textAlign: 'center' }}>
        <Spin />
      </div>
    </Card>
  ) : (
    <div className='site-layout-content layout-padding'>
      <PageHeader
        title='Products'
        extra={
          productList.length > 0 && [
            <Search
              key='search-3'
              placeholder='Search By Name'
              allowClear
              width={500}
              enterButton
              onSearch={(value: string) => setSearchKey(value)}
            />,
          ]
        }
      ></PageHeader>
      <Divider />
      <Row wrap={true}>{getCardList()}</Row>
    </div>
  )
}
export default Products
