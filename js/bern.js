var isBackedUp = 0;
var detailsName = "";
var itemPrev = '';
var saveLoadedData = [];
var saveBackupData = [];
var backedupData = [];
var enquiriesData = [];
var tableName = ''

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var displayName = user.displayName;
        var email = user.email;
        //var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        //var isAnonymous = user.isAnonymous;
        //var uid = user.uid;
        //var providerData = user.providerData;
        //console.log(email + " logged in")

        document.getElementById('uname').innerHTML = displayName;
        document.getElementById('displayName').innerHTML = displayName;
        document.getElementById('displayName2').innerHTML = displayName;
        document.getElementById('displayName3').innerHTML = displayName;
        document.getElementById('emailDisplay').innerHTML = email;
        document.getElementById('emailDisplay2').innerHTML = email;
        document.getElementById('avatar').src = photoURL;
        document.getElementById('pic').src = photoURL;


        //straight to bern's dashboard if its bern. and disable the main dashboard
        if ((user.email).includes('bern') || (user.email).includes('munch')) {
            document.getElementById("homePageLink").hidden = true;

        } else {
            window.location.href = "home.html";
            document.getElementById("bernDashboard").hidden = true;
        }

    } else {
        console.log("signed out")
        window.location.href = "index.html";
    }
})


function logout() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("Signed out")
    }).catch(function(error) {
        // An error happened.
        console.log(error)
    });
}


$('#logout, #logoutTwo').click(function() {
    logout();
})


function getDataWithTableName(tableName) {
    var ref = firebase.database().ref(tableName);
    //reset table


    ref.on("value", function(snapshot) {
        // console.table(snapshot.val());
        data = snapshot.val();
        //console.table(data)

        id = 0;
        var totBill = 0;
        var totPack = 0;

        itemPrev = '';

        for (var i in data) {
            //console.log(data[i])
            saveLoadedData.push(data[i])

            //calculate total amount of money to come in
            totBill = Number(totBill + Number(data[i].bill));

            //calc total amount of food packs to make
            totPack = totPack + Number(data[i].quantity);

            itemPrev += `<tr id=''><td> ${(++id)} </td>
                <td> ${data[i].name} </td>
                <td> ${data[i].order} </td>                
                <td> ${data[i].bill} </td>
                <td><a href="#"> ${data[i].email} </a></td>
                <td> ${data[i].phone} </td>
                
                <td style="width:150px">
                <a  id = ${data[i].id} class="viewItem btn btn-info btn-sm" title="View Specifications"> <i style = 'color:white' class="material-icons">visibility</i></a>
                <a  id = ${data[i].id} class="completeItem btn btn-success btn-sm" title="Complete order" > <i style = 'color:white' class="material-icons">check</i>  </a>
                <a  id = ${data[i].id} class="removeItem btn btn-danger btn-sm" title="Cancel order"> <i style = 'color:white' class="material-icons">close</i></a>               
                </td>             
                </tr>`;


            // itemPrev += '<tr><td>' + (++id) + '</td>' +
            // '<td>' + data[i].name + '</td>' +
            // '<td>' + data[i].order + '</td>' +
            // '<td>' + data[i].foodPrice + '</td>' +
            // '<td>' + data[i].bill + '</td>' +
            // '<td><a href="#">' + data[i].email + '</a></td>' +
            // '<td>' + data[i].phone + '</td>' +
            // '<td>' + data[i].date + '</td>' +
            // '<td><a  href=" " class=" removeItem btn btn-danger btn-sm"> <i class="material-icons">delete</i></a></td>' +
            // '</tr>';
        }
        $('#munchbowOrders').html(itemPrev);


        $('#totalOrders').text(id);
        $('#totalBill').text('$' + totBill);
        $('#totalPackages').text(totPack);
        $('#bodyLoader').hide();
        //console.log(totPack)


        //bind actions buttons
        bindViewButtonToDOM();
        bindRemoveButtonToDOM();
        bindCompleteButtonToDOM();


        $('#munchbowOrders td').each(function() {

            if ($(this).text() == '') {
                $(this).text('N/A');
            }

        });

    }, function(error) {
        console.log(error)
    });


}


function viewBackedupData() {
    $('#ordersCard').css('display', 'none');
    $('#backupOrdersCard').removeAttr('hidden');
    var ref = firebase.database().ref("munchbowBackup");
    //reset table

    ref.on("value", function(snapshot) {
        // console.table(snapshot.val());
        databck = snapshot.val();
        //console.table(data)

        idd = 0;
        item = '';

        for (var i in databck) {
            //console.log(data[i])
            saveBackupData.push(databck[i])

            item += '<tr><td>' + (++idd) + '</td>' +
                '<td>' + databck[i].name + '</td>' +
                '<td>' + databck[i].order + '</td>' +
                // '<td>' + databck[i].foodPrice + '</td>' +
                '<td>' + databck[i].bill + '</td>' +
                '<td><a href="#">' + databck[i].email + '</a></td>' +
                '<td>' + databck[i].phone + '</td>' +
                '<td>' + databck[i].date + '</td>' +
                '</tr>';
        }

        $('#munchbowOrdersBackup').html(item);
        $('#bodyLoader2').hide();

        $('#munchbowOrdersBackup td').each(function() {

            if ($(this).text() == '') {
                $(this).text('N/A');
            }

        });

    }, function(error) {
        console.log(error)
    });
}

function getBackedupDataInfo(backupTableName) {
    var ref = firebase.database().ref(backupTableName);
    //reset table

    ref.on("value", function(snapshot) {
        // console.table(snapshot.val());
        data = snapshot.val();
        //console.table(data)

        var accruedSum = 0;
        var count = 0;

        itemPrev = '';

        for (var i in data) {
            ++count;
            //console.log(data[i].bill)
            backedupData.push(data[i])
                //calc total amount of food packs to make
            accruedSum = accruedSum + Number(data[i].bill);

        }

        $('#accrued').text('$' + accruedSum);
        $('#completedOrders').text(count);

    }, function(error) {
        console.log(error)
    });


}

function getEnquiries(enquiriesTable) {
    var ref = firebase.database().ref(enquiriesTable);
    //reset table

    ref.on("value", function(snapshot) {
        // console.table(snapshot.val());
        data = snapshot.val();
        //console.table(data)

        enquiries = '';

        for (var i in data) {
            enquiriesData.push(data[i])

            enquiries += '<tr>' +
                '<td>' + data[i].name + '</td>' +
                '<td><a href="#">' + data[i].email + '</a></td>' +
                '<td>' + data[i].phone + '</td>' +
                '<td>' + data[i].message + '</td>' +
                '</tr>';
        }

        $('#munchbowEnquiries').html(enquiries)
        $('#Messages').text(enquiriesData.length)


    }, function(error) {
        console.log(error)
    });


}


$('document').ready(function() {
    tableName = 'munchbowOrders';
    backupTableName = 'munchbowBackup';
    enquiriesTable = 'muchbowEnquiries';
    getDataWithTableName(tableName)
    getBackedupDataInfo(backupTableName)
    getEnquiries(enquiriesTable);
});


function bindViewButtonToDOM() {

    let view = document.getElementsByClassName('viewItem');

    for (let x = 0; x < view.length; x++) {
        view[x].addEventListener('click', function(e) {
            getDataByID(this.id)

        });
    }

}

function bindRemoveButtonToDOM() {
    let remove = document.getElementsByClassName('removeItem');

    for (let x = 0; x < remove.length; x++) {
        remove[x].addEventListener('click', function(e) {
            firebaseDelete(this.id);
            //toastr.success("Order Cancelled")
        });
    }

}

function bindCompleteButtonToDOM() {
    let complete = document.getElementsByClassName('completeItem');

    for (let x = 0; x < complete.length; x++) {
        complete[x].addEventListener('click', function(e) {
            firebaseCopyToAnotherTable(this.id, "munchbowBackup");
            //toastr.success("Order Completed");

        });
    }

}

function firebaseDelete(rowId) {
    orderID = rowId;
    //console.log(orderID);
    //let data = saveLoadedData.filter((ele) => ele.id === rowId);
    //console.log(data)

    var adaRef = firebase.database().ref('munchbowOrders/' + orderID);
    adaRef.remove()
        .then(function() {
            toastr.success("Order Cancelled");
        })
        .catch(function(error) {
            toastr.warning("Cancel failed: " + error.message)
        });
}

function firebaseCopyToAnotherTable(rowId, tableName) {
    orderID = rowId;
    //console.log(orderID);
    let data = saveLoadedData.filter((ele) => ele.id === rowId);
    //console.log(data)

    //first copy data to another table
    firebase.database().ref(tableName + '/' + data[0].id).set(data[0]);

    //then remove data from current table
    var adaRef = firebase.database().ref('munchbowOrders/' + orderID);
    adaRef.remove()
        .then(function() {
            toastr.success("Order Completed");
        })
        .catch(function(error) {
            toastr.warning("failed: " + error.message)
        });
}

function getDataByID(rowId) {
    orderID = rowId;
    //console.log(orderID);
    let data = saveLoadedData.filter((ele) => ele.id === rowId);
    //console.log(data)       

    detailsName = data[0].name;
    $('#customerID').text(data[0].id);
    $('#customerName').text(data[0].name);
    $('#customerPhone').text(' ' + data[0].phone);
    $('#customerEmail').text(' ' + data[0].email);
    $('#customerOrder').text(' ' + data[0].order);
    $('#customerDate').text(' ' + data[0].date);
    $('#customerPickupDay').text(' ' + data[0].pickupDay);
    $('#customerPickupTime').text(' ' + data[0].pickupTime);
    if (data[0].specifications != '') {
        $('#customerSpecs').text(' ' + data[0].specifications);
    }

    $("#order-info").css("display", "block");
}

$('#dismissOrderDetails').click(function() {
    $("#order-info").css("display", "none");
})

$('#mailButt').click(function() {
    $("#modal-enquiries").css("display", "block");
})

$('#dismissMail').click(function() {
    $("#modal-enquiries").css("display", "none");
})

$('#clearOrdersView').click(function() {
    getDataWithTableName("dummyTable")
})

$('#viewBackup').click(function() {
    $("#ordersCard").css("display", "none");
    $("#backupOrdersCard").css("display", "block");
    viewBackedupData();
})

$('#view-orders').click(function() {
    $("#ordersCard").css("display", "block");
    $("#backupOrdersCard").css("display", "none");
})

$("#printDetails").click(() => {

    // Reduce font-size from 18px to 10px [For Downlaod Qulaity]
    $("#order-details").html($("#order-details").html().replace(/18px/g, "10px"))


    var name = `${detailsName} - Order.pdf`;
    // Convert the DOM element to a drawing using kendo.drawing.drawDOM
    kendo.drawing.drawDOM("#order-details", {
            paperSize: "A4",
            margin: {
                left: "2mm",
                top: "4mm",
                right: "2mm",
                bottom: "4mm"
            },
            font: "5px Verdana",
            landscape: true
        })
        .then(function(group) {
            // Render the result as a PDF file
            return kendo.drawing.exportPDF(group);
        })
        .done(function(data) {
            // Save the PDF file
            kendo.saveAs({
                dataURI: data,
                fileName: name
            });
            $("#order-details").html($("#order-details").html().replace(/10px/g, "18px"))
            $("#order-info").css("display", "none");
        });
});

$("#printOrders").click(() => {

    // Reduce font-size from 18px to 10px [For Downlaod Qulaity]
    $("#munchbowOrders").html($("#munchbowOrders").html().replace(/18px/g, "10px"))

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);


    var name = `${today.toDateString()} - Orders.pdf`;
    // Convert the DOM element to a drawing using kendo.drawing.drawDOM
    kendo.drawing.drawDOM("#munchbowOrdersTable", {
            paperSize: "A4",
            margin: {
                left: "2mm",
                top: "4mm",
                right: "2mm",
                bottom: "4mm"
            },
            font: "5px Verdana",
            landscape: true
        })
        .then(function(group) {
            // Render the result as a PDF file
            return kendo.drawing.exportPDF(group);
        })
        .done(function(data) {
            // Save the PDF file
            kendo.saveAs({
                dataURI: data,
                fileName: name
            });
            $("#munchbowOrders").html($("#munchbowOrders").html().replace(/10px/g, "18px"))
        });
});