
// Search the bookmarks when entering the search keyword.
$(function() {
  $('#search').change(function() {
     $('#bookmarks').empty();
     dumpBookmarks($('#search').val());
  });
});

// Traverse the bookmark tree, and print the folder and nodes.
function dumpBookmarks(query) {
  var bookmarkTreeNodes = chrome.bookmarks.getTree(
    function(bookmarkTreeNodes) {
      $('#bookmarks').append(dumpTreeNodes(bookmarkTreeNodes, query));
    });
}

function dumpTreeNodes(bookmarkNodes, query) {
  var list = $('<ul>');
  var i;
  for (i = 0; i < bookmarkNodes.length; i++) {
    list.append(dumpNode(bookmarkNodes[i], query));
  }
  return list;
}
function dumpNode(bookmarkNode, query) {
  if (bookmarkNode.title) {
    if (query && !bookmarkNode.children) {
      if (String(bookmarkNode.title).indexOf(query) == -1) {
        return $('<span></span>');
      }
    }
    var anchor = $('<a>');
    anchor.attr('href', bookmarkNode.url);
    anchor.text(bookmarkNode.title);
    /*
     * When clicking on a bookmark in the extension, a new tab is fired with
     * the bookmark url.
     */
    anchor.click(function() {
      chrome.tabs.create({url: bookmarkNode.url});
    });
    var span = $('<span>');
    span.append(anchor);
  }
	  var li = $(bookmarkNode.title ? '<li>' : '<div>').append(span);
	  if (bookmarkNode.children && bookmarkNode.children.length > 0) {
	    li.append(dumpTreeNodes(bookmarkNode.children, query));
	  }
	  return li;
}

function createListElement(id, info) {
  // this function creates the element in the list
  var listElement = document.createElement('li');
  listElement.appendChild(document.createTextNode(strimString(info.title, 40)));
  listElement.setAttribute('id', id);

  var div = document.createElement('div');
  div.appendChild(listElement);

  return div;
}

function getRecent(callback){
  // this function creates the list of recent bookmarks
  // recentList is the array of Recent bookmarks
  chrome.bookmarks.getRecent(3,function(recentList){
    var list_rcnt =  document.getElementById('recent_list');
    for(bm in list_rcnt){
      list_rcnt.appendChild(createListElement(bm,{
        title: list_rcnt[bm].title, // the title of the bookmark
        url: list_rcnt[bm].url,     // the url of the bookmark
        index: list_rcnt[bm].index  // the position of the bookmark
      }));
    }
    callback(recentList);
  });
}


// -----  EVENT LISTENER -----
document.addEventListener('DOMContentLoaded', function () {
  dumpBookmarks();
});
