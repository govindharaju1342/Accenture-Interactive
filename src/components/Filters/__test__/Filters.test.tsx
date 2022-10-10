import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme'
import Filters from '../Filters'
const onClose = jest.fn()
const onFilterChange = jest.fn()
const initProps = {
  listData: [
    {
      index: 1,
      isSale: true,
      price: '$14.99',
      productImage: 'Product_2.jpeg',
      productName: 'Victoria Bitter 4x6x375ml',
      type: 'Beer',
    },
  ],
  openFilter: true,
  onClose,
  onFilterChange,
}
configure({ adapter: new Adapter() })
describe('Should renders the Filters', () => {
  const wrapper = shallow(<Filters {...initProps} />)

  it('should render my Drawer', () => {
    expect(wrapper.find('Drawer').length).toEqual(1)
  })
  it('should render my openFilter', () => {
    wrapper.setProps({ ...initProps })
    expect(wrapper.props().open).toEqual(true)
  })
})
