import { signIn } from "@/configs/auth";
import { NextRequest, NextResponse } from "next/server";

export const singin_controller = async (req: NextRequest) => {
    const { email } = await req.json();

    if (!email) {
        return NextResponse.json(    
            { message: "Email is required" },
            { status: 400 }
        );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return NextResponse.json(
            { message: "Invalid email format" },
            { status: 400 }
        );
    }

    try {
        await signIn("resend", { email });
        return NextResponse.json(
            { message: "Magic link sent" },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.log(error)
        return NextResponse.json(
            { message: "Failed to send magic link" },
            { status: 500 }
        );
    }
}