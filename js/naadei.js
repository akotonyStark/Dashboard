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
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        console.log(email + " logged in")

        document.getElementById('uname').innerHTML = displayName;
        document.getElementById('displayName').innerHTML = displayName;
        document.getElementById('displayName2').innerHTML = displayName;
        document.getElementById('displayName3').innerHTML = displayName;
        document.getElementById('emailDisplay').innerHTML = email;
        document.getElementById('emailDisplay2').innerHTML = email;
        document.getElementById('avatar').src = photoURL;
        document.getElementById('pic').src = photoURL;


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
        //var totBill = 0;
        //var totPack = 0;

        itemPrev = '';

        for (var i in data) {
            //console.log(data[i])
            saveLoadedData.push(data[i])

            //calculate total amount of money to come in
            //totBill = Number(totBill + Number(data[i].bill));

            //calc total amount of food packs to make
            //totPack = totPack + Number(data[i].quantity);

            itemPrev += `<tr id=''><td> ${(++id)} </td>
                <td> ${data[i].Client} </td>
                <td> <a href="#">${data[i].Email}</a> </td>                
                <td> ${data[i].Phone} </td>
                <td> ${data[i].EventType} </td>                
                <td> ${data[i].ProposedDate} </td> 
                <td> ${data[i].Location} </td>               
                <td style="width:150px">
                <a  id = ${data[i].id} class="viewItem btn btn-info btn-sm" title="View Details"> <i style = 'color:white' class="material-icons">visibility</i></a>
                <a  id = ${data[i].id} class="completeItem btn btn-success btn-sm" title="Complete Booking" > <i style = 'color:white' class="material-icons">check</i>  </a>
                <a  id = ${data[i].id} class="removeItem btn btn-danger btn-sm" title="Cancel Booking"> <i style = 'color:white' class="material-icons">close</i></a>               
                </td>             
                </tr>`;

        }
        $('#eventsBookings').html(itemPrev);


        $('#totalBookings').text(id);
        // $('#totalBill').text('$' + totBill);
        // $('#totalPackages').text(totPack);
        $('#bodyLoader').hide();
        //console.log(totPack)

        //bind actions buttons
        bindViewButtonToDOM();
        bindRemoveButtonToDOM();
        bindCompleteButtonToDOM();

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

        //$('#accrued').text('$' + accruedSum);
        $('#completedBookings').text(count);

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
    tableName = 'eventsBookings';
    backupTableName = 'eventsBackup';
    enquiriesTable = 'eventsEnquiries';
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
            firebaseCopyToAnotherTable(this.id, "eventsBackup");
            //toastr.success("Order Completed");

        });
    }

}

function firebaseDelete(rowId) {
    orderID = rowId;
    //console.log(orderID);
    //let data = saveLoadedData.filter((ele) => ele.id === rowId);
    //console.log(data)

    var adaRef = firebase.database().ref('eventsBookings/' + orderID);
    adaRef.remove()
        .then(function() {
            toastr.success("Booking Cancelled");
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
    var adaRef = firebase.database().ref('eventsBookings/' + orderID);
    adaRef.remove()
        .then(function() {
            toastr.success("Booking Completed");
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

    detailsName = data[0].Client;
    $('#clientID').text(data[0].id);
    $('#clientName').text(data[0].Client);
    $('#clientPhone').text(' ' + data[0].Phone);
    $('#clientEmail').text(' ' + data[0].Email);
    $('#eventType').text(' ' + data[0].EventType);
    $('#location').text(' ' + data[0].Location);
    $('#proposedDate').text(' ' + data[0].ProposedDate);
    $('#noOfGuests').text(' ' + data[0].NumberOfGuests);


    $("#booking-info").css("display", "block");
}

$('#dismissBookingDetails').click(function() {
    $("#booking-info").css("display", "none");
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

    //Reduce font-size from 18px to 10px [For Downlaod Qulaity]
    $("#booking-details").html($("#booking-details").html().replace(/18px/g, "10px"))

    var name = `${detailsName} - Booking.pdf`;
    // Convert the DOM element to a drawing using kendo.drawing.drawDOM
    kendo.drawing.drawDOM("#booking-details", {
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
            $("#booking-details").html($("#booking-details").html().replace(/10px/g, "18px"))
            $("#booking-info").css("display", "none");
        });
});

$("#printBookings").click(() => {

    // Reduce font-size from 18px to 10px [For Downlaod Qulaity]
    $("#eventsBookings").html($("#eventsBookings").html().replace(/18px/g, "10px"))

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);


    var name = `${today.toDateString()} - bookings.pdf`;
    // Convert the DOM element to a drawing using kendo.drawing.drawDOM
    kendo.drawing.drawDOM("#eventsBookingsTable", {
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
            $("#eventsBookings").html($("#eventsBookings").html().replace(/10px/g, "18px"))
        });
});