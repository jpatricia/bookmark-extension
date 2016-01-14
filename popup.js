
// Search the bookmarks when entering the search keyword.
$(function() {
  $('#search').change(function() {
     $('#bookmarks').empty();
     getBookmarks($('#search').val());
  });
});

// Traverse the bookmark tree, and print the folder and nodes.
function getBookmarks(query) {
  var bookmarkTreeNodes = chrome.bookmarks.getTree(
    function(bookmarkTreeNodes) {
    	console.log(query);
    	if(query!="first" && query!=""){
			$('#bookmarks').append(getTreeNodes(bookmarkTreeNodes, query));
			query="";
			$('body').css('height','auto');
			$('body').css('width','auto');
			$('body').css('min-width','300px');
		}
		else{
			console.log("first-empty");
			$('body').css('height','200px');
			$('html').css('height','200px');
			$('body').css('width','200px');
		}
    });
}

function getTreeNodes(bookmarkNodes, query) {
  var list = $('<ul>');
  var i;
  for (i = 0; i < bookmarkNodes.length; i++) {
    list.append(getNode(bookmarkNodes[i], query));
  }
  return list;
}
function getNode(bookmarkNode, query) {
  if (bookmarkNode.title) {
    if (query && !bookmarkNode.children) {
      if (String(bookmarkNode.title).indexOf(query) == -1) {
        return $('<span></span>');
      }
    }
    var link = $('<a>');
    link.attr('href', bookmarkNode.url);
    link.text(bookmarkNode.title);

    //click on the bookmark link and a new tab with the link will be opened
    link.click(function() {
      chrome.tabs.create({url: bookmarkNode.url});
    });
    var span = $('<span>');
    span.append(link);
  }
	  var li = $(bookmarkNode.title ? '<li>' : '<div>').append(span);
	  if (bookmarkNode.children && bookmarkNode.children.length > 0) {
	    li.append(getTreeNodes(bookmarkNode.children, query));
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
  getBookmarks("first");
});
