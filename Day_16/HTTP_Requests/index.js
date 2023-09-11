/* XMLHttpRequest is a native API in Javascript that has been around since the early 2000s. It was initially developed by Microsoft and later adopted by other browsers. Although the name suggests that it is specifically designed for XML data, XMLHttpRequest can be used to request and handle a variety of data formats, such as JSON, HTML, and plain text.*/

//create XMLHttpRequest object
const xhr = new XMLHttpRequest()
//open a get request with the remote server URL
xhr.open("GET", "https://world.openfoodfacts.org/category/pastas/1.json")
//send the Http request
xhr.send()

//EVENT HANDLERS

//triggered when the response is completed
xhr.onload = function() {
  if (xhr.status === 200) {
    //parse JSON datax`x
    data = JSON.parse(xhr.responseText)
    console.log(data.count)
    console.log(data.products)
  } else if (xhr.status === 404) {
    console.log("No records found")
  }
}

//triggered when a network-level error occurs with the request
xhr.onerror = function() {
  console.log("Network error occurred")
}

//triggered periodically as the client receives data
//used to monitor the progress of the request
xhr.onprogress = function(e) {
  if (e.lengthComputable) {
    console.log(`${e.loaded} B of ${e.total} B loaded!`)
  } else {
    console.log(`${e.loaded} B loaded!`)
  }
}
