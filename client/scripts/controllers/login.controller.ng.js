/*-----------------------------------------------*/
/*                  Auth Ctrl                    */
/*-----------------------------------------------*/


angular.module('ProLifeMonitor').controller('LoginCtrl', LoginCtrl);


function LoginCtrl($scope, $reactive, $state, $location) {
	$reactive(this).attach($scope);
 
    this.credentials = {
    	email: '',
    	password: ''
    };

    this.error = '';

    this.login = () => {
    	Meteor.loginWithPassword(this.credentials.email, this.credentials.password, (err) => {
      		if (err) {
        		this.error = err;
      		}
      		else {
        		$location.url("/");
      		}
    	});
    };
};



angular.module('ProLifeMonitor').controller('RegisterCtrl', RegisterCtrl);


function RegisterCtrl($scope, $reactive, $state, $location) {
	$reactive(this).attach($scope);
 
    this.credentials = {
    	email: '',
    	password: ''
    };

    this.error = '';

    this.register = () => {
    	Accounts.createUser({
            email: this.credentials.email,
            password: this.credentials.password
        }, function(err){
        	if (err) {
        		this.error = err;
      		}
      		else {
        		$location.url("/");
      		}
        });
    };
};