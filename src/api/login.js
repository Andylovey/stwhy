import http from '@/utils/http'
import api from './api.js'
import axios from 'axios';

export function LoginbyUser(username, password) {
  /*const data = {
    username,
    password
  }
  return http({
    url: '/login/login',
    method: 'post',
    data
  })*/
}

export function Logout(token) {
  var params = new URLSearchParams();
  params.append('access_token', token);
  localStorage.setItem('hasAddRoutes', '');
  return axios.post(`${api.dev}/logout`,params);
}

export function GetUserInfo(token) {
  /*debugger;
  var params = new URLSearchParams();
  params.append('access_token', token);
  axios.post(`${api.dev}/selectAdmin`,params)
  .then(function (response) {
    //console.log(response);
    setTimeout(function(){
      return response;
    }, 500)
    
  });*/
}
