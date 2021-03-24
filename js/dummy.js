function createAppsTable(data, tableId) {


    let view = ''


    saveLoadedData = [];


    data.forEach(element => {


                element.status = 1;


                saveLoadedData.push(element)


                view += `

 
<tr>

 
<td>

 
<i class=""></i>${element.prefix}

 
</td>

 
<td>

 
<i class=""></i>${element.name}

 
</td>

 
<td>

 
<span class="badge badge-dot mr-4">

 
<i class="bg-${element.status == 1 ? `success` : `warning`}"></i> <span class="btn btn-${sub[element.status].color} btn-sm" disabled>${sub[element.status].state}</span>

 
</span>

 
</td>

 
<td class="">

 
${dt.calendarFormat(element.createdAt, '-')}

 
</td>

 
<td class="text-center">

 
<a href="#" class="text-inverse editButton" id="${element.id}" title="Edit"><i class="fas fa-edit"></i></a>

 
<a href="#" class="text-danger deleteButton" title="Delete"><i class="fas fa-trash"></i></a>

 
</td>

 
</tr>`

 
});

 
// Render the tbody.

 
document.querySelector(tableId).innerHTML = `${view}`

 
bindButtonsToDOM()

 
}




    


function bindButtonsToDOM() {
    let elements = document.getElementsByClassName('editButton');
    
    for (let x = 0; x < elements.length; x++) {
        elements[x].addEventListener('click', function (e) {
        getDataByID(this.id)

    });
}

}





    


function getDataByID(rowId) {
    applicationId = rowId;
    let data = saveLoadedData.filter((ele) => ele.id === rowId);
    
    populateInputFields(data[0]);
    saveOrUpdate = 1;

 
}