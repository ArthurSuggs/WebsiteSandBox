function addAnchor(parentId, idName, link) {
  addElement (parentId, idName,"a", link)
}
function addElement (parentId, idName,typeOfElement, link) {
  // create a new div element
  const newElement = document.createElement("div");
  newElement.setAttribute("id", idName);

  if(link){
    newElement.setAttribute("href", link);
  }

  // and give it some content
  const newContent = document.createTextNode(idName);

  // add the text node to the newly created div
  newElement.appendChild(newContent);

  // add the newly created element and its content into the DOM
  const currentElement = document.getElementById(parentId);
  const parentDiv = currentElement.parentNode
  parentDiv.insertBefore(newElement, currentElement)
  //document.body.insertBefore(newElement, currentElement);
}
function keyRemover(keys,keyToKeep){
  var whileBreaker = 0
  while((keys.length > 1) ||(whileBreaker >10)){
    whileBreaker++
    for (var key of keys) {
      if (key !== keyToKeep){
        const indexOfKey = keys.indexOf(key);
        if (indexOfKey > -1) {
        keys.splice(indexOfKey, 1);
        }
      }
    }
  }
  return keys
}
