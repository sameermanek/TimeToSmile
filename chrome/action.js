chrome.webRequest.onBeforeRequest.addListener(function(details) {
    var url = details.url;

    // First, detect whether this is an associate url
    var associateFilter = "tag=";

    var myAssociateTag = "tag=freshtruck-20";

    // Exclusion Filter (borrowed from smilealways)
      var exclusionFilter = "(timetosmile-no-redirect=1)"
                      + "|(redirect=true)"
                      + "|(redirect.html)"
                      + "|(r.html)"
                      + "|(/gp/dmusic/cloudplayer)"
                      + "|(/gp/photos)"
                      + "|(/gp/wishlist)"
                      + "|(/ap/)"
                      + "|(amazon.com/clouddrive)";

    //  Don't tough
    if (url.match(exclusionFilter)) {
      return;
    }

    // build url
    var newUrl;
    // First, add in the smile component
    newUrl = url.replace(/\/(www\.)?amazon\.com/i, "smile.amazon.com");


    // Add on my tag.
    if(!newUrl.match(associateFilter)) {
      // May need to be more strict -- how do they escape things in the title?
      // A few examples seem to drop them, so should be ok. 
      if(newUrl.match(/\?/i) != null) {
        newUrl = newUrl + "&" + myAssociateTag;
      } else {
        newUrl = newUrl + "?" + myAssociateTag;
      }
    }

    // Add a no-redirect
    newUrl = newUrl + "&timetosmile-no-redirect=1";

        return {
          redirectUrl : newUrl
        }
    return;
}, {
    urls : ["http://amazon.com/*",
            "https://amazon.com/*",
            "http://www.amazon.com/*", 
            "https://www.amazon.com/*",
            "http://smile.amazon.com/*",
            "https://smile.amazon.com/*"
            ],
    types: ["main_frame","sub_frame"]
}, ["blocking"]);

