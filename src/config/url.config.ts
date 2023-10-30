export const ADMIN_PANNEL_URL ='/admin'

export const getSiteUrl = () => process.env.APP_URL as string

export const getAdminUrl = (path = '') => `${ADMIN_PANNEL_URL}${path}`