function GenerateMessage(ERROR_CODE, DESCRIPTION) {
    return {
        ERROR_CODE,
        DESCRIPTION
    }
}
const failedMessage = {
    INVALID_PARAM: GenerateMessage('ERR_INVALID_PARAM', '파라미터가 잘못되었습니다.'),
    NOT_FOUND: GenerateMessage('ERR_NOT_FOUND', '데이터를 찾을 수 없습니다.'),
    ALREADY_EXIST: GenerateMessage('ERR_ALREADY_EXIST', '데이터가 이미 존재합니다.'),
    INTERNAL_ERROR: GenerateMessage('ERR_INTERNAL_ERROR', '서버에 오류가 발생했습니다.'),
}

class Message {
    constructor(message) {
        this.message = message
    }
}

class SuccessMessage extends Message {
    constructor(data) {
        super('success')
        this.data = data
    }
}

class FailedMessage extends Message {
    constructor(data) {
        super('error')
        this.error_code = data.ERROR_CODE
        this.description = data.DESCRIPTION
    }
}

class InternalErrorMessage extends FailedMessage {
    constructor() {
        super(INTERNAL_ERROR)
    }
}

module.exports = {
    Message,
    SuccessMessage,
    FailedMessage,
    InternalErrorMessage
}