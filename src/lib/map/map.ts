import { sprintf } from 'sprintf-js'

export const formatDistance = (distance: number) => `${sprintf('%.2f', distance / 1000)} km`
