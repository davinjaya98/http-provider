(function(window, angular) {
    'use strict';
    //Include it on your ng module as 'HttpProvider'
    var httpProvider = angular.module("HttpProvider", [])
        .info({ angularVersion: '1.7.8' });

    httpProvider.service("HTTPProvider", ['$q', '$http',
        function($q, $http) {
            var DYNAMIC_SETTING = {
                enableLoading: false,
            };
            var FIXED_SETTING = {
                loadingTemplate: `<div id="loading" class="loading justify-content-center align-items-center" style="display: none"><img src="${loadingImage}" width="48" height="48"></div>`
            };

            //Innate Functions
            function addLoading(elem) {
                if (!elem) {
                    $("body").append(FIXED_SETTING.loadingTemplate);
                    $("#loading").fadeIn(300);
                } else {
                    $(elem).append(FIXED_SETTING.loadingTemplate);
                    $(`${elem} #loading`).fadeIn(300);
                }
            }

            function removeLoading(elem) {
                if (!elem) {
                    $(`#loading`).fadeOut(300, function() {
                        $(this).remove();
                    });
                } else {
                    $(`${elem} #loading`).fadeOut(300, function() {
                        $(this).remove();
                    });
                }
            }

            function handleSuccess(defer, response) {
                defer.resolve(response.data);
            }

            function handleError(defer, error) {
                defer.reject(response.data);
            }
            //Innate Functions
            this.setSetting = function(opt) {
                this.DYNAMIC_SETTING = opt;
            }
            this.postFormData = (url, formData, headers, loadingTarget) => {
                var defer = $q.defer();
                var headers = {
                    'Content-Type': undefined,
                    ...headers
                };
                if (this.DYNAMIC_SETTING.enableLoading) {
                    addLoading(loadingTarget);
                }
                $http.post(url, formData, { headers }).then((response) => {
                    this.handleSuccess(defer, response);
                }).catch((error) => {
                    this.handleError(defer, error);
                }).finally(() => {
                    if (this.DYNAMIC_SETTING.enableLoading) {
                        removeLoading(loadingTarget);
                    }
                });
                return defer.promise;
            }
            this.postJson = (url, jsonData, headers, loadingTarget) => {
                var defer = $q.defer();
                var headers = {
                    ...headers
                };
                if (this.DYNAMIC_SETTING.enableLoading) {
                    addLoading(loadingTarget);
                }
                $http.post(url, JSON.stringify(jsonData), { headers }).then((response) => {
                    this.handleSuccess(defer, response);
                }).catch((error) => {
                    this.handleError(defer, error);
                }).finally(() => {
                    if (this.DYNAMIC_SETTING.enableLoading) {
                        removeLoading(loadingTarget);
                    }
                });
                return defer.promise;
            }
        }
    ]);
})(window, window.angular);