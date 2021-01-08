import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router/routes'
import Jwt from "vue-jwt-decode"
import axios from 'axios'


// require("./assets/script/jquery");
// require("./assets/script/slick.slider.js");

// require("./assets/script/bootstrap.min");
// require("./assets/script/functions");
var indexurl = 'https://akada.ng/';
Vue.prototype.axios = axios;
Vue.prototype.jwt = Jwt;
Vue.prototype.indexurl = indexurl;
Vue.prototype.Institution = [
  {
    "name": "Computer Science",
    "requirement": "5 Credits",
    "ssce": "maths, english,physic…",
    "utme": "maths, english,physics,chemistry",
    "institution": "UNILAG",
    "description": "this is a unique course that deals with the software of computers",
    "others": "null",
    "id": 5
  },
  {
    "name": "Computer Science",
    "requirement": "5 Credits",
    "ssce": "maths, english,physic…",
    "utme": "maths, english,physics,chemistry",
    "institution": "EKSU",
    "description": "Blah Blah Blah",
    "others": "",
    "id": 6
  }
];
Vue.prototype.createform = {
  data: function (input)
  {
    var formdata = new FormData();
    for (var i in input)
    {
      formdata.append(i, input[i]);
    }
    return formdata;
  }
};
// Router

Vue.prototype.token = function ()
{
  return getToken();
};



Vue.prototype.setDatas = () =>
{
  var key = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
  var token = getToken();
  var decode = Jwt.decode(token);
  var code = (Array.isArray(decode[key])) ? decode[key].toString() : decode[key];

  if (code.search("Admin") != -1)
  {
    setCourses();
    setInstitutions();
    setUsers();
    setRoles();
  }
}


function getToken()
{
  if (!!window.localStorage.getItem("akadatoken"))
  {
    var token = JSON.parse(window.localStorage.getItem("akadatoken"));
    var expiration = new Date(token.exp).getTime();
    var now = new Date().getTime();

    if (expiration > now)
    {
      return token.token;
    } else
    {
      window.localStorage.removeItem("akadatoken");
      return false;
    }
  } else
  {
    return false;
  }
}

function setCourses()
{
  if (!!window.localStorage.getItem("akadatoken"))
  {
    axios
      .get(indexurl + "api/Course/all", {
        headers: {
          Authorization: "Bearer " + getToken()
        }
      })
      .then(response =>
      {
        if (response.status == "200")
        {
          store.commit("setCourses", response.data);
        }
      });
  }

}

function setInstitutions()
{
  if (!!window.localStorage.getItem("akadatoken"))
  {
    axios
      .get(indexurl + "api/Institution/all", {
        headers: {
          Authorization: "Bearer " + getToken()
        }
      })
      .then(response =>
      {
        if (response.status == "200")
        {
          store.commit("setInstitution", response.data);
        }
      });
  }

}

function setInstitutionsHints()
{

  axios
    .get(indexurl + "api/Institution/allAnonymous")
    .then(response =>
    {
      if (response.status == "200")
      {
        store.commit("setInstitutionsHints", response.data);
      }
    });


}

function setCoursesHints()
{


  axios
    .get(indexurl + "api/Course/allAnonymous")
    .then(response =>
    {
      if (response.status == "200")
      {
        store.commit("setCoursesHints", response.data);
      }
    }).then(error =>
    {
      console.log(error);
    });


}

function setUsers()
{
  if (!!window.localStorage.getItem("akadatoken"))
  {
    axios
      .get(indexurl + "api/User/getAllUsers", {
        headers: {
          Authorization: "Bearer " + getToken()
        }
      })
      .then(response =>
      {
        if (response.status == "200")
        {
          store.commit("setUsers", response.data);
        }
      });
  }

}

function setRoles()
{
  if (!!window.localStorage.getItem("akadatoken"))
  {
    axios
      .get(indexurl + "api/Role", {
        headers: {
          Authorization: "Bearer " + getToken()
        }
      })
      .then(response =>
      {
        if (response.status == "200")
        {
          store.commit("setRoles", response.data);
        }
      });
  }

}

setCoursesHints();
setInstitutionsHints();



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

