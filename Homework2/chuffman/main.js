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

    // star plot of colors = levels of experience, lines = salaries in usd, remote%, company size
    
    rawData.forEach(function(d){
        d.experience_level = String(d.experience_level);
        d.employment_type = String(d.employment_type);
        d.job_title = String(d.job_title);
        d.salary_in_usd = Number(d.salary_in_usd);
        d.remote_ratio = Number(d.remote_ratio);
        d.company_size = String(d.company_size);
        console.log(d.company_size);
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

    let avgs = [Number(sum_en), Number(sum_mi), Number(sum_se), Number(sum_ex)];
    //let avgs = [Number(sum_se), Number(sum_mi), Number(sum_en), Number(sum_ex)];

    var newData = [
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

    // bar plot experience level vs. avg salary in usd

    var xScale = d3.scaleBand().range([0,2000]).padding(0.5);
    var yScale = d3.scaleLinear().range([1500, 0]);

    var g = svg.append("g").attr("transform", "translate("+200 + "," + 0+")");
    xScale.domain(['EN', 'MI', 'SE', 'EX']);
    yScale.domain([0,250000]);

    g.append("g").attr("transform", "translate(0," + 1500 + ")").call(d3.axisBottom(xScale));
    g.append("g").call(d3.axisLeft(yScale));

    // x label
    g.append("text")
    .attr("x", 2000 / 2)
    .attr("y", 1500 + 50)
    .attr("font-size", "50px")
    .attr("text-anchor", "middle")
    .text("Experience Level");

    // y label
    g.append("text")
    .attr("x", -(1500 / 2))
    .attr("y", -100)
    .attr("font-size", "50px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Average Salaries");

    g.selectAll(".bar") 
    .data(newData) 
    .enter() 
    .append("rect") 
    .attr("class", "bar") 
    .attr("x", function (d) { 
    return xScale(d.experience_level); 
    }) 
    .attr("y", function (d) { 
    return yScale(d.avg_salaries); 
    }) 
    .attr("width", xScale.bandwidth()) 
    .attr("height", function (d) {console.log("as: ", d.avg_salaries);
    return 1500 - yScale(d.avg_salaries); 
    })
    .attr("fill", "green"); 

    g.append('text')
        .attr('class', 'title')
        .attr('x', 2000 / 2)
        .attr('y', 200/2)
        .attr("font-size", "80px")
        .attr('text-anchor', 'middle')
        .text('Experience Level vs. Average Salary');

    g.append('text')
        .attr('class', 'title')
        .attr('x', 2000 / 2)
        .attr('y', 400/2)
        .attr("font-size", "50px")
        .attr('text-anchor', 'middle')
        .text('EN = entry level, MI = mid level, SE = senior level, EX = executive level');


    // space

    const g2 = svg.append("g")
                .attr("width", distrWidth + distrMargin.left + distrMargin.right)
                .attr("height", distrHeight + distrMargin.top + distrMargin.bottom)
                .attr("transform", `translate(${distrLeft}, ${distrTop})`);

    // scatterplot of remote work vs. salary in usd

    const g3 = svg.append("g")
                .attr("width", teamWidth + teamMargin.left + teamMargin.right)
                .attr("height", teamHeight + teamMargin.top + teamMargin.bottom)
                .attr("transform", `translate(2500, 100)`);

    var x = d3.scaleLinear()
    .domain([0, 100])
    .range([ 0, 2000 ]);
  
    g3.append("g")
    .attr("transform", "translate(0," + 1500 + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 460000])
    .range([ 1500, 0]);
  g3.append("g")
    .call(d3.axisLeft(y));

    // x label
    g3.append("text")
    .attr("x", 2000 / 2)
    .attr("y", 1500 + 50)
    .attr("font-size", "50px")
    .attr("text-anchor", "middle")
    .text("Amount of Remote Work (0-100%)");

    // y label
    g3.append("text")
    .attr("x", -(1500 / 2))
    .attr("y", -100)
    .attr("font-size", "50px")
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
      .attr('x', 2000 / 2)
      .attr('y', 200/2)
      .attr("font-size", "80px")
      .attr('text-anchor', 'middle')
      .text('Remote Work vs. Salary in USD');
    
    g3.append('text')
      .attr('class', 'title')
      .attr('x', 2000 / 2)
      .attr('y', 400/2)
      .attr("font-size", "50px")
      .attr('text-anchor', 'middle')
      .text('Red = entry/mid level roles; Blue = senior/executive level roles');
    


}).catch(function(error){
    console.log(error);
});

