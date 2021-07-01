import { Http } from "../../../Helper/Http";

const API_ENDPOINT = {
  LOGIN_USER: '/user/user/login',
}

class UserService {
  constructor() {
    if (UserService._instance) {
      return UserService._instance;
    }
    UserService._instance = this;
  }

  // CREATE
  loginUser(data) {
      console.log(data)
    return Http.post(API_ENDPOINT.LOGIN_USER, data);
  }



}

const instance = new UserService();
export default instance;
