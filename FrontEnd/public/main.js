const app = angular.module("main", [])

app.controller("mainController", ["$scope", "$http", ($scope, $http) => {
  // login

  // creates a user token.
  const postToken = () => {
    // Take user and pass
    const data = {
      username: $scope.username,
      password: $scope.password,
      grant_type: "password"
    }

    // post
    $http({
      url: "http://localhost:63307/token",
      method: "POST",
      data: data,
      headers:{
        "Content-Type":"application/x-www-form-urlencoded"
      },
      transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
      },

    }).then(res => {
      console.log(res)

      // store token
      if(res.status == 200) {
        localStorage.setItem("token", res.data.access_token);
        logIn();
      } else if(res.status == 400){
        localStorage.setItem("token", "");
      }
    })
  }

  const logIn = () => {
    $http({
      url: "http://localhost:63307/api/Contacts",
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      }
    }).then(res => {
      console.log(res);
    })
  }

  const createAcc = () => {
    const data = {
      username: $scope.username,
      password: $scope.password,
      confirmPassword: $scope.password
    }

    // Create the user, and then immediately log in.
    $http({
      url: "http://localhost:63307/api/account/register",
      method: "POST",
      data: data
    }).then(res => {
      // Run the login function.
      postToken();
    })
  }

  $scope.login = () => {

    postToken();

  }
}]);