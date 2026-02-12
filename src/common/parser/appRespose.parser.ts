
export const appResponse = (message: string, data: any = null, success: boolean = true) => {
    return {
        success,
        message,
        data,
    };
};
