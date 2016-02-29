'use strict';

angular
  .module('adf.widget.travis')
  .controller('HistoryController', HistoryController);

function HistoryController(builds){
  var vm = this;

  vm.builds = builds;

  vm.headingClass = function(build){
    return 'travis-' + build.state;
  };
}
