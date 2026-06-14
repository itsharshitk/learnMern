class ApiResponse {
    constructor(status, message, data=null){

        this.success = true;

        this.message = message;

        this.data = data;

    }
}

module.exports = ApiResponse;