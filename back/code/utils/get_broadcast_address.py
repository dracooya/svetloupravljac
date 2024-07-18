import netifaces


def get_broadcast_address():
    interfaces = netifaces.interfaces()

    for interface in interfaces:
        addresses = netifaces.ifaddresses(interface)
        if netifaces.AF_INET in addresses:
            for addr_info in addresses[netifaces.AF_INET]:
                if 'broadcast' in addr_info:
                    return addr_info['broadcast']

    return None
