import axios from "axios";
const BASE_URL = "http://localhost:8080/";
const PRODUCT_API_BASE_URL = "http://localhost:8080/products"; //이건 연습용이였습니다.
const CATEGORY_API_BASE_URL = "http://localhost:8080/category";
const PRODUCTLIST_API_BASE_URL = "http://localhost:8080/productlist";
const REVIEW_API_BASE_URL = "http://localhost:8080/productreview";
const KEYWORD_API_BASE_URL = "http://localhost:8080/keyword";
const SENTIMENTAL_API_BASE_URL = "http://localhost:8080/sentimental";
class ApiService {
  fetchProduct() {
    return axios.get(PRODUCT_API_BASE_URL);
  }
  fetchProductByID(id) {
    return axios.get(PRODUCT_API_BASE_URL + "/" + id);
  }
  deleteProduct(id) {
    return axios.delete(PRODUCT_API_BASE_URL + "/" + id);
  }
  addProduct(product) {
    return axios.post(PRODUCT_API_BASE_URL, product);
  }
  editProduct(product) {
    return axios.put(PRODUCT_API_BASE_URL + "/" + product.id, product);
  }
  // RestAPI 연습용 
  fetchCategory() {
    return axios.get(CATEGORY_API_BASE_URL);
  }
  //카테고리 초기값 디비에서 꺼내오기. 

  fetchProductList() {
    return axios.get(PRODUCTLIST_API_BASE_URL);
  }

  fetchProductListById(cat_id) {
    return axios.get(PRODUCTLIST_API_BASE_URL + "/" + cat_id);
  }
  fetchproductReview(nv_mid) {
    return axios.get(REVIEW_API_BASE_URL + "/" + nv_mid);
  }
  fetchReviewLabelByCat_id(cat_id) {
    return axios.get(KEYWORD_API_BASE_URL + "/cat-id/" + cat_id);
  }
  fetchReviewLabelsByKey_id(key_id) {
    return axios.get(KEYWORD_API_BASE_URL + "/key-id/" + key_id);
  }
  fetchSentimentalReview(nv_mid) {
    return axios.get(SENTIMENTAL_API_BASE_URL + "/" + nv_mid);
  }

  fetchSentimentalReviewSentence(review_id) {
    return axios.get(SENTIMENTAL_API_BASE_URL + "/sentence/" + review_id);
  }

  fetchReviewSentence(nv_mid) {
    return axios.get(SENTIMENTAL_API_BASE_URL + "/avg/" + nv_mid);
  }

}

export default new ApiService();
