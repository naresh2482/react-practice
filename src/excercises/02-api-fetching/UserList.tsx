import { useEffect, useState } from "react";

interface User {
    id: number;
    name: string;
    email: string;
}

export default function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const controller = new AbortController();

        async function fetchUsers() {
            
            try {
                
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/users",
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data: User[] = await response.json();
                
                console.log("Featched users:", data);
                
                setUsers(data);
            } catch(err) {
                setError(
                    err instanceof Error ? err.message : "Something went wrong"
                );
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
            
        }
        
        
        fetchUsers();

        return () => {
            controller.abort();
        };
    }, []);
    
    if(loading) {
        return <p>Loading users...</p>
    }
    
    if (error) {
        return <p role="alert">Error: {error}</p>;       
    }
    
    return (
        <div>
        <h2>User List</h2>
        
        <ul>
        {users.map((user) => (
            <li key={user.id}>
            {user.name} - {user.email}
            </li>
        ))}
        </ul>
        </div>
    );
}