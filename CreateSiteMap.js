if(!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(needle) {
        for(var i = 0; i < this.length; i++) {
            if(this[i] === needle) {
                return i;
            }
        }
        return -1;
    };
}

var page = require('webpage').create(),
    system = require('system'),
    t, address, linkList, siteMapList;
	var fs = require('fs');
	var domain = 'beta.365.vtc.vn';
var root = 'https://id.vtc.vn/';
               fs.write('./' +  'xx' + '.txt', "xxxx", 'w');
recursive = function (status) {

    if (status !== 'success') {
        console.log('FAIL to load the address');
    } else 
	{ 
	//page.render(siteMapList.length + '.png');
 
		try {
               fs.write('./' +  siteMapList.length  + '.html', page.content, 'w');
		} catch (e) {
        console.log(e);
		}
	
           console.log('Page title is ' + page.evaluate(function () {
               return document.title;
           }));
        //   console.log('Loading time ' + t + ' msec');

        links = page.evaluate(function () {
            return [].map.call(document.querySelectorAll('a'), function (link) {
			   
	
                return link.getAttribute('href');
            });
        });
     //    console.log(links.join('\n'));
				for (var i = 0; i < links.length; i++) {
					if (links[i].indexOf('tin-tuc') > -1) continue;
					// bo external link
					if (  links[i].indexOf('http')  == 0   &&  links[i].indexOf(root) != 0) continue;
					if (links[i].indexOf('javascript') > -1 || links[i] == '' || links[i] == '#' || links[i] == '/') continue;
					
					

								if (links[i].indexOf('/') > -1) {
								url =  links[i]
									if ( links[i].indexOf(root) != 0) url = root + links[i];
									
									if (linkList.indexOf(url) < 0 && siteMapList.indexOf(url) < 0) {
										linkList.push(url);
										console.log(url);
									}
								}
								// Do something with element i.
				}

		
    }
	if ( siteMapList.length < 200 && linkList.length > 1)
	{
	    address = linkList.pop();
	siteMapList.push(address);
       console.log('Loading address' + address);
	//    page.release();
 page.close();
	//  page.reload();
	page = require('webpage').create();
    page.open(address,  recursive);
	}
	else
	{
	    	    console.log('siteMapList length ' + siteMapList.length );
				  console.log('siteMapList length ' + linkList.length );
	      phantom.exit();
		  }
};

linkList = [];
siteMapList = [];
linkList.push(root);
	
 
    // 
    // console.log(linkList.join('\n'));
  //while ( linkList.length < 50)
  //{
    address = linkList.pop();
	siteMapList.push(address);
       console.log('Loading address ' + address);
 
	  
    page.open(address,  recursive);
// }
		
 

