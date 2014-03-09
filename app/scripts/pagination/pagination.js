'use strict';

angular.module('stPagination').service("Pagination", function () {

  function Pagination(inputCollection) {
    this.$inputCollection = inputCollection;
    this.$limit = 10;
    this.$page = 0;
  }

  angular.extend(Pagination.prototype, {
    setInputCollection: function (inputCollection) {
      this.$inputCollection = inputCollection;
    },
    paginatedInputCollection: function () {
      var start = this.offset();
      var stop = this.offset() + this.limit();
      return this.$inputCollection.slice(start, stop);
    },
    inputCollection: function () {
      return this.$inputCollection
    },
    length: function () {
      return this.$inputCollection.length;
    },
    setLimit: function (limit) {
      this.$limit = limit;
    },
    totalPages: function () {
      return Math.ceil(this.$inputCollection.length / this.limit()) || 1;
    },
    offset: function () {
      return this.$page * this.$limit;
    },
    page: function () {
      return this.$page;
    },
    next: function () {
      this.$page += 1;
      this.checkPageLimits();
    },
    prev: function () {
      this.$page -= 1;
      this.checkPageLimits();
    },
    limit: function () {
      return this.$limit;
    },
    setPage: function (page) {
      this.$page = page;
      this.checkPageLimits();
    },
    checkPageLimits: function () {
      if (this.$page < 0) {
        this.$page = 0;
      } else if (this.$page > this.lastPage()) {
        this.$page = this.lastPage();
      }
    },
    displayPage: function () {
      return this.page() + 1;
    },
    onFirstPage: function () {
      return this.page() === 0;
    },
    onLastPage: function () {
      return this.page() === this.lastPage();
    },
    lastPage: function () {
      return this.totalPages() - 1;
    }
  });

  return Pagination;
});