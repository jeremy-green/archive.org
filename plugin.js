CKEDITOR.plugins.add( 'archive', {
  init: function( editor ) {
    console.log(editor);
    editor.addCommand( 'add_archive', {
      exec : function( editor ) {
        //here is where we tell CKEditor what to do.
        editor.insertHtml( 'This text is inserted when clicking on our new button from the CKEditor toolbar' );
      }
    });
    editor.ui.addButton( 'archive', {
      label: 'Search Archive.org', //this is the tooltip text for the button
      command: 'add_archive',
      icon: this.path + 'img/glogo.jpg'
    });
  }
});
