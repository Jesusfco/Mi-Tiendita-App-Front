export class Storage {
    token: string;
    tokenRequest: string;
    userName: string;
    userEmail: string;
    userId: string;
    userType: number;
    userPhone: string;

    constructor(){
        // this.tokenRequest = "?token=" + this.token;
        // this.userType =  parseInt(localStorage.getItem('userType'));
    }

    storageToken(token){
        localStorage.setItem('token', token);
    }

    storageUserData(data){
        localStorage.setItem('userName', data.name);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('userId', data.id);
        localStorage.setItem('userPhone', data.phone);
        localStorage.setItem('userType', data.userTypeId);
    }
}
