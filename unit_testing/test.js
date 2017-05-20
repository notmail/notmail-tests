 describe('notMAIL API Unit Testing', function() {

     describe("[/] API Connection", function(){
         require('./root/index.js');
     });

     describe("[/app] Application API // PART I.", function(){
         require('./app/index.js');
     });

     describe("[/user] User API (log-in only) // PART I.", function(){
         require('./user/index.js');
     });

     describe("[/app] Application API // PART II.", function(){
         require('./app/index_flow.js');
     });

  })