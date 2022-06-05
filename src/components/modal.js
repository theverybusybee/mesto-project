export { editProfile }

/*--------------------------- редактирование информации 'о себе' --------------------------*/

// в функции два параметра, которые изменяют текстовое содержимое в username и caption
function editProfile(nameValue, captionValue) {
  profileUsername.textContent = nameValue;
  profileCaption.textContent = captionValue;
}