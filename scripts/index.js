/** weather widget */
function main()
{
	const weather = angular.module( 'weather', [] );
	const storeCitiesTest = {};
	
	weather.controller( 'weatherController', [ '$scope', '$http', ( $scope, $http ) =>
	{
		$scope.showWeather = ( city ) =>
		{
			if ( city )
			{
				const res = $http.get(
					`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=4ad85fe4a756ae6420b5a9f180c811ed` );
				
				// first letter to uppercase
				city = city.charAt(0).toUpperCase() + city.substr(1);
				
				res.success( ( data ) =>
				{
					let degree = 0;
					let speedWind = 0;
					let image = null;

					if ( data )
					{
						if ( data.main )
						{
							degree = Math.ceil( (data.main.temp - 273.15) * 100 / 100 );
						}
						
						if ( data.wind )
						{
							speedWind = data.wind.speed;
						}

						if ( data.wind )
						{
							image = data.weather[0].icon;
						}
						
						storeCitiesTest[city] = {
							city: city,
							image: image,
							degree: degree,
							speedWind: speedWind
						};
						
						$scope.cities = storeCitiesTest;
					}
					
					$scope.descriptionEmpty = '';
					$scope.city = '';
				});
			}
			else
			{
				$scope.descriptionEmpty = 'Введите город';
			}
		}
	}]);
}

main();
