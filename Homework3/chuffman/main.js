let abFilter = 25
const width = window.innerWidth;
const height = window.innerHeight;

let scatterLeft = 0, scatterTop = 0;
let scatterMargin = {top: 10, right: 30, bottom: 30, left: 60},
    scatterWidth = 400 - scatterMargin.left - scatterMargin.right,
    scatterHeight = 350 - scatterMargin.top - scatterMargin.bottom;

let distrLeft = 400, distrTop = 0;
let distrMargin = {top: 10, right: 30, bottom: 30, left: 60},
    distrWidth = 400 - distrMargin.left - distrMargin.right,
    distrHeight = 350 - distrMargin.top - distrMargin.bottom;

let teamLeft = 0, teamTop = 400;
let teamMargin = {top: 10, right: 30, bottom: 30, left: 60},
    teamWidth = width - teamMargin.left - teamMargin.right,
    teamHeight = height-450 - teamMargin.top - teamMargin.bottom;
    
d3.csv("./data/ds_salaries.csv").then(rawData =>{
    console.log("rawData", rawData);
    
    rawData.forEach(function(d){
        d.experience_level = String(d.experience_level);
        d.employment_type = String(d.employment_type);
        d.job_title = String(d.job_title);
        d.salary_in_usd = Number(d.salary_in_usd);
        d.remote_ratio = Number(d.remote_ratio);
        d.company_size = String(d.company_size);
    });

    const svg = d3.select("svg");

    var sum_se = 0;
    var n_se = 0;
    var sum_mi = 0;
    var n_mi = 0;
    var sum_en = 0;
    var n_en = 0;
    var sum_ex = 0;
    var n_ex = 0;
    
  rawData.forEach(function(d){
    if(d.experience_level == 'SE')
    {
        sum_se += d.salary_in_usd;
        n_se++;
    }
    else if(d.experience_level == 'MI')
    {
        sum_mi += d.salary_in_usd;
        n_mi++;
    }
    else if(d.experience_level == 'EN')
    {
        sum_en += d.salary_in_usd;
        n_en++;
    }
    else
    {
        sum_ex += d.salary_in_usd;
        n_ex++;
    }
    });

    sum_se = sum_se/n_se;
    sum_mi = sum_mi/n_mi;
    sum_en = sum_en/n_en;
    sum_ex = sum_ex/n_ex;

    // se = senior, en = entry level, ex = executive level, mi = mid/intermediate level
    let avgs = [Number(sum_en.toFixed(2)), Number(sum_mi.toFixed(2)), Number(sum_se.toFixed(2)), Number(sum_ex.toFixed(2))];
    //let avgs = [Number(sum_se), Number(sum_mi), Number(sum_en), Number(sum_ex)];

    var newData2 = [
        {
            experience_level: 'EN',
            avg_salaries: avgs[0]
        },
        {
            experience_level: 'MI',
            avg_salaries: avgs[1]
        },
        {
            experience_level: 'SE',
            avg_salaries: avgs[2]
        },
        {
            experience_level: 'EX',
            avg_salaries: avgs[3]
        }
    ];


    var arr2020 = [0,0,0,0];
    var n2020 = [0,0,0,0];
    var arr2021 = [0,0,0,0];
    var n2021 = [0,0,0,0];
    var arr2022 = [0,0,0,0];
    var n2022 = [0,0,0,0];
    var arr2023 = [0,0,0,0];
    var n2023 = [0,0,0,0];

    var years = ['2020', '2021', '2022', '2023'];

    rawData.forEach(function(d) {
        if(d.work_year == '2020')
        {
            if(d.experience_level == 'SE')
            {
                arr2020[2] += d.salary_in_usd;
                n2020[2]++;
            }
            else if(d.experience_level == 'MI')
            {
                arr2020[1] += d.salary_in_usd;
                n2020[1]++;
            }
            else if(d.experience_level == 'EN')
            {
                arr2020[0] += d.salary_in_usd;
                n2020[0]++;
            }
            else
            {
                arr2020[3] += d.salary_in_usd;
                n2020[3]++;
            }
        }
        if(d.work_year == '2021')
        {
            if(d.experience_level == 'SE')
            {
                arr2021[2] += d.salary_in_usd;
                n2021[2]++;
            }
            else if(d.experience_level == 'MI')
            {
                arr2021[1] += d.salary_in_usd;
                n2021[1]++;
            }
            else if(d.experience_level == 'EN')
            {
                arr2021[0] += d.salary_in_usd;
                n2021[0]++;
            }
            else
            {
                arr2021[3] += d.salary_in_usd;
                n2021[3]++;
            }
        }
        if(d.work_year == '2022')
        {
            if(d.experience_level == 'SE')
            {
                arr2022[2] += d.salary_in_usd;
                n2022[2]++;
            }
            else if(d.experience_level == 'MI')
            {
                arr2022[1] += d.salary_in_usd;
                n2022[1]++;
            }
            else if(d.experience_level == 'EN')
            {
                arr2022[0] += d.salary_in_usd;
                n2022[0]++;
            }
            else
            {
                arr2022[3] += d.salary_in_usd;
                n2022[3]++;
            }
        }
        if(d.work_year == '2023')
        {
            if(d.experience_level == 'SE')
            {
                arr2023[2] += d.salary_in_usd;
                n2023[2]++;
            }
            else if(d.experience_level == 'MI')
            {
                arr2023[1] += d.salary_in_usd;
                n2023[1]++;
            }
            else if(d.experience_level == 'EN')
            {
                arr2023[0] += d.salary_in_usd;
                n2023[0]++;
            }
            else
            {
                arr2023[3] += d.salary_in_usd;
                n2023[3]++;
            }
        }
    });

    var newData = [
        {
            2020: Number((arr2020[0]/n2020[0]).toFixed(2)),
            2021: Number((arr2021[0]/n2021[0]).toFixed(2)),
            2022: Number((arr2022[0]/n2022[0]).toFixed(2)),
            2023: Number((arr2023[0]/n2023[0]).toFixed(2)),
            experience_level: 'EN'
        },
        {
            2020: arr2020[1]/n2020[1],
            2021: arr2021[1]/n2021[1],
            2022: arr2022[1]/n2022[1],
            2023: arr2023[1]/n2023[1],
            experience_level: 'MI'
        },
        {
            2020: arr2020[2]/n2020[2],
            2021: arr2021[2]/n2021[2],
            2022: arr2022[2]/n2022[2],
            2023: arr2023[2]/n2023[2],
            experience_level: 'SE'
        },
        {
            2020: arr2020[3]/n2020[3],
            2021: arr2021[3]/n2021[3],
            2022: arr2022[3]/n2022[3],
            2023: arr2023[3]/n2023[3],
            experience_level: 'EX'
        }
    ];
    console.log(newData);

    // bar plot experience level vs. avg salary in usd

    var xScale = d3.scaleBand().range([0,500]).padding(0.5);
    var yScale = d3.scaleLinear().range([300, 0]);

    // ~~~~~~~~~~~~~~ new lines
    var xScaleOri = xScale.copy();
    var yScaleOri = yScale.copy();
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    // ~~~~~~~~~~~~~~~~~~

    var g = svg.append("g").attr("transform", "translate("+100 + "," + 0+")");
    xScale.domain(['EN', 'MI', 'SE', 'EX']);
    yScale.domain([0,250000]);
    g.append("g").attr("transform", "translate(0," + 300 + ")").call(d3.axisBottom(xScale));
    g.append("g").call(d3.axisLeft(yScale));

    // x label
    g.append("text")
    .attr("x", 500 / 2)
    .attr("y", 300 + 30)
    .attr("font-size", "15px")
    .attr("text-anchor", "middle")
    .text("Experience Level");

    // y label
    g.append("text")
    .attr("x", -(300 / 2))
    .attr("y", -65)
    .attr("font-size", "15px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Average Salaries");
    var rectsG = g.append('g');

    let count = 0;
    var rects = rectsG.selectAll("rect") 
        .data(newData) 
        .enter() 
        .append("rect") 
        .attr("class", "rect") 
        .attr("x", function (d) { 
        return xScale(d.experience_level); 
        }) 
        .attr("y", function (d) { 
        return yScale(d[2020]); 
        }) 
        .attr("width", xScale.bandwidth()) 
        .attr("height", function (d) {console.log("as: ", d[years[count]]);
        return 300 - yScale(d[years[count]]); 
        })
        .attr("fill", "green"); 
    
     /*  
    
    var rects = g.selectAll("rect").data(newData);
    var r = rects.enter().append("rect")
        .attr("y", d=> yScale(d[years[count]]))
        .attr("fill", "grey");

    var axisG = g.append('g');
    var axisXG = axisG.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

    var axisYG = axisG.append("g")
                .call(yAxis);

    /*g.append("g").attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    g.append("g").attr("class", "y-axis")
        .call(d3.axisLeft(y));*/

    g.append('text')
        .attr('class', 'title')
        .attr('x', 500 / 2)
        .attr('y', 30)
        .attr("font-size", "25px")
        .attr('text-anchor', 'middle')
        .text('Experience Level vs. Average Salary');

    g.append('text')
        .attr('class', 'title')
        .attr('x', 500 / 2)
        .attr('y', 50)
        .attr("font-size", "15px")
        .attr('text-anchor', 'middle')
        .text('EN = entry level, MI = mid level, SE = senior level, EX = executive level');

    g.append('text')
        .attr('class', 'title')
        .attr('x', 500 / 2)
        .attr('y', 65)
        .attr("font-size", "15px")
        .attr('text-anchor', 'middle')
        .text('Animation (avg salary from 2020-23)');
    
    years.forEach(function(year, i){
            count++;
            console.log(count);
            var t= d3.transition()
            .delay(1000*i)
            .duration(1000);
            rects.transition(t)
            .attr("y", d => yScale(d[year]))
            .attr("height", d => 300 - yScale(d[year]));
            })

    /*var zoom = d3.zoom()
        .scaleExtent([1, 10])
        .on("zoom", zoomed);
    
    g.call(zoom);

    function zoomed() {
        var t = d3.event.transform;
      
        rectsG.attr("transform", t);
        var newXScale = t.rescaleX(xScaleOri);
        var newYScale = t.rescaleY(yScaleOri);
        axisXG.call(xAxis.scale(newXScale))
        axisYG.call(yAxis.scale(newYScale))
      
        rects
          .attr('display', function(d) {
            if(xScale(d.x) < 0 || xScale(d.x) > width || 
              yScale(d.y) < 0 || yScale(d.y) > height) {
              return 'none';
            }
            return '';
            });
    }*/

    rects.on('mouseover', (d) => {
            d3.select('#tooltip')
            .style('opacity', 1)
            // Format number with million and thousand separator
            .html(`<div class="tooltip-label">Average Salary (USD)</div>${d3.format(',')
            (d[years[count-1]])}`);
            })
            .on('mousemove', (d) => {
            d3.select('#tooltip')
            .style('left', (d3.event.pageX + 15) + 'px')
            .style('top', (d3.event.pageY + 15) + 'px')
            })
            .on('mouseleave', () => {
            d3.select('#tooltip').style('opacity', 0);
            });
    
    // space

    const g2 = svg.append("g")
                .attr("width", distrWidth + distrMargin.left + distrMargin.right)
                .attr("height", distrHeight + distrMargin.top + distrMargin.bottom)
                .attr("transform", `translate(${distrLeft}, ${distrTop})`);

    // SCATTERPLOT:

    const g3 = svg.append("g")
                .attr("width", teamWidth + teamMargin.left + teamMargin.right)
                .attr("height", teamHeight + teamMargin.top + teamMargin.bottom)
                .attr("transform", `translate(700,0)`);

    var x = d3.scaleLinear()
    .domain([0, 100])
    .range([ 0, 400 ]);
  
    g3.append("g")
    .attr("transform", "translate(0," + 300 + ")")
    .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 460000])
        .range([ 300, 0]);
    g3.append("g")
        .call(d3.axisLeft(y));

    // x label
    g3.append("text")
    .attr("x", 200)
    .attr("y", 330)
    .attr("font-size", "15px")
    .attr("text-anchor", "middle")
    .text("Amount of Remote Work (0-100%)");

    // y label
    g3.append("text")
    .attr("x", -(300 / 2))
    .attr("y", -65)
    .attr("font-size", "15px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Average Salaries");

    var color = d3.scaleOrdinal()
    .domain(["EN", "MI", "SE", "EX" ])
    .range([ "red", "red", "blue", "blue"])

  // Add dots
  g3.append('g')
    .selectAll("dot")
    .data(rawData)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.remote_ratio); } )
      .attr("cy", function (d) { return y(d.salary_in_usd); } )
      .attr("r", 1.5)
      .style("fill", function(d) { return color(d.experience_level)});

    g3.append('text')
      .attr('class', 'title')
      .attr('x', 400 / 2)
      .attr('y', 20)
      .attr("font-size", "20px")
      .attr('text-anchor', 'middle')
      .text('Remote Work vs. Salary in USD');
    
    g3.append('text')
      .attr('class', 'title')
      .attr('x', 400 / 2)
      .attr('y', 35)
      .attr("font-size", "10px")
      .attr('text-anchor', 'middle')
      .text('Red = entry/mid level roles; Blue = senior/executive level roles');


      // last one

    const g5 = svg.append("g")
      .attr("width", teamWidth + teamMargin.left + teamMargin.right)
      .attr("height", teamHeight + teamMargin.top + teamMargin.bottom)
      .attr("transform", `translate(0, 375)`)
      .attr("style", "max-width: 100%; height: auto;");

    var unwantedCol = ["experience_level", "employment_type", "job_title", "salary", "salary_currency", "employee_residence", "company_location", "company_size"];

    dimensions = d3.keys(rawData[0]).filter(function(d) { return !unwantedCol.includes(d) });
    
    var y = {}
    for (i in dimensions) {
        var name = dimensions[i];
        y[name] = d3.scaleLinear()
        .domain( d3.extent(rawData, function(d) { return +d[name]; }) )
        .range([300, 0]);
    }

    // Build the X scale -> it find the best position for each Y axis
    x = d3.scalePoint()
        .range([0, 800])
        .padding(1)
        .domain(dimensions);

    // The path function take a row of the csv as input, and return x and y coordinates of the line to draw for this raw.
    function path(d) {
        return d3.line()(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
    }

    // Draw the lines
    const lines = g5.append("g")
        .selectAll("myPath")
        .data(rawData)
        .enter().append("path")
        .attr("d",  path)
        .attr("fill", "none")
        .attr("stroke", "#479AF0")
        .style("opacity", 0.5);

    // Draw the axis:
    const axes = g5.append("g").selectAll("myAxis")
        .data(dimensions).enter()
        .append("g")
        .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
        .each(function(d) { d3.select(this).call(d3.axisLeft().scale(y[d])); })
        .append("text")
        .style("text-anchor", "middle")
        .attr("y", -9)
        .text(function(d) { return d; })
        .style("fill", "black")
        .attr("font-size", "12px");

    // Add brush
    var brush = d3.brushY()
        .extent([[-25, 0], [25, 300]])
        .on("start brush end", brushed);

    axes.call(brush);

    // Create brush group
    var brushGroup = g5.selectAll(".brush")
        .data(dimensions)
        .enter().append("g")
        .attr("class", "brush")
        .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
        .each(function(d) { d3.select(this).call(brush); })
        .selectAll("rect")
        .attr("x", -8)
        .attr("width", 8);

    // Define brushed function
    const selections = new Map();

    function brushed({selection}, dimensions) {
        if (selection === null) {lines.attr("stroke", "#479AF0")}
        else{
            lines.attr("stroke", "#ccc");
        }
        

        /*(const selected = [];

        lines.each(function(d) {
            const active = Array.from(selections).every(([dim, [min, max]]) => d[dim] >= min && d[dim] <= max);
            // Set stroke color based on selection status
            d3.select(this).attr("stroke", active ? "#479AF0" : "#ccc");
            if (active) {
                d3.select(this).raise();
                selected.push(d);
            }
        })*/
    }

        const extents = [];
        dimensions.forEach(dimension => {
            extents.push(d3.extent(rawData, d => +d[dimension]));
        });
    

    g5.append('text')
        .attr('class', 'title')
        .attr('x', 800)
        .attr('y', 100)
        .attr("font-size", "25px")
        .attr('text-anchor', 'middle')
        .text('<- Parallel Coordinates Plot');
    
    g5.append('text')
      .attr('class', 'title')
      .attr('x', 800)
      .attr('y', 120)
      .attr("font-size", "15px")
      .attr('text-anchor', 'middle')
      .text('Brushable Plot');    


}).catch(function(error){
    console.log(error);
});

