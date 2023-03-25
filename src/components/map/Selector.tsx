import {Trail} from "~/core/types/types";

export const Selector = (props: {trails: Trail[]}) => {
    const {trails} = props
    return (
        <ul>
            {trails.map(trail => (
                <li key={trail.id}>
                    <h2>{trail.name}</h2>
                    <ul>
                        {trail.path.checkpoints.map((checkpoint, i) => (
                            <li key={i}>
                                <h3>{checkpoint.name}</h3>
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    )
}