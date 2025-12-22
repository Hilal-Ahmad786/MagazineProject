export const ROLE_LABELS: Record<string, string> = {
    'founder': 'Kurucu',
    'editor': 'Editör',
    'guest': 'Konuk Yazar',
    'writer': 'Yazar',
    'author': 'Yazar',
}

export const getRoleLabel = (role?: string): string => {
    if (!role) return ''
    return ROLE_LABELS[role.toLowerCase()] || role
}
