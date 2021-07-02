import { Http } from "../../../Helper/Http";

const API_ENDPOINT = {
  LIST_STUDENT: '/student/student/list',
  CREATE_STUDENT: '/student/student/create',
  DELETE_STUDENT: '/student/student/delete',
  UPDATE_STUDENT:'/student/student/update',
  GET_STUDENT: '/student/student/get',
  LIST_REGION: '/tool/tool/region/list',
  LIST_SCHOOL: '/tool/tool/school/list',
}

class StudentService {
  constructor() {
    if (StudentService._instance) {
      return StudentService._instance;
    }
    StudentService._instance = this;
  }


  //LIST PRODUCT
  listStudent() {
    return Http.get(API_ENDPOINT.LIST_STUDENT);
  }

  // CREATE
  createStudent(data) {
    return Http.post(API_ENDPOINT.CREATE_STUDENT, data);
  }

  // UPDATE
  updateStudent(data) {
    return Http.post(API_ENDPOINT.UPDATE_STUDENT, data);
  }

  // GET
  getStudent(id) {
    return Http.get(API_ENDPOINT.GET_STUDENT, id);
  }

  // DELETE
  deleteStudent(id) {
    console.log('id api', id)
    return Http.get(`${API_ENDPOINT.DELETE_STUDENT}?id=`);
  }

  // GET
  listRegion(type, value) {
    return Http.get(`${API_ENDPOINT.LIST_REGION}?type=${type}&value=${value}`);
  }

   // GET
   listSchool(type, value) {
    return Http.get(`${API_ENDPOINT.LIST_SCHOOL}?type=${type}&value=${value}`);
  }

}

const instance = new StudentService();
export default instance;
