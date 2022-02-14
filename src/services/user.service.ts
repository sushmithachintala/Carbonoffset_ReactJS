import http from "../http-common";
import IUserData from "../types/user.type"
class UserDataService {
  getAll() {
    return http.get<Array<IUserData>>("/projects");
  }
  get(id: string) {
    return http.get<IUserData>(`/projects/${id}`);
  }
  create(data: IUserData) {
    return http.post<IUserData>("/user", data);
  }
  find(data: IUserData) {
    return http.post<IUserData>("/login", data);
  }
  update(data: IUserData, id: any) {
    return http.put<any>(`/projects/${id}`, data);
  }
  delete(id: any) {
    return http.delete<any>(`/projects/${id}`);
  }
  
}
export default new UserDataService();