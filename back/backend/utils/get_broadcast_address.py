import netifaces


def get_broadcast_address():
    gateways = netifaces.gateways()
    default_gateway = gateways.get('default')
    if default_gateway is None:
        return None
    default_interface = default_gateway[netifaces.AF_INET][1]
    addresses = netifaces.ifaddresses(default_interface)
    if netifaces.AF_INET in addresses:
        for addr_info in addresses[netifaces.AF_INET]:
            if 'broadcast' in addr_info:
                return addr_info['broadcast']
    return None
