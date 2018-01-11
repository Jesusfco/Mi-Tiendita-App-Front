export class Storage {
    token: string;
    tokenUrl: string;
    userName: string;
    userEmail: string;
    userId: number;
    userType: number;
    userPhone: string;

    constructor(){        

        this.token = localStorage.getItem('token');
        this.tokenUrl = '?token=' + this.token;
        this.userName = localStorage.getItem('userName');
        this.userEmail = localStorage.getItem('userEmail');
        this.userId = parseInt(localStorage.getItem('userId'));
        this.userType = parseInt(localStorage.getItem('userType'));
        this.userPhone = localStorage.getItem('userPhone');
    }

    storageToken(token){
        localStorage.setItem('token', token);
    }

    storageUserData(data){
        localStorage.setItem('userName', data.name);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('userId', data.id);
        localStorage.setItem('userPhone', data.phone);
        localStorage.setItem('userType', data.user_type_id);
    }
}
