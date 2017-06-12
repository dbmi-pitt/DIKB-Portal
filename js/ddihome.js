// 1st drug auto complete drug name
function autoCompleteObjectName() {
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
                    var tempitem = "Any";
                    var j = 0;
                    items[0] = "Any";
                    for (var i = 1; i < data.length+1; i++) {
			items[i] = data[i-1].CONCEPT_NAME;
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

    var inputObject = $('input#objectName').val();
    var restCallUrl = "http://localhost:8090/WebAPI/mpevidence/POSTGRES-DIKB/drugname/" + inputObject;
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
			items[i] = data[i-1].CONCEPT_NAME;
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


// getting precipitant and object name 
// show all assertions by type in bar
function showbar(){ 
    $(".drugselected").text("");
    $("#hoverRes").remove();
    // document.getElementById("overview").innerHTML = "";
    //d3.select("#figure").removeChild();
    d3.select("svg").remove();
    $("#detailstable").remove();
    var objectName = document.getElementById("objectName").value;
    var precipitantName = document.getElementById("precipitantName").value;
    
    if(objectName=="")
	objectName = document.getElementById("objectName").text;
    if(precipitantName=="") {
	restCall = "http://localhost:8090/WebAPI/mpevidence/POSTGRES-DIKB/drugname/" + objectName
	$.ajax({
            url: restCall,
            type: 'GET',
            dataType: 'json',
            contentType: "application/json",
            crossDomain: true,
            success: function(data) {
                //var json = JSON.parse(data);
                var length = 0;
                //alert(data.length);
                if(data.length>5)
                    length = 5;
                else
                    length = data.length;
                for (var i = 0;i < length; i++) {
                    //items[i+1] = tempitem[0];
                    drawd3diagram(objectName,data[i].CONCEPT_NAME);
                }
                
		//}) );
		
            },
            error: function(data) {
                alert("Something went wrong while getting Index list. Please try again.");
            }
            /*url: "/JSON/AjaxRequest",
              dataType: "json",
              data: request,
              success: function( data, textStatus, jqXHR) {
              console.log( data);
              var items = data;
              response(items);
              },
              error: function(jqXHR, textStatus, errorThrown){
              console.log( textStatus);
              }*/
        });
    }else{
	//var data1;
	drawd3diagram(objectName,precipitantName);
    }
    //var data1 = [{"name":"Other","value":1},{"name":"EV_PK_DDI_Par_Grps","value":1},{"name":"EV_PK_DDI_RCT","value":1},{"name":"Non_traceable_Drug_Label_Statement","value":2},{"name":"Non_traceable_Drug","value":2}];
}


// Using D3 lib, draw diagram based on precipitant and object name
function drawd3diagram(objectName,precipitantName){
    $("#hoverRes").remove();
    // document.getElementById("overview").innerHTML = "";
    d3.select("svg").remove();
    d3.select("svg").remove();
    $("#detailstable").remove();
    var datalength;
    var data1;
    $.ajax({        
	url: "http://localhost:8090/WebAPI/mpevidence/POSTGRES-DIKB/method/"+objectName+"/"+precipitantName,
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
		
		d.boxes = color.domain().map(function(name) { return {fullname: methodResults[idx].inferredMethod, name: name, x0: x0, x1: x0 += +methodResults[idx].value, n: +methodResults[idx++].value}; });
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
		.on('mousedown', function(d) {showtable(d.name,d.fullname,precipitantName,objectName); this.style("font-size","30px")});
	    

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
	    
	    svg.append("text")
		.attr("x", -60)
		.attr("y", 9)
		.attr("dy", ".35em")
		.style("text-anchor", "begin")
		.style("font" ,"10px sans-serif")
		.text(function(d) { return precipitantName; });
	    
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
function showtable(clickname,clicksource,precipitantName,objectName){
    console.log("ddihome.js: showtable called");
    
    var clicktext = clicksource;
    $("#detailstable").remove();
    $(".drugselected").text("Details: " + clickname+"-"+objectName+"-"+precipitantName);
    var objectName = document.getElementById("objectName").value;
    var table = $('<table id="detailstable" width="1000px" align="center"></table>');
    var row = $('<tr></tr>');
    var column  = $('<td>Predicate</td><td>Precipitant</td><td>Evidence Standpoint</td><td width="1200px">Evidence Content</td>');
    $('#here_table').append(table);
    row.append(column);
    table.append(row);

    var datalength;
    var data1;
    //document.write("    <td valign = 'top'>Evidence Against</td>");
    $.ajax({
	url: "http://localhost:8090/WebAPI/mpevidence/POSTGRES-DIKB/search/" + objectName + "/" + precipitantName + "/" + clicksource,
        type: 'GET',
        dataType: 'json',
        contentType: "application/json",
        crossDomain: true,
        success: function(data) {
            //alert(clicksource + data.length);
            //alert(data[0].Object);
            
            for (var i = 0; i < data.length; i++) {
                table.append("evidence table");                
            }
        },
        error: function(data) {
            alert("Something went wrong while getting Index list. Please try again.");
        }        
    });    
}
