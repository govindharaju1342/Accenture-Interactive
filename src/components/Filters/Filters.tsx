import React, { useState } from 'react'
import { Space, Button, Collapse, Drawer, Checkbox } from 'antd'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import { ProductDataType } from '../../DTO'

const { Panel } = Collapse

const Filters: React.FC<Props> = (props: Props) => {
  const { onClose, onFilterChange, openFilter, listData } = props
  const [type, setType] = useState<CheckboxValueType[]>([])
  const getTypeList = () => {
    const options: any = Array.from(new Set(listData.map((item: ProductDataType) => item.type)))
    return (
      <Checkbox.Group
        options={options}
        defaultValue={[]}
        onChange={(checkedValues: CheckboxValueType[]) => setType(checkedValues)}
      />
    )
  }

  return (
    <Drawer
      title='Filters'
      placement='left'
      width={500}
      onClose={onClose}
      open={openFilter}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type='primary'
            onClick={() => {
              onFilterChange(type)
            }}
          >
            OK
          </Button>
        </Space>
      }
    >
      <Collapse defaultActiveKey={['filter-1']}>
        <Panel header='Type' key='filter-1'>
          {getTypeList()}
        </Panel>
      </Collapse>
    </Drawer>
  )
}
export default Filters

// Filter types
type Props = {
  onClose: () => void
  openFilter: boolean
  onFilterChange: (type: CheckboxValueType[]) => void
  listData: ProductDataType[]
}
