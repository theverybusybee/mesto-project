/*--------------------------- редактирование информации 'о себе' --------------------------*/

// в функции два параметра, которые изменяют текстовое содержимое в username и caption
function editProfile(nameValue, captionValue) {
  profileUsername.textContent = nameValue;
  profileCaption.textContent = captionValue;
}

//добавляем событие: достаем значения из полей и присваиваем их username и caption, предотвращаем обновление страницы, закрываем поп-ап
editProfileForm.addEventListener('submit', (evt) => {
  editProfile(editProfileInputName.value, editProfileInputCaption.value);
  evt.preventDefault();
  closePopup(popupEditProfile);
});