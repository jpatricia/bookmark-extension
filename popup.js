function getRecent(){
  // get the recent bookmarks(3) and show it in the recent_list
  // return the array of BookmarkTreeNode
  
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

function makeRecent(callback){
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

function makeSearch(search_info, callback){
  //this function is creating the list of searches
  chrome.bookmarks.search(search_query,function(searchList){
    var list_search = document.getElementById('');
  });
}


// -----  EVENT LISTENER -----
document.addEventListener('DOMContentLoaded', function(){
	console.log("HELLO");
});
