'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const Signin = () => {
    return (
        <div className="grid w-full grow items-center px-4 sm:justify-center h-screen justify-center">
            <Card className="w-full sm:w-96">
                <CardHeader>
                    <CardTitle>Sign in to Acme Co</CardTitle>
                    <CardDescription>Welcome back! Please sign in to continue</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-y-4">
                    <div className="grid  gap-x-4">

                        <Button variant="outline" type="button">

                            Google
                        </Button>
                    </div>

                    <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                        or
                    </p>

                    <div className="space-y-2">
                        <Label>Email address</Label>
                        <Input type="email" required />
                    </div>

                    <div className="space-y-2">
                        <Label>Password</Label>
                        <Input type="password" required />
                    </div>
                </CardContent>

                <CardFooter>
                    <div className="grid w-full gap-y-4">
                        <Button>Sign in</Button>
                        <Button variant="link" size="sm" asChild>
                            <Link href="/signup">
                                Don&apos;t have an account? Sign up
                            </Link>
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Signin