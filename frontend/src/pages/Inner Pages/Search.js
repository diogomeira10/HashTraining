import React, { useState, useEffect } from "react";
import { Input } from "../../components/Input";
import { BsSearch } from "react-icons/bs";

export function Search() {
    const [term, setTerm] = useState("");
    const [listOfUsers, setListOfUsers] = useState(null);

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

    const handleTermChange = (e) => {
        setTerm(e.target.value);
    };

    let filteredUsers = [];
    if (listOfUsers) {
        filteredUsers = listOfUsers.filter((user) =>
            user.username.toLowerCase().includes(term.toLowerCase())
        );
    }

    const renderedUsers = filteredUsers.map((user) => (
        <div
            style={{ backgroundColor: "#333553", borderRadius: "5px", borderColor: "#419EF4" }}
            className="border flex justify-center items-center h-10"
            key={user._id}
        >
            {user.username}
        </div>
    ));

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
                    <BsSearch style={{ color: "white" }} className="absolute top-1 right-3" />
                </div>
            </div>
            <div className="text-white">{renderedUsers.length > 0 ? renderedUsers : "No users found"}</div>
        </div>
    );
}
