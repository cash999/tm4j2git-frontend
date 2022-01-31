export function authHeader() {
  let userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {
    return { 'Authorization': 'Bearer ' + userData.token };
  } else {
    return {};
  }
}
