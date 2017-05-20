
describe("[/app/sub] API Connection", function(){
    require('./sub.js');
});

require('../user/sub.js');

describe("[/app/msg] API Connection", function(){
    require('./msg.js');
});

describe("[/app/registry] CleanUP", function(){
    require('./registry_cleanup.js');
});

