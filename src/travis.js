'use strict';

angular
  .module('adf.widget.travis')
  .config(RegisterWidgets);

function RegisterWidgets(dashboardProvider){
  dashboardProvider
    .widget('travis', {
      title: 'Travis CI',
      description: 'Build history from Travis CI',
      templateUrl: '{widgetsPath}/travis/src/view.html',
      resolve: {
        builds: function(Travis, config){
          if (config.username && config.repository){
            return Travis.getBuilds(config.username, config.repository);
          }
          return null;
        }
      },
      controller: 'HistoryController',
      controllerAs: 'vm',
      edit: {
        templateUrl: '{widgetsPath}/travis/src/edit.html'
      }
    });
}
