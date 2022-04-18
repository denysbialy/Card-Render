function createElement(tagName, options, ...children) {

  
  const { 
    classNames = [],
    attributes = {},
    listener = {},
    
    } = options;
  const elem = document.createElement(tagName);

  for (const addListener of Object.entries(listener)) {
    const [event, callback] = addListener;
    elem.addEventListener(event, callback);
  }

  for (let i = 0; i < classNames.length; i++) {
    elem.classList.add(classNames[i]);
  }

  for (const attributePair of Object.entries(attributes)) {
    const [attributeKey, attributeValue] = attributePair;
    elem.setAttribute(attributeKey, attributeValue);
  }

  elem.append(...children);

  
  return elem;
}
