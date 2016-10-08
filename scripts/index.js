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
						
						console.log( data );
					}

					containerListCities.appendChild( createElement( city, degree, speedWind, image ) );
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

function createElement( city, degree, speedWind, image )
{
	const container = document.createElement( 'li' );
	const cityContainer = document.createElement( 'span' );
	const imageContainer = document.createElement( 'img' );
	const degreesContainer = document.createElement( 'span' );
	const speedWindContainer = document.createElement( 'span' );

	cityContainer.classList.add( 'city' );
	degreesContainer.classList.add( 'degrees' );
	speedWindContainer.classList.add( 'speedWind' );
	
	cityContainer.textContent = city;
	imageContainer.src = `http://openweathermap.org/img/w/${image}.png`;
	degreesContainer.textContent = `Температура ${degree} °C`;
	speedWindContainer.textContent = `Скорость ветра ${speedWind} м/с`;
	
	container.appendChild( cityContainer );
	container.appendChild( imageContainer );
	container.appendChild( degreesContainer );
	container.appendChild( speedWindContainer );
	
	return container;
}

main();