'use strict';
/*jshint unused:false */
var templateConfigUtil = {
  baseTemplate: '<ul>' +
    '<li ng-class="{%DISABLED_CLASS%: pagination.onFirstPage()}">' +
    '<a ng-click="pagination.prev()">&laquo;</a>' +
    '</li>' +
    '<li ng-class="{%SELECTED_CLASS%: pagination.onPage(pageIndex)}" ' +
    'ng-repeat="pageIndex in pagination.reducedIndices(midRange, edgeRange)">' +
    '<a ng-click="pagination.setPage(pageIndex)">{{ displayIndex(pageIndex) }}</a>' +
    '</li>' +
    '<li ng-class="{%DISABLED_CLASS%: pagination.onLastPage()}">' +
    '<a ng-click="pagination.next()">&raquo;</a>' +
    '</li>' +
    '</ul>',
  configDefaults: {
    divWrapped: false,
    selectedClass: 'active',
    disabledClass: 'disabled'
  },
  generateTemplate: function (configObject) {
    configObject = angular.extend(angular.copy(this.configDefaults), configObject);
    var $element = angular.element(this.baseTemplate);

    if (configObject.divWrapped) {
      $element.wrap('<div></div>');
      $element = $element.parent();
    }

    $element.addClass('pagination');

    angular.forEach($element.find('li'), function(liElement) {
      var $liElement = angular.element(liElement);
      var ngClass = $liElement.attr('ng-class');
      ngClass = ngClass.replace('%DISABLED_CLASS%', configObject.disabledClass);
      ngClass = ngClass.replace('%SELECTED_CLASS%', configObject.selectedClass);
      $liElement.attr('ng-class', ngClass);
    });

    return $element.wrap('<div></div>').parent().html();
  },
  getTemplateUrl: function (templateConfig) {
    return templateConfig.templateUrl;
  },
  getTemplate: function (templateConfig) {
    if (templateConfig.templateKey) {
      templateConfig = this.getTemplateConfigForKey(templateConfig.templateKey);
    }

    if (templateConfig.template) {
      return templateConfig.template;
    }

    if (templateConfig.config) {
      return this.generateTemplate(templateConfig.config);
    }
  },
  simpleConfigKeys: {
    list: {},
    divWrappedList: {
      divWrapped: true
    },
    bootstrap3: {},
    bootstrap2: {
      divWrapped: true
    },
    zurbFoundation: {
      selectedClass: 'current',
      disabledClass: 'unavailable'
    }
  },
  allowedValues: function () {
    return '"' + Object.keys(this.simpleConfigKeys).join('", "') + '"';
  },
  getTemplateConfigForKey: function (key) {
    var configObject = this.simpleConfigKeys[key];
    if (configObject !== undefined) {
      return {
        config: configObject
      };
    }
    throw new Error('Given templateKey "' + key + '" is not in allowed values ' + this.allowedValues());
  }
};
