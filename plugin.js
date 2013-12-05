( function($) {
  CKEDITOR.plugins.add( 'archive', {
    init: function( editor ) {
      console.log(editor);
      editor.addCommand( 'add_archive', new CKEDITOR.dialogCommand( 'archive_dialog' ) );
      editor.ui.addButton( 'archive', {
        label: 'Search Archive.org', //this is the tooltip text for the button
        command: 'add_archive',
        icon: this.path + 'img/glogo.jpg'
      });


      CKEDITOR.dialog.add( 'archive_dialog', function( api )
      {
        // CKEDITOR.dialog.definition
        var dialogDefinition =
        {
          title : 'Archive.org',
          minWidth : '80%',
          minHeight : '80%',
          contents : [
            {
              id : 'tab1',
              label : 'Label',
              title : 'Title',
              expand : true,
              padding : 0,
              elements :
              [
                {
                  type : 'html',
                  html : '<div id="archive-container"></div>'
                },
                {
                  type : 'text',
                  id : 'search_query',
                  label : 'Search',
                  'default' : '',
                  validate : function() {
                    if ( !this.getValue() )
                    {
                      //api.openMsgDialog( '', 'Search cannot be empty.' );
                      return false;
                    }
                  }
                },
                {
                  type : 'select',
                  id : 'mediatype',
                  label : 'Select the media type',
                  items : [[ 'All', 'all' ], [ 'Image', 'image' ], [ 'Video', 'video' ], [ 'Audio', 'audio' ], [ 'Texts', 'texts' ] ],
                  'default' : 'all',
                  onChange : function( api ) {
                    // this = CKEDITOR.ui.dialog.select
                    //alert( 'Current value: ' + this.getValue() );
                  }
                }
              ]
            }
          ],
          buttons : [ CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton ],
          onOk : function( api ) {
            // "this" is now a CKEDITOR.dialog object.
            // Accessing dialog elements:
            //alert( "You have entered: " + textareaObj.getValue() );
            //var data = api.ajax.load( buildURL(this) );
            //var url = buildURL(this);
            $.ajax({
              url: buildURL(this),
              dataType: 'jsonp',
              success: function(data) {
                //archive-container
                  console.log( data );
              },
              error: function(xhr, ajaxOptions, thrownError) {
                  console.log(xhr, ajaxOptions, thrownError);
              }
           });

          }
        };

        return dialogDefinition;
      } );
    }
  });

  function buildURL(editor) {
    var query = editor.getContentElement( 'tab1', 'search_query' ).getValue();
    var mediatype = editor.getContentElement('tab1', 'mediatype').getValue();
    var url = '   http://archive.org/advancedsearch.php?q=' + query;

    if (mediatype != 'all') {
      url += ' AND mediatype:' + mediatype;
    }

    url += '&fl[]=avg_rating&fl[]=call_number&fl[]=collection&fl[]=contributor&fl[]=coverage&fl[]=creator&fl[]=date&fl[]=description&fl[]=downloads&fl[]=foldoutcount&fl[]=format&fl[]=headerImage&fl[]=identifier&fl[]=imagecount&fl[]=language&fl[]=licenseurl&fl[]=mediatype&fl[]=month&fl[]=num_reviews&fl[]=oai_updatedate&fl[]=publicdate&fl[]=publisher&fl[]=rights&fl[]=scanningcentre&fl[]=source&fl[]=subject&fl[]=title&fl[]=type&fl[]=volume&fl[]=week&fl[]=year&sort[]=&sort[]=&sort[]=&rows=50&page=1&output=json';
    console.log(url);
    return url;
  }
} )(jQuery);
