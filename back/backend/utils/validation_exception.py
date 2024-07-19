class ValidationException(Exception):
    __slots__ = ['message', 'status_code']

    def __init__(self, message, status_code):
        super().__init__(message)
        self.message = message
        self.status_code = status_code
