import {ActionArgs} from "@remix-run/node";

export const action = (args: ActionArgs) => {
    console.log(args.request)
}

export default function Login() {
    return <div>x</div>
}
