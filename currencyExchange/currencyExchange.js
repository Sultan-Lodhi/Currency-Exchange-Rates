var sultanApp = angular.module('sultanApp',[])
    .controller('currencyExchange2',
        function ($scope, $http) {

            /* Defining an array to show full currency name w.r.t currency codes */
            $scope.currencyNames = {'USD': 'US dollar', 'JPY': 'Japanese yen', 'BGN': 'Bulgarian lev','CZK':'Czech koruna','DKK':'Danish krone','GBP':'Pound sterling','HUF':'Hungarian forint','PLN':'Polish zloty','RON':'Romanian leu','SEK':'Swedish krona','CHF':'Swiss franc','ISK':'	Icelandic krona','NOK':'Norwegian krone','HRK':'Croatian kuna','RUB':'Russian rouble','TRY':'Turkish lira','AUD':'Australian dollar','BRL':'Brazilian real','CAD':'Canadian dollar','CNY':'Chinese yuan renminbi','HKD':'Hong Kong dollar','IDR':'Indonesian rupiah','ILS':'Israeli shekel','INR':'	Indian rupee','KRW':'South Korean won','MXN':'Mexican peso','MYR':'Malaysian ringgit','NZD':'New Zealand dollar','PHP':'Philippine peso','SGD':'Singapore dollar','THB':'Thai baht','ZAR':'South African rand','EUR':'European Euro'};

            /**** Fetching List of Currencies Stored in Database *****/
            $http.get("currencyExchange.php").success(function (response) {
                $scope.currencyList = response.data;
            });

            /** Getting diff. Currency rates w.r.t currency selected from dropdown **/
            $scope.getCurrencyRates = function (currencyCode) {
                $scope.defaultCurrency = $scope.currencyNames[currencyCode];
                $http.get("https://api.exchangeratesapi.io/latest?base="+currencyCode).success(function (response) {
                    $scope.currencyData = response.rates;
                    /**** Converting an object into an array of objects and inserting new keys too ****/
                    $scope.currencyArray = []; var i = 0;
                    for (var key in $scope.currencyData) {
                        if ($scope.currencyData.hasOwnProperty(key)) {
                            $scope.currencyArray[i] = {'id':i+1,'currencyCode':key,'currencyName':$scope.currencyNames[key],'rate':$scope.currencyData[key].toFixed(4)};
                            i++;
                        }
                    }
                });
            };

            /** Showing by default list of exchange rates w.r.t Indian Rupee **/
            $scope.getCurrencyRates('INR');
        });