'use strict';

const cardsContainer = document.getElementById('root');

const cards = responseData.map((userDataObj) => generateUserCard(userDataObj));

cardsContainer.append(...cards);

function generateUserCard(userObj) {

  const fullName =
    `${userObj.firstName} ${userObj.lastName}`.trim() ||
    CARD_CONSTANTS.userName;

  const imgWrapper = createUserCardImageWrapper(userObj, fullName);
  const cardName = createElement('h2', {
    classNames: ['cardName'],
  })
  cardName.textContent = fullName;

  const cardDescription = createElement('p',{
    classNames: ['cardDescription'],
  });
  cardDescription.textContent =
    userObj.description || CARD_CONSTANTS.cardDescription;
  
    
    const createIconsFace = createSocialLink(userObj.contacts);
    const createDivForIcons = createElement('div', {}, ...createIconsFace);

  const cardArticle = createElement('article', {
    classNames: ['cardContainer'],
  }, imgWrapper, cardName, cardDescription, createDivForIcons);

  const card = createElement('li', {
    classNames: ['userCardWrapper'],
  }, cardArticle)
  return card;
}

function createUserCardImageWrapper(userObj, fullName) {
  const userImgElem = createElement('img', {
    classNames: ['cardImg'],
    attributes: {
      src: userObj.profilePicture,
      alt: fullName,
      'data-id': userObj.id,
    },
    listener: {
      'error': errorHandler,
      'load': loadHandler
    }
  });

  // userImgElem.addEventListener('error', errorHandler);
  // userImgElem.addEventListener('load', loadHandler);

  const initialsElem = createElement(
    'div',
    { classNames: ['initials'] },
    getInitials(fullName)
  );

  const imgWrapperElem = createElement(
    'div',
    {
      classNames: ['cardImgWrapper'],
      attributes: { id: `imgWrapper${userObj.id}` },
    },
    initialsElem
  );

  return imgWrapperElem;
}

function errorHandler({ target }) {
  target.remove();
}

function loadHandler({
  target,
  target: {
    dataset: { id },
  },
}) {
  document.getElementById(`imgWrapper${id}`).append(target);
}

function createSocialLink(contacts){

  return contacts.map((url) =>{
    const socialUrl = new URL(url)
   if(SUPPORTED_SOCIAL_NETWORKS.has(socialUrl.hostname)){
    return createElement('a', {
      classNames: [...SUPPORTED_SOCIAL_NETWORKS.get(socialUrl.hostname), 'sizes'],
      attributes: {
        href: url,
      }
    });
  }
})
}