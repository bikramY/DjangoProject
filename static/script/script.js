var w = window.innerWidth,
    h = window.innerHeight,
    canvas = document.getElementById('bubble'),
    ctx = canvas.getContext('2d'),
    rate = 60,
    arc = 100,
    time,
    count,
    size = 7,
    speed = 20,
    lights = new Array,
    colors = ['#d59254', '#ffffff', '#1f2839', '#cf7693'];

canvas.setAttribute('width', w);
canvas.setAttribute('height', h);

function init() {
    time = 0;
    count = 0;

    for (var i = 0; i < arc; i++) {
        lights[i] = {
            x: Math.ceil(Math.random() * w),
            y: Math.ceil(Math.random() * h),
            toX: Math.random() * 5 + 1,
            toY: Math.random() * 5 + 1,
            c: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * size
        }
    }
}

function bubble() {
    ctx.clearRect(0, 0, w, h);

    for (var i = 0; i < arc; i++) {
        var li = lights[i];

        ctx.beginPath();
        ctx.arc(li.x, li.y, li.size, 0, Math.PI * 2, false);
        ctx.fillStyle = li.c;
        ctx.fill();

        li.x = li.x + li.toX * (time * 0.05);
        li.y = li.y + li.toY * (time * 0.05);

        if (li.x > w) {
            li.x = 0;
        }
        if (li.y > h) {
            li.y = 0;
        }
        if (li.x < 0) {
            li.x = w;
        }
        if (li.y < 0) {
            li.y = h;
        }
    }
    if (time < speed) {
        time++;
    }
    timerID = setTimeout(bubble, 1000 / rate);
}
init();
bubble();
var animation = 'easeOutCubic';
delay = 60;

$(document)
    .on('click', '.fa-bars', function() {
        var i = 0;
        $('nav').before($('#bubble'));
        $('#bubble').fadeIn();
        $('#mainnav').find('li').each(function() {
            var that = $(this);
            i++;
            (function(i, that) {
                setTimeout(function() {
                    that
                        .animate({
                            'left': '20px'
                        }, {
                            duration: 350,
                            easing: animation
                        })
                        .fadeIn({
                            queue: false
                        });
                }, delay * i)
            }(i, that))
        });
        $('.fa-bars').fadeOut(100, function() {
            $(this)
                .removeClass('fa-bars')
                .addClass('fa-times')
                .fadeIn();
        });
    })
    .on('click', '#bubble, .fa-times', function() {
        $('#bubble').fadeOut();
        $('#mainnav').find('li')
            .animate({
                'left': '-550px'
            }, {
                duration: 250
            })
            .fadeOut({
                queue: false
            });

        $('.hamb').fadeOut(100, function() {
            $(this)
                .find($('i'))
                .removeClass('fa-times')
                .addClass('fa-bars')
                .end()
                .fadeIn();
        });
    })


function getAndUpdate() {
    console.log("updating list....");
    tits = document.getElementById("title").value; // getting title in tits variale
    desc = document.getElementById("description").value;
    time = document.getElementById("time").value;
    // getting description in desc variale

    if (localStorage.getItem("itemsJson") == null) {
        // if the local storage is clear
        //  an array should be created and filled with tits and desc
        itemJsonArray = []; // empty array
        itemJsonArray.push([tits, desc, time]); // filling empty array with the data given by user
        localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray)); // storing in local storage
    } else {
        itemJsonArrayStr = localStorage.getItem("itemsJson");
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([tits, desc, time]);
        localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    }
    update();
}

function update() {
    if (localStorage.getItem("itemsJson") == null) {
        itemJsonArray = [];
        localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    } else {
        itemJsonArrayStr = localStorage.getItem("itemsJson");
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }
    // populating table
    let tableBody = document.getElementById("tableBody");
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
    <tr>
    <td scope="row">${index + 1}</td>
    <td>${element[0]}</td>
    <td>${element[1]}</td>
    <td>${element[2]}</td> 
    <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td> 
     </tr>`;
    });
    tableBody.innerHTML = str;
}

add = document.getElementById("add"); // getting element of add button that i have created
add.addEventListener("click", getAndUpdate); // creating a function that if i clik add it should store the items in localstorage
update();

function deleted(itemIndex) {
    console.log("Delete", itemIndex);
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    // Delete itemIndex element from the array
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    update();
}
/* function deleted(itemIndex){
         console.log("Delete", itemIndex);
         itemJsonArrayStr = localStorage.getItem('itemsJson')
         itemJsonArray = JSON.parse(itemJsonArrayStr);
         // Delete itemIndex element from the array
         itemJsonArray.splice(itemIndex, 1);
         localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
         update();

     }
     */

function clearStr() {
    if (confirm("are you sure you want to clear the list?")) {
        console.log("clearing storage");
        localStorage.clear();
        update();
    }
}