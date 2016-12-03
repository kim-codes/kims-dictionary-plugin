'use babel';

export default class KimsDictionaryPluginView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('kims-dictionary-plugin');

    elementHeader = document.createElement('div');
    elementHeader.classList.add('dict-header');
    elementHeader.textContent = "Dictionary";
    this.element.appendChild(elementHeader);

    wordSearchedMsg = document.createElement('div');
    wordSearchedMsg.textContent = 'Welcome to Kim\'s custom plugin' ;
    wordSearchedMsg.classList.add('dict-word-searched');
    this.element.appendChild(wordSearchedMsg);

    wordDefinitionMsg = document.createElement('div');
    wordDefinitionMsg.textContent =  'Move your cursor to a word or select a word then toggle Kims-Dictionary';
    wordDefinitionMsg.classList.add('dict-definition');
    this.element.appendChild(wordDefinitionMsg);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  // Updates with new word and definition
  setElements() {
    this.element.children[1].textContent =  'Word: ' + wordToSearch;
    this.element.children[2].textContent =  ' is defined as : ' + wordDefinition;
  }
}
