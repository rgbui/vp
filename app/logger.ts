
export var logger = {
    error(error: string | Error, remark?: any) {
        console.log(error,remark);
        throw error;
    }
}