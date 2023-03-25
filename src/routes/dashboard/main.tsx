import CardSettings from "~/components/Cards/CardSettings";
import CardProfile from "~/components/Cards/CardProfile";
import React from "react";

export default function Main() {
    return <>
        <div className="w-full lg:w-8/12 px-4">
            <CardSettings />
        </div>
        <div className="w-full lg:w-4/12 px-4">
            <CardProfile />
        </div>
    </>
}