/** Погодный виджет */
function main()
{
	const weather = angular.module( 'weather', [] );
	const weatherController = document.querySelector( 'body>div.weatherController' );
	const inputElement = document.getElementById( 'dataInput' );
	const containerListCities = weatherController.querySelector( 'ul.output' );
	const description = weatherController.querySelector( 'span.description' );
	
	weather.controller( 'weatherController', [ '$scope', '$http', ( $scope, $http ) =>
	{
		$scope.showWeather = ( city ) =>
		{
			if ( city )
			{
				const res = $http.get(
					`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=4ad85fe4a756ae6420b5a9f180c811ed` );

				// Преобразую первую букву в заглавную
				city = city.charAt(0).toUpperCase() + city.substr(1);
				
				res.success( ( data ) =>
				{
					let degree = 0;

					if ( data )
					{
						if ( data.main )
						{
							degree = Math.ceil( (data.main.temp - 273.15) * 100 / 100 );
						}
					}

					containerListCities.appendChild( createElement( city, degree ) );
					inputElement.value = '';
					
					if ( description.textContent )
					{
						description.textContent = '';
					}
				});
			}
			else
			{
				description.textContent = 'Введите город';
			}
		}
	}]);
}

function createElement( city, degree )
{
	const container = document.createElement( 'li' );
	const cityContainer = document.createElement( 'span' );
	const degreesContainer = document.createElement( 'span' );

	cityContainer.classList.add( 'city' );
	degreesContainer.classList.add( 'degrees' );
	cityContainer.textContent = city + ' ';
	degreesContainer.textContent = degree;
	
	container.appendChild( cityContainer );
	container.appendChild( degreesContainer );
	
	return container;
}

main();