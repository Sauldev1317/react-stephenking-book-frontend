import http from "../http-common";

class BooksDataService {
  getAll() {
    return http.get("/book");
  }

  get(id) {
    return http.get(`/book/${id}`);
  }

  findByTitle(title) {
    return http.get(`book/search/${title}`);
  }

  create(data) {
    return http.post("/book", data);
  }

  delete(id) {
    return http.delete(`/book/${id}`);
  }
}

export default new BooksDataService();