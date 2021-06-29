import { Http } from "../../../Helper/Http";

const API_ENDPOINT = {
    LISTSTUDENT: '/student/student/list',
    CREATESTUDENT: '/student/student/create'
}

class StudentService {
    constructor() {
      if (StudentService._instance) {
        return StudentService._instance;
      }
      StudentService._instance = this;
  
      // ... Your rest of the constructor code goes after this
    }


  //LIST PRODUCT
  listStudent() {
    return Http.get(API_ENDPOINT.LISTSTUDENT);
  }

   // CREATE
   createStudent(data) {
       return Http.post(API_ENDPOINT.CREATESTUDENT, data);
   }

}

const instance = new StudentService();
export default instance;
