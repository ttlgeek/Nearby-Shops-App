import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('users/register', credentials)
  },

  login (credentials) {
    return Api().post('users/auth', credentials)
  }
}
