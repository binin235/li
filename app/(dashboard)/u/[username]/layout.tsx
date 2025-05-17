import { getSelfByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { Container } from "./_components/container";

interface CreateLayoutProps {
    params: {username: string};
    children: React.ReactNode;
}

const CreateLayout = async ({
    params,
    children,
}: CreateLayoutProps) => {
    // Await toàn bộ đối tượng params
    const resolvedParams = await Promise.resolve(params);
    const username = resolvedParams.username;
    
    const self = await getSelfByUsername(username);
    if (!self) {
        redirect("/");
    }

    return (
        <>
            <Navbar />
            <div className="flex h-full pt-5">
                <Sidebar />
                <Container>
                {children}
                </Container>
            </div>
        </>
    );
}

export default CreateLayout;