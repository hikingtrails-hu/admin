import { storage } from '~/lib/storage'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import CardProfile from "~/components/Cards/CardProfile";
import Login from "~/views/auth/Login";
import Navbar from "~/components/Navbars/AuthNavbar";
import FooterSmall from "~/components/Footers/FooterSmall";
import registerBg from '~/assets/img/register_bg_2.png'

export const loader = async () => {
    // const okt = await storage.get('trails/current/okt.json')
    return json({ okt: {name: 'Test'}})
}

const Index = () => {
    const { okt } = useLoaderData()
    return (
        <>
            <main>
                <section className="relative w-full h-full py-40 min-h-screen">
                    <div
                        className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
                        style={{
                            backgroundImage:
                                "url(" + registerBg + ")",
                        }}
                    ></div>
                    <Login></Login>
                </section>
            </main>
        </>

    )
}

export default Index
