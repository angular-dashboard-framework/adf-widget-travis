'use strict';

angular
  .module('adf.widget.travis')
  .constant('travisEndpoint', 'https://api.travis-ci.org')
  .factory('Travis', Travis);

function Travis($http, travisEndpoint){

  function createDescription(build){
    var description;
    if (build.pull_request){
      description = 'PR #' + build.pull_request_number + ' ' + build.pull_request_title;
    } else if (build.commit && build.commit.message){
      description = build.commit.message;
    }
    return description;
  }

  function mapCommitsToBuilds(data){
    var commits = {};
    angular.forEach(data.commits, function(commit){
      commits[commit.id] = commit;
    });
    var builds = data.builds;
    angular.forEach(builds, function(build){
      if (build.commit_id){
        build.commit = commits[build.commit_id];
      }
      build.description = createDescription(build);
    });
    return builds;
  }

  function getBuilds(username, repo){
    return $http({
      method: 'GET',
      url: travisEndpoint + '/repos/' + username + '/' + repo + '/builds',
      headers: {
        'Accept': 'application/vnd.travis-ci.2+json'
      }
    }).then(function(response){
      return response.data;
    }).then(mapCommitsToBuilds);
  }

  return {
    getBuilds: getBuilds
  };
}
