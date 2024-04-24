// We will have classes and functions that interact with Google's API in here.

class APIController {
    constructor() {
        this.userIP;
        this.location;
        this.userData;
    }

    getInfo() {
        $.getJSON('https://api.db-ip.com/v2/free/self', function(data) {
            this.userData = JSON.stringify(data, null, 2);
          });
    }
}