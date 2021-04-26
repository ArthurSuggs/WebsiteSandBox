function addAnchor(parentId, idName, link) {
  addElement (parentId, idName,"a", link)
}
function addElement (parentId, idName,typeOfElement, link) {
  // create a new div element
  const newElement = document.createElement(typeOfElement);
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
  document.body.insertBefore(newElement, currentElement);
}
