/** weather widget */
function main()
{
	const weather = angular.module( 'weather', [] );
	weather.constant( 'ENDPOINT', 'http://api.openweathermap.org/data/2.5/weather' );
	weather.constant( 'APPID', '4ad85fe4a756ae6420b5a9f180c811ed' );
	
	const storeCities = {};
	
	weather.controller( 'weatherController', [ '$scope', '$http', 'ENDPOINT', 'APPID', ( $scope, $http, ENDPOINT, APPID ) =>
	{
		$scope.showWeather = ( city ) =>
		{
			if ( city )
			{
				const res = $http.get( `${ENDPOINT}?q=${city}&APPID=${APPID}` );
				
				// first letter to uppercase
				city = city.charAt(0).toUpperCase() + city.substr(1);
				
				res.then( ( res ) =>
				{
					const data = res.data;
					let degree = 0;
					let speedWind = 0;
					let image;

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
						
						storeCities[city] = {
							city: city,
							image: image,
							degree: degree,
							speedWind: speedWind
						};
						
						$scope.cities = storeCities;
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
