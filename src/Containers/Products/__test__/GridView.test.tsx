import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme'
import GridView from '../GridView'
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
describe('Should renders the GridView', () => {
  const wrapper = shallow(<GridView {...initProps} />)

  it('should render my GridView', () => {
    console.log('wrapper', wrapper)
    expect(wrapper.find('Row').length).toEqual(1)
  })
})
