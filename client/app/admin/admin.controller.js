'use strict';

angular.module('mApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, socket) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };

    socket.socket.on('user:save', function (data) {
      var updated = false;
      angular.forEach($scope.users, function(u, i) {
        if (u._id != data._id)
          return;

        u = _.merge(u, data);
        updated = true;
      });

      if (!updated) {
        $scope.users.push(data);
      }
    });
  });
