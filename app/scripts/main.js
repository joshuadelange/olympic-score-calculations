var Handlebars = Handlebars,
	athletesByCountries = athletesByCountries ;

Handlebars.registerHelper('math', function(lvalue, operator, rvalue) {

	'use strict' ;

    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);
        
    return {
        '+': lvalue + rvalue,
        '-': lvalue - rvalue,
        '*': lvalue * rvalue,
        '/': lvalue / rvalue,
        '%': lvalue % rvalue
    }[operator];

});

$(document).ready(function(){
	
	'use strict' ;

	var template = Handlebars.compile($('#countries').html()),
		countries = [] ;

	$.getJSON('http://www.kimonolabs.com/api/751j6x7w?apikey=ade40a23fb70523f951a0d582180bf3f&callback=?', function(response){

		$.each(response.results.collection1, function(index, country){
			
			$.each(athletesByCountries, function(index, athletesByCountry){

				if(athletesByCountry.name === country.name.text) {

					countries.push({
						'name': country.name.text,
						'link': country.name.href,
						'total': country.total,
						'gold': country.gold,
						'silver': country.silver,
						'bronze': country.bronze,
						'rank': country.rank,
						'athletes': athletesByCountry.athletes,
						'medalsAthletesRatio': (country.total / athletesByCountry.athletes).toFixed(2)
					}) ;

				}

			}) ;

		}) ;

		countries.sort(function(a, b){
			return b.medalsAthletesRatio - a.medalsAthletesRatio ;
		}) ;

		$('tbody').html(template(countries)) ;

		$('.loader').hide() ;

	}) ;

}) ;