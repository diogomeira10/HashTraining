import { useState, useEffect } from "react";
import { Input } from "../../components/Input";
import { BsSearch } from "react-icons/bs";

export function Search() {


    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const response = await fetch("/api/everyUser");
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                const data = await response.json();
                setListOfUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
    
        getAllUsers(); 
    }, []);

    const [term, setTerm] = useState("");
    const[listOfUsers, setListOfUsers] = useState(null)
    console.log(listOfUsers)

    const handleTermChange = (e) => {
        setTerm(e.target.value);
    };

    return (
        <div className="mt-32 relative">
            <div className="flex">
                <div className="relative w-full">
                    <Input 
                        onChange={handleTermChange} 
                        value={term} 
                        type="text" 
                        className="pl-10 w-full" 
                    />
                    <BsSearch style={{color: "white"}} className="absolute top-1 right-3" />
                </div>
            </div>
        </div>
    );
}
