export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  addItemAppend(element) {
    this._containerSelector.append(element);
  }

  addItemPrepend(element) {
    this._containerSelector.prepend(element);
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
