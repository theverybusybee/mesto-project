const renderFormLoading = (isLoading, form) => {
  if(isLoading) {
    form.elements.submitButton.textContent = 'Coхранение...'
  } else {
    form.elements.submitButton.textContent = 'Сохранить'
  }
}

export { renderFormLoading }