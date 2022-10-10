import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme'
import ListView from '../ListView'
const initProps = {
  filtersData: [
    {
      index: 1,
      isSale: true,
      price: '$14.99',
      productImage: 'Product_2.jpeg',
      productName: 'Victoria Bitter 4x6x375ml',
      type: 'Beer',
    },
  ],
}
configure({ adapter: new Adapter() })
describe('Should renders the ListView', () => {
  const wrapper = shallow(<ListView {...initProps} />)
  it('should render my ListView', () => {
    expect(wrapper.find('List').length).toEqual(1)
  })
})
