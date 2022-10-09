import React from 'react'
import { Tooltip, Button, List, Skeleton, Image } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { ProductDataType } from '../../DTO'
import { get } from '../../utils/helpers'

const ListView: React.FC<Props> = (props: Props) => {
  const { filtersData } = props
  const loadMore = (
    <div className='load-btn'>
      <Button>Load More</Button>
    </div>
  )

  return (
    <>
      <List
        className='demo-loadmore-list'
        itemLayout='horizontal'
        size='large'
        loadMore={loadMore}
        dataSource={filtersData}
        renderItem={(item: any, index: number) => (
          <List.Item
            key={`list-${index}`}
            actions={[
              <Tooltip key='2' title='Buy Now' placement='top'>
                <Button icon={<ShoppingCartOutlined />} key='list-loadmore-edit'></Button>
              </Tooltip>,
            ]}
          >
            <Skeleton avatar title={false} active loading={false}>
              <List.Item.Meta
                avatar={
                  <Image
                    preview={false}
                    width={50}
                    height={50}
                    alt={`${get(item, 'productName', 'productName')}-${get(item, 'type', 'type')}`}
                    className='product-img'
                    fallback='products/no-image.png'
                    src={`products/${get(item, 'type', 'type').toLowerCase()}.jpeg`}
                  />
                }
                title={get(item, 'productName', '')}
                description={<span className='expected-amount'>{get(item, 'price', 0)}</span>}
              />
              <div></div>
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  )
}
export default ListView

// Product Props types
type Props = {
  filtersData: ProductDataType[]
}
