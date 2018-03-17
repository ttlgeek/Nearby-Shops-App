import Api from '@/services/Api'
import axios from 'axios'
import store from '@/store/store'

function addToken () {
  const token = store.state.token
  if (token) {
    axios.defaults.headers.common['Authorization'] = token
  } else {
    axios.defaults.headers.common['Authorization'] = null
  }
}
export default (email) => {
  addToken()
  return Api().post('api/preferredShops', {email: email})
}
