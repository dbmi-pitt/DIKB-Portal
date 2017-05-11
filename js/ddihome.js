// 1st drug auto complete drug name
function autoCompleteObjectName() {
    var restCallUrl = "http://localhost:8090/WebAPI/mpevidence/POSTGRES-DIKB/objectdrugname";
    $("input#autoText").autocomplete({ 
        width: 300,
        max: 10,
        delay: 100,
        minLength: 1,
        autoFocus: true,
        cacheLength: 1,
        scroll: true,
        highlight: false,
        source: function(request, response) {
            var query = request.term;
            $.ajax({
                url: restCallUrl,
		type: 'GET',
		dataType: 'json',
		data: request,
		contentType: "application/json",
		crossDomain: true,
		success: function(data, textStatus, jqXHR) {
                    var items = [];
                    var tempitem = "Any";
                    var j = 0;
                    items[0] = "Any";
                    for (var i = 1; i < data.length+1; i++) {
			items[i] = data[i-1].DRUG;
                    }
                    var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
		    
                    if(request.term == " ")
                    {
			response( $.grep( items, function( item ){
                            return item;
			}) );
                    }else {
			response( $.grep( items, function( item ){
                            return matcher.test( item );
			}) );
                    }            
		},
		error: function(jqXHR, textStatus, errorThrown) {
                    alert("Something went wrong while getting Index list. Please try again.");
		}
            });
        }	
    });
}


// 2nd drug auto complete drug name
// Note: may have problems when triggering auto complete
function autoCompletePrecipitantName(){

    var inputObject = $('input#autoText').val();
    //alert($('select[id="autoText"]').val());
    //alert(inputObject);
    
    var restCallUrl = "http://localhost:8090/WebAPI/mpevidence/POSTGRES-DIKB/precipitantdrugname/" + inputObject;

    $("input#precipitantName").autocomplete({      
	width: 300,
        max: 10,
        delay: 100,
        minLength: 1,
        autoFocus: true,
        cacheLength: 1,
        scroll: true,
        highlight: false,
        source: function(request, response) {
            var query = request.term;
            $.ajax({
                url: restCallUrl,
		type: 'GET',
		dataType: 'json',
		data: request,
		contentType: "application/json",
		crossDomain: true,
		success: function(data, textStatus, jqXHR) {
                    //var json = JSON.parse(data);
                    var items = [];
                    var tempitem = "Any";
                    var j = 0;
                    for (var i = 1; i < data.length+1; i++) {
			items[i] = data[i-1].DRUG;
                    }
                    var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
                    if(request.term == " ")
                    {
			response( $.grep( items, function( item ){
                            return item;
			}) );
                    }else {
			response( $.grep( items, function( item ){
                            return matcher.test( item );
			}) );
                    }
		},
		error: function(jqXHR, textStatus, errorThrown) {
                    alert("Something went wrong while getting Index list. Please try again.");
		}
            });
        }	
    });
}



function strStartsWith(str, prefix) {
    return str.indexOf(prefix) === 0;
}
