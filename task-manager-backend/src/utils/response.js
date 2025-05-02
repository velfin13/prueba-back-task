export const successResponse = (res, message, data = {}, status = 200) => {
    return res.status(status).json({
        status: true,
        message,
        data,
    });
};

export function errorResponse(res, message = 'Error', errors = [], code = 400) {
    return res.status(code).json({
        status: false,
        message,
        errors,
        data: null,
    });
}
