const app = angular.module("main", [])

app.controller("mainController", ["$scope", "$http", ($scope, $http) => {
  // login

  let currToken = localStorage.token;
  $scope.hasToken = Boolean(currToken);
  console.log($scope.hasToken);

  $scope.contacts = [];
  $scope.username = "";
  $scope.password = "";

  $scope.isLoggedIn = false;

  const checkLoggedIn = () => {
    if($scope.hasToken){
      $scope.isLoggedIn = true;
      logIn();
    }
  }

  // creates a user token.
  const postToken = () => {
    // Take user and pass
    const data = {
      username: $scope.username,
      password: $scope.password,
      grant_type: "password"
    }
    console.log(data);

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
      }
    }
    , (err) => {
      console.log("Not logged in!!!");
      localStorage.setItem("token", "");
      currToken = localStorage.token;
      $scope.hasToken = Boolean(currToken);
    }
  )
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
      // set response data on contacts to scope.
      $scope.contacts = res.data;
      console.log($scope.contacts);
      $scope.isLoggedIn = true;
      console.log($scope.isLoggedIn);
    })
  }

  const logOut = () => {
    localStorage.setItem("token", "");
    currToken = localStorage.token;
    $scope.hasToken = Boolean(currToken);
    $scope.isLoggedIn = false;
    $scope.contacts = [];
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

  $scope.login = (login) => {

    if(login){
      console.log("logging in!");
      postToken();
    } else {
      console.log("creating account!");
      createAcc();
    }
  }

  $scope.logout = () => {
    logOut();
  }

  checkLoggedIn();
}]);