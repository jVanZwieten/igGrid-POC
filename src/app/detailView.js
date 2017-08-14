var recordIndex = window.location.href.split('?')[1]
var record = data[recordIndex]

var table = document.getElementById('record')
var headerRow = table.insertRow()
var valueRow = table.insertRow()

for (var property in record) {
    var headerCell = document.createElement('th')
    headerCell.innerHTML = property
    headerRow.appendChild(headerCell)

    var valueCell = valueRow.insertCell()
    valueCell.innerHTML = record[property]
}
