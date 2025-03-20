export enum StatusCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    INTERNAL_SERVER_ERROR = 500,
}

export enum ErrorMessage {
    FAILED_TO_GET_ALL = "Failed to get todos",
    FAILED_TO_CREATE = "Failed to create todo",
    FAILED_TO_UPDATE = "Failed to update todo",
    FAILED_TO_CHANGE_STATUS = "Failed to change todo status",
    FAILED_TO_DELETE = "Failed to delete todo",
    SERVER_ERROR = "Something went wrong. Please try again.",
}