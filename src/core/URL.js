const baseURL = 'https://28ac-137-59-228-114.in.ngrok.io/api/v1/customer/';
export default baseURL;

//List of API's used in the whole app.

//1 -  https://ca4f-137-59-228-114.in.ngrok.io/api/v1/customer/  => {baseURL}
//2 -  .post(`${baseURL}send-otp` => {generating otp by entering mobile no of customer}
//3 -  .post(`${baseURL}verify-otp-auth` => {verify code of otp and membership_no}
//4 -  .get(`${baseURL}transaction => {get history of last 5 transactions}
//5 -  .get(`${baseURL}products` => {get list of products}
//6 -  .post(`${baseURL}product-discount` => {get discount of every product by giving quantity and item's id}
//7 -  .post(`${baseURL}order-invoice` => {place new order by giving total quanity/discount/amount/due amount even for single and multiple items}
//8 -   .get(`${baseURL}order-notification` => {get notifications}
//9 -   .get(`${baseURL}get-customer`  => {get user profile data}
