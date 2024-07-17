def format_errors(errors):
    messages = []
    for field, field_errors in errors.items():
        if isinstance(field_errors, list):
            messages.extend(field_errors)
        elif isinstance(field_errors, dict):
            messages.extend(format_errors(field_errors))
    return "\n".join(messages)
