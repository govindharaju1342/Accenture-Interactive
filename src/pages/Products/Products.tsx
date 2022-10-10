import React, { useEffect, useState } from 'react'
import { Input, PageHeader, Divider, Card, Spin, Button, Tooltip } from 'antd'
import { AppstoreOutlined, BarsOutlined, FilterOutlined } from '@ant-design/icons'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import Filters from '../../components/Filters'
import GridView from '../../Containers/Products/GridView'
import ListView from '../../Containers/Products/ListView'
import { getProductList } from '../../services'
import { ProductDataType } from '../../DTO'
import { get } from '../../utils/helpers'
const { Search } = Input

const Products: React.FC = () => {
  const [loader, setLoader] = useState<boolean>(true)
  const [productList, setProductList] = useState<ProductDataType[]>([])
  const [searchKey, setSearchKey] = useState<string>('')
  const [filterData, setFilterData] = useState({} as any)
  const [openFilter, setOpenFilter] = useState<boolean>(false) // Open the filters
  const [showListLayout, setShowListLayout] = useState<boolean>(false) // Change the layout

  useEffect(() => {
    const getData = async () => {
      const productData = await getProductList()
      setProductList(productData)
      setLoader(false)
    }
    if (loader) {
      getData()
    }
  }, [loader])

  const getFilterListData = () => {
    const { type } = filterData
    let searchResult = productList
    if (searchKey) {
      searchResult = searchResult.filter((item: any) =>
        get(item, 'productName', '').toLowerCase().match(searchKey.toLowerCase()),
      )
    }
    if (!!type && type.length > 0) {
      searchResult = searchResult.filter((item: any) => !!type.includes(get(item, 'type', '')))
    }
    return searchResult
  }

  const getListIcons = () => (showListLayout ? <BarsOutlined /> : <AppstoreOutlined />)
  const handleLayout = () => setShowListLayout(!showListLayout)
  const onClose = () => setOpenFilter(false)
  const onFilterChange = (type: CheckboxValueType) => {
    setFilterData({
      type,
    })
  }
  const getFilters = () => (
    <Filters
      onClose={onClose}
      listData={productList}
      openFilter={openFilter}
      onFilterChange={(type: any) => {
        onFilterChange(type)
        onClose()
      }}
    />
  )

  const getLayout = (filtersData: ProductDataType[]) => {
    return showListLayout ? (
      <ListView filtersData={filtersData} />
    ) : (
      <GridView filtersData={filtersData} />
    )
  }

  const getProductsList = () => {
    const filtersData = getFilterListData()
    return filtersData.length === 0 ? (
      <div className='no-data'>No Product Found</div>
    ) : (
      getLayout(filtersData)
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
              key='search-1'
              placeholder='Search By Name'
              allowClear
              width={500}
              enterButton
              onSearch={(value: string) => setSearchKey(value)}
            />,
            <Tooltip key='filter-2' title='Filters' placement='bottom'>
              <Button
                name='filter'
                icon={<FilterOutlined />}
                onClick={() => setOpenFilter(!openFilter)}
              ></Button>
            </Tooltip>,
            <Tooltip
              key='view-1'
              placement='bottom'
              title={showListLayout ? 'List View' : 'Card View'}
            >
              <Button name='layout' onClick={handleLayout}>
                {getListIcons()}
              </Button>
            </Tooltip>,
          ]
        }
      ></PageHeader>
      <Divider />
      {productList.length > 0 && getFilters()}
      {getProductsList()}
    </div>
  )
}
export default Products
