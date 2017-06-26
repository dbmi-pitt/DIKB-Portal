// 1st drug auto complete drug name
function autoCompleteDrugname1() {
    var restCallUrl = "http://localhost:8090/WebAPI/mpevidence/POSTGRES-DIKB/drugname";
    $("input#objectName").autocomplete({ 
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
		    items[0] = {value: "Any", conceptCode: null, vocabularyId: null, conceptClassId: null};
		    
                    for (var i = 1; i < data.length+1; i++) {
			items[i] = {value: data[i-1].CONCEPT_NAME, conceptCode: data[i-1].CONCEPT_CODE, vocabularyId: data[i-1].VOCABULARY_ID, conceptClassId: data[i-1].CONCEPT_CLASS_ID};
                    }
                    var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
		    
                    if(request.term == " ") {
			response( $.grep( items, function( item ){
                            return item.value;
			}) );
                    } else {
			response( $.grep( items, function( item ){
                            return matcher.test( item.value );
			}) );
                    }
		},
		error: function(jqXHR, textStatus, errorThrown) {
                    alert("Something went wrong while getting Index list. Please try again.");
		}
            });
        },
	select: function(event, ui) {
	    // update drug 1 infor (concept name, concept code, vocabulary id)
	    $("#drugConceptItem1").attr("concept_name", ui.item.value);
	    $("#drugConceptItem1").attr("concept_code", ui.item.conceptCode);
	    $("#drugConceptItem1").attr("vocabulary_id", ui.item.vocabularyId);
	    $("#drugConceptItem1").attr("concept_class_id", ui.item.conceptClassId);
	}
    });
}


// 2nd drug auto complete drug name
// Note: may have problems when triggering auto complete
function autoCompleteDrugname2(){

    var drug1 = $("#drugConceptItem1");
    var conceptName = drug1.attr("concept_name");
    var vocabularyId = drug1.attr("vocabulary_id");
    var conceptCode = drug1.attr("concept_code");
    var restCallUrl = "http://localhost:8090/WebAPI/mpevidence/POSTGRES-DIKB/drugname2/" + vocabularyId.toLowerCase() + "-" + conceptCode;
    
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
		    items[0] = {value: "Any", conceptCode: null, vocabularyId: null, conceptClassId: null};
		    
                    for (var i = 1; i < data.length+1; i++) {
			items[i] = {value: data[i-1].CONCEPT_NAME, conceptCode: data[i-1].CONCEPT_CODE, vocabularyId: data[i-1].VOCABULARY_ID, conceptClassId: data[i-1].CONCEPT_CLASS_ID};
                    }
                    var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );

		    if(request.term == " ") {
			response( $.grep( items, function( item ){
                            return item.value;
			}));
                    }else {
			response( $.grep( items, function( item ){
                            return matcher.test( item.value );
			}));
                    }
		},
		error: function(jqXHR, textStatus, errorThrown) {
                    alert("Something went wrong while getting Index list. Please try again.");
		}
            });
        },
	select: function(event, ui) {
	    // update drug 2 infor (concept name, concept code, vocabulary id)
	    $("#drugConceptItem2").attr("concept_name", ui.item.value);
	    $("#drugConceptItem2").attr("concept_code", ui.item.conceptCode);
	    $("#drugConceptItem2").attr("vocabulary_id", ui.item.vocabularyId);
	}	
    });
}


function drawd3diagramForOneDrug(conceptName, vocabularyId, conceptCode) {
    restfulCall = "http://localhost:8090/WebAPI/mpevidence/POSTGRES-DIKB/drugname2/" + vocabularyId.toLowerCase() + "-" + conceptCode;
    $.ajax({
        url: restfulCall,
        type: 'GET',
        dataType: 'json',
        contentType: "application/json",
        crossDomain: true,
        success: function(data) {
            var length = 0;
            if(data.length>5)
                length = 5;
            else
                length = data.length;
            for (var i = 0;i < length; i++) {
                drawd3diagram(conceptName, vocabularyId, conceptCode, data[i].CONCEPT_NAME, data[i].VOCABULARY_ID, data[i].CONCEPT_CODE);
            }		
        },
        error: function(data) {
            alert("[WARN] Something went wrong while getting Index list. Please try again.");
        }
    });
}


// getting precipitant and object name 
// show all assertions by type in bar
function showbar(){ 
    $(".drugselected").text("");
    $("#hoverRes").remove();    
    d3.select("svg").remove();
    $("#evidencetable").remove();
    
    var drug1 = $("#drugConceptItem1");
    var drug2 = $("#drugConceptItem2");
    
    var conceptName1 = drug1.attr("concept_name");
    var vocabularyId1 = drug1.attr("vocabulary_id");
    var conceptCode1 = drug1.attr("concept_code");

    var conceptName2 = drug2.attr("concept_name");
    var vocabularyId2 = drug2.attr("vocabulary_id");
    var conceptCode2 = drug2.attr("concept_code");

    if (conceptCode1 == null && conceptCode2 == null) {
	alert("[INFO] please select at least one drug for search!");
    } else if (conceptCode1 == null || vocabularyId1 == null) {
	drawd3diagramForOneDrug(conceptName2, vocabularyId2, conceptCode2);
    } else if (conceptCode2 == null || vocabularyId2 == null) {
	drawd3diagramForOneDrug(conceptName1, vocabularyId1, conceptCode1);
    } else{
	console.log("both drugs have been filled");
	drawd3diagram(conceptName1, vocabularyId1, conceptCode1, conceptName2, vocabularyId2, conceptCode2);
    }
}


// Using D3 lib, draw diagram based on precipitant and object name
function drawd3diagram(conceptName1, vocabularyId1, conceptCode1, conceptName2, vocabularyId2, conceptCode2){
    $("#hoverRes").remove();
    d3.select("svg").remove();
    d3.select("svg").remove();
    $("#evidencetable").remove();
    var datalength;
    $.ajax({        
	url: "http://localhost:8090/WebAPI/mpevidence/POSTGRES-DIKB/method/" + vocabularyId1.toLowerCase() + "-" + conceptCode1 + "/" + vocabularyId2.toLowerCase() + "-" + conceptCode2,
        type: 'GET',
        dataType: 'json',
        contentType: "application/json",
        crossDomain: true,
        success: function(data) {
            // var json = JSON.parse(data);	    
            datalength = data.length;
            methodResults = data;
            var margin = {top: 70, right: 40, bottom: 10, left: 65},
		width = 600 - margin.left - margin.right,
		height = 105 - margin.top - margin.bottom;  //chart width	    
	    var y = d3.scale.ordinal()
		.rangeRoundBands([0, height], .3);
	    
	    var x = d3.scale.linear()
		.rangeRound([0, width]);
	    
	    var color = d3.scale.ordinal()
		.range(["#c7001e", "#f6a580", "#cccccc", "#92c6db", "#086fad", "#c7001e", "#f6a580"]); //color chunk

	    var xAxis = d3.svg.axis() //y axis
		.scale(x)
		.orient("top");
	    
	    var yAxis = d3.svg.axis() //x axis
		.scale(y)
		.orient("left")
	    
	    var svg = d3.select("#figure").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.attr("id", "d3-plot")
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	    // add list of method to method list for generating color bar
	    var methodL = []
	    methodResults.forEach(function(methodItem) {
		methodL.push(methodItem.method);
	    });
	    color.domain(methodL);

	    //------------------------loop parse csv-----------------------------
	    methodResults.forEach(function(d) {
		//d.date = parseDate(d.date);
		//d.close = +d.close;
		// calc percentages
		/*d["Strongly disagree"] = +d[1]*100/d.N;
		  d["Disagree"] = +d[2]*100/d.N;
		  d["Neither agree nor disagree"] = +d[3]*100/d.N;
		  d["Agree"] = +d[4]*100/d.N;
		  d["Strongly agree"] = +d[5]*100/d.N;*/
		/*d[data1[0].method] = +data1[0].value;
		  d[data1[1].method] = +data1[1].value;
		  d[data1[2].method] = +data1[2].value;
		  d[data1[3].method] = +data1[3].value;
		  d[data1[4].method] = +data1[4].value;
		  var x0 = -1*(d[data1[2].method]/2+d[data1[1].method]+d[data1[0].method]); //x0 axis*/
		var x0 = 0;
		var idx = 0;
		
		d.boxes = color.domain()
		    .map(function(name)
			 {
			     return {fullname: methodResults[idx].inferredMethod, name: name, x0: x0, x1: x0 += +methodResults[idx].value, n: +methodResults[idx++].value};
			 });
	    });

	    var min_val = d3.min(data, function(d) {
		return d.boxes["0"].x0;		
            });	    
	    var max_val = d3.max(data, function(d) {
		return d.boxes[datalength-1].x1;
            });
	    
	    x.domain([min_val, max_val]).nice();
	    y.domain(data.map(function(d) { return d.Question; }));
	    	    
	    svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
	    
	    var vakken = svg.selectAll(".question")
		.data(data)
		.enter().append("g")
		.attr("class", "bar")
		.attr("transform", function(d) { return "translate(0," + y(d.Question) + ")"; });
	    
	    var bars = vakken.selectAll("rect")
		.data(function(d) { return d.boxes; })
		.enter().append("g").attr("class", "subbar")	    	    
		.on('mousedown', function(d) {
		    console.log(d);
		    showtable(d.name, d.fullname, conceptName1, conceptName2);
		    // this.style("font-size","30px");
		}); // show evidence table when click on method
	    
	    //------------------------bar-----------------------------------d.x0, d.x1, d.name
	    bars.append("rect")
		.attr("height", y.rangeBand())
		.attr("x", function(d) { return x(d.x0); })
		.attr("width", function(d) { return x(d.x1) - x(d.x0); })
		.style("fill", function(d) { return color(d.name); });
	    //.addEventListener("click", test());

	    //----------------------text on bar----------------------------d.x0, d.x1, d.n
	    bars.append("text")
		.attr("x", function(d) { return x(d.x0); })
		.attr("y", y.rangeBand()/2)
		.attr("dy", "0.5em")
		.attr("dx", "0.5em")
		.style("font" ,"10px sans-serif")
		.style("text-anchor", "begin")
		.text(function(d) { return d.n !== 0 && (d.x1-d.x0)>0 ? d.n : "" });
	    
	    //----------------------bar background------------------------
	    vakken.insert("rect",":first-child")
		.attr("height", y.rangeBand())
		.attr("x", "1")
		.attr("width", width)
		.attr("fill-opacity", "0.5")
		.style("fill", "#F5F5F5")
		.attr("class", function(d,index) { return index%2==0 ? "even" : "uneven"; });
	    
	    svg.append("g")
		.attr("class", "y axis")
		.append("line")
		.attr("x1", x(0))
		.attr("x2", x(0))
		.attr("y2", height);

	    // customize the name of color bar as 2nd drug concept name 
	    svg.append("text")
		.attr("x", -60)
		.attr("y", 9)
		.attr("dy", ".35em")
		.style("text-anchor", "begin")
		.style("font" ,"10px sans-serif")
		.text(function(d) { return conceptName2; });
	    
	    //-------------------------legend-----------------------------
	    var startp = svg.append("g").attr("class", "legendbox").attr("id", "mylegendbox");
	    // this is not nice, we should calculate the bounding box and use that
	    var legend_tabs = [60, 45, 30, 15, 0, 100];
	    var legend = startp.selectAll(".legend")
		.data(color.domain().slice())
		.enter().append("g")
		.attr("class", "legend")
		.attr("transform", function(d, i) { return "translate(0," + legend_tabs[i] + ")"; });
	    //.attr("transform", function(d, i) { return "translate(" + legend_tabs[i] + ",-45)"; });
	    legend.append("rect")
		.attr("x", 0)
		.attr("width", 18)
		.attr("height", 10)
		.style("fill", color);
	    
	    legend.append("text")
		.attr("x", 22)
		.attr("y", 9)
		.attr("dy", ".35em")
		.style("text-anchor", "begin")
		.style("font" ,"10px sans-serif")
		.text(function(d) { return d; });
	    
	    d3.selectAll(".axis path")
		.style("fill", "none")
		.style("stroke", "#000")
		.style("shape-rendering", "crispEdges")
	    
	    d3.selectAll(".axis line")
		.style("fill", "none")
		.style("stroke", "#000")
		.style("shape-rendering", "crispEdges")
	    
	    var movesize = width/2 - startp.node().getBBox().width/2;
	    d3.selectAll(".legendbox").attr("transform", "translate(" + movesize  + ",-70)");
        },
        error: function(data) {
            alert("Something went wrong while getting Index list. Please try again.");
        }        
    });
}


// based on two drugs, list details of assertion with grouped evidence
function showtable(method, inferredMethod, conceptName1, conceptName2){
    var method = method.replace(/ /g, '-');
    $("#evidencetable").remove();
    $(".drugselected").text("Details: " + method + "-" + conceptName1 + "-" + conceptName2);

    $.ajax({
	url: "http://localhost:8090/WebAPI/mpevidence/POSTGRES-DIKB/search/" + conceptName1 + "/" + conceptName2 + "/" + method,
        type: 'GET',
        dataType: 'json',
        contentType: "application/json",
        crossDomain: true,
        success: function(data) {
            console.log(data);
	    var columns = ['mp_claim_id','label','claim_text','method','subject'];
	    tabulate(data, columns);	    
        },
        error: function(data) {
            alert("Something went wrong while getting Index list. Please try again.");
        }        
    });    
}


function tabulate(data, columns) {
    
    var table = d3.select('#evidence-table-anchor').append('table');
    var thead = table.append('thead')
    var	tbody = table.append('tbody');
    
    // append the header row
    thead.append('tr')
	.selectAll('th')
	.data(columns).enter()
	.append('th')
	.text(function (column) { return column; });
    
    // create a row for each object in the data
    var rows = tbody.selectAll('tr')
	.data(data)
	.enter()
	.append('tr');
    
    // create a cell in each row for each column
    var cells = rows.selectAll('td')
	.data(function (row) {	    
	    return columns.map(function (column) {
		return {column: column, value: row[column]};
	    });
	})
	.enter()
	.append('td')
	.text(function (d) { return d.value; });
   
}

function strStartsWith(str, prefix) {
    return str.indexOf(prefix) === 0;
}
