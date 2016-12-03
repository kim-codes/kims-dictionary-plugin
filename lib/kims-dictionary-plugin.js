'use babel';

import KimsDictionaryPluginView from './kims-dictionary-plugin-view';
import { CompositeDisposable } from 'atom';

export default {

  kimsDictionaryPluginView: null,
  modalPanel: null,
  subscriptions: null,
  wordDefinition: null,
  wordToSearch: null,
  toSearchWord: null,

  activate(state) {
    toSearchWord = true;
    wordToSearch = "default";
    wordDefinition = "default";

    this.kimsDictionaryPluginView = new KimsDictionaryPluginView(state.kimsDictionaryPluginViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.kimsDictionaryPluginView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'kims-dictionary-plugin:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.kimsDictionaryPluginView.destroy();
  },

  serialize() {
    return {
      kimsDictionaryPluginViewState: this.kimsDictionaryPluginView.serialize()
    };
  },

  toggle() {
      if(toSearchWord){
      toSearchWord = false;
            // grab the word we want to search
            editor = atom.workspace.getActiveTextEditor();
            wordToSearch = editor.getSelectedText();
            if(!wordToSearch){
              wordToSearch = editor.getWordUnderCursor();
            }

            // send API call to get definition for the word
            data = null;
            xhr = null;
            xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.addEventListener("readystatechange", function () {
             if (this.readyState === this.DONE) {
               jsonText = JSON.parse(xhr.responseText);
               wordDefinition = jsonText.results[0].lexicalEntries[0].entries[0].senses[0].subsenses[0].definitions[0];
               console.log(jsonText.results[0].lexicalEntries[0].entries[0].senses[0].subsenses[0].definitions[0]);
             }
           });
           xhr.open("GET", "https://od-api.oxforddictionaries.com:443/api/v1/entries/en/"+wordToSearch+'/definitions', false);
           xhr.setRequestHeader("accept", "application/json");
           xhr.setRequestHeader("app_id", "xxxx");
           xhr.setRequestHeader("app_key", "xxxx");
           xhr.send(data);
      }else{
        toSearchWord = true;
        console.log("making it true");
      }
    // update the Modal Panel
    this.kimsDictionaryPluginView.setElements();
    console.log('KimsDictionaryPlugin was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
