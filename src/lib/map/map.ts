import { sprintf } from 'sprintf-js'
import { EventEmitter } from 'events'
import {Location, Trail} from "@hikingtrails-hu/core";

export const formatDistance = (distance: number) => `${sprintf('%.2f', distance / 1000)} km`

export const allLocations = (trails: Trail[]) => {
    const result: Location[] = []
    trails.forEach((trail) => {
        trail.path.checkpoints.forEach((checkpoint) => {
            checkpoint.locations.forEach((location) => {
                result.push(location)
            })
        })
    })
    return result
}
