import { v4 as uuidv4 } from 'uuid'
import format from 'date-fns/format'

export const generateTimestampedId = () =>
    [format(new Date(), 'yyyy-MM-dd_HH:mm:ss'), generateId()].join('__')

export const generateId = () => {
    return uuidv4().replace(/-/g, '')
}
