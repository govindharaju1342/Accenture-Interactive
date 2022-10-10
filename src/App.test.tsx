import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme'
import App from './App'

configure({ adapter: new Adapter() })

describe('Should renders the app', () => {
  const wrapper = shallow(<App />)

  it('should render my layout', () => {
    expect(wrapper.find('Layout').length).toEqual(1)
  })
  it('should render my Header', () => {
    expect(wrapper.find('Header').length).toEqual(1)
  })
  it('should render my Image width', () => {
    expect(wrapper.find('img').at(0).props().width).toEqual('130')
  })
  it('should render my Content', () => {
    expect(wrapper.find('Content').length).toEqual(1)
  })
  it('should render my Footer', () => {
    expect(wrapper.find('Footer').length).toEqual(1)
  })
})
