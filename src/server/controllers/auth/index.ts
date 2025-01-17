import { signIn } from "@/configs/auth";
import { NextRequest, NextResponse } from "next/server";

export const singin_controller = async (req: NextRequest) => {
    const { email } = await req.json();

    signIn("resend", { email })
    return NextResponse.json({ message: "Magic link sent" }, { status: 200 })
}