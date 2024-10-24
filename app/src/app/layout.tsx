'use client'

import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";


const suite = localFont({
    src: "./fonts/SUITE-Variable.woff2",
    variable: "--font-suite",
    weight: "100 900",
});
import {Analytics} from "@vercel/analytics/react"

import {CounterStoreProvider} from '@/app/providers/testProvider';
import Link from "next/link";
import {usePathname} from "next/navigation";
import {Suspense} from "react";
import GoogleAnalytics from "@/app/lib/GoogleAnalytics";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    const pathname = usePathname();
    // console.log(pathname);

    return (
        <html lang="en">
        <head>
            <meta name="color-scheme" content="light only"/>
            <meta name="supported-color-schemes" content="light"/>


            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>
                안아줘요 동물맨션 가이드북
            </title>


        </head>
        <body
            className={`${suite.variable}  antialiased light`}
        >
        <GoogleAnalytics gaId={"G-8YSMYZPNFY"}/>
        <div className={"flex justify-center w-full min-h-screen "}>
            <div className={"max-w-[500px] w-full  flex flex-col relative"}>
                <div
                    className={" w-full max-w-[500px] h-[4.5rem] flex-shrink-1 pt-3 px-3 fixed top-0 bg-white z-[1000] shadow-md overflow-x-hidden"}>
                    <div className={"flex flex-row gap-2"}>
                        <Link href={"/"}>
                            <button
                                className={`flex flex-row gap-1 items-center justify-center rounded-lg px-3 py-2
                                font-bold text-gray-700 border-2 border-gray-200 transition hover:bg-gray-200
                                ${pathname === '/' ? 'bg-gray-100' : 'bg-white'}
                                `}>


                                <div className="text-lg leading-8 ">🏠 홈</div>
                            </button>
                        </Link>
                        <Link href={"/quest"}>
                            <button
                                className={`flex flex-row gap-1 items-center justify-center rounded-lg px-3 py-2
                                font-bold text-gray-700  border-2 border-gray-200 transition hover:bg-gray-200
                                ${pathname === '/quest' ? 'bg-gray-100' : 'bg-white'}
                              `}>

                                <div className="text-lg leading-8">💡 퀘스트</div>
                            </button>
                        </Link>
                        <Link href={"/item"}>
                            <button
                                className={`flex flex-row gap-1 items-center justify-center rounded-lg px-3 py-2
                                font-bold text-gray-700  border-2 border-gray-200 transition hover:bg-gray-200
                                ${pathname === '/item' ? 'bg-gray-100' : 'bg-white'}
                              `}>
                                <div className="text-lg leading-8">🗂️ 아이템</div>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className={"flex-grow absolute top-20 w-full"}>
                    <CounterStoreProvider>
                        <Suspense>
                            {children}


                        </Suspense>

                        <Analytics/>
                    </CounterStoreProvider>

                </div>

            </div>
        </div>

        </body>
        </html>
    )
        ;
}
